import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Price IDs for each product
const PRICE_IDS: Record<string, string> = {
  money_systems: "price_1SvNmOIv0OChZxQ1Y6fzKlbY", // $197
  work_systems: "price_1SvNlhIv0OChZxQ1MoyY65zD", // $197
  ai_agent_101: "price_1SsC5GIv0OChZxQ1WdgfK6z4", // $29.99
  lovable_101: "price_1SvPgpIv0OChZxQ11qx1Trgy", // $29.99
};

// For individual tool purchases, we use dynamic pricing via Stripe
const TOOL_PRICE_CENTS = 1499; // $14.99
const EBOOK_PRICE_CENTS = 599; // $5.99

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const body = await req.json();
    const { productType, toolName, toolSlug } = body;
    logStep("Received request", { productType, toolName, toolSlug });

    const isToolPurchase = productType === "tool" && toolName && toolSlug;
    const isEbookPurchase = productType === "wealth_code_book";
    const validProductTypes = ["money_systems", "work_systems", "ai_agent_101", "lovable_101", "tool", "wealth_code_book"];

    if (!productType || !validProductTypes.includes(productType)) {
      throw new Error("Invalid product type");
    }

    // Retrieve authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if a Stripe customer record exists for this user
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Build line items based on product type
    let lineItems;
    let successUrl: string;
    let cancelUrl: string;
    let metadata: Record<string, string>;

    if (isToolPurchase) {
      // Dynamic pricing for individual tools
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: toolName,
              description: "AI-powered productivity tool",
            },
            unit_amount: TOOL_PRICE_CENTS,
          },
          quantity: 1,
        },
      ];
      successUrl = `${origin}/purchase-success?tool=${encodeURIComponent(toolName)}&slug=${encodeURIComponent(toolSlug)}&session_id={CHECKOUT_SESSION_ID}`;
      cancelUrl = `${origin}/tools/${toolSlug}`;
      metadata = {
        user_id: user.id,
        product_type: `tool:${toolSlug}`,
        tool_name: toolName,
      };
    } else if (isEbookPurchase) {
      // Ebook purchase
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "The Wealth Code Book",
              description: "Comprehensive ebook companion to the Money Systems workshop series",
            },
            unit_amount: EBOOK_PRICE_CENTS,
          },
          quantity: 1,
        },
      ];
      successUrl = `${origin}/purchase-success?ebook=wealth_code_book&session_id={CHECKOUT_SESSION_ID}`;
      cancelUrl = `${origin}/money-systems`;
      metadata = {
        user_id: user.id,
        product_type: "wealth_code_book",
      };
    } else {
      // Existing product checkout
      const priceId = PRICE_IDS[productType];
      if (!priceId) {
        throw new Error("Price not configured for this product");
      }
      lineItems = [{ price: priceId, quantity: 1 }];
      
      const cancelUrlMap: Record<string, string> = {
        money_systems: "/money-systems",
        work_systems: "/work-systems",
        ai_agent_101: "/sessions/ai-agent-101",
        lovable_101: "/sessions/lovable-101",
      };
      successUrl = `${origin}/purchase-success?session_id={CHECKOUT_SESSION_ID}`;
      cancelUrl = `${origin}${cancelUrlMap[productType] || "/"}`;
      metadata = {
        user_id: user.id,
        product_type: productType,
      };
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      client_reference_id: user.id,
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
