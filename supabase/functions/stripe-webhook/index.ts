import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    // CRITICAL: Require webhook secret in production - reject if not configured
    if (!webhookSecret) {
      logStep("ERROR: STRIPE_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      logStep("No signature provided");
      return new Response(JSON.stringify({ error: "No signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      logStep("Webhook signature verified");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      logStep("Webhook signature verification failed", { error: message });
      return new Response(JSON.stringify({ error: `Webhook Error: ${message}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    logStep("Processing event", { type: event.type });

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      logStep("Checkout session completed", { 
        sessionId: session.id, 
        userId: session.metadata?.user_id,
        productType: session.metadata?.product_type 
      });

      const userId = session.metadata?.user_id || session.client_reference_id;
      const productType = session.metadata?.product_type;

      if (!userId || !productType) {
        logStep("Missing user_id or product_type in metadata");
        return new Response(JSON.stringify({ error: "Missing metadata" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Create Supabase client with service role key to insert purchase
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      // Check if purchase already exists (prevent duplicates)
      const { data: existingPurchase } = await supabaseAdmin
        .from("user_purchases")
        .select("id")
        .eq("user_id", userId)
        .eq("product_type", productType)
        .single();

      if (existingPurchase) {
        logStep("Purchase already exists", { purchaseId: existingPurchase.id });
        return new Response(JSON.stringify({ received: true, status: "already_exists" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Insert purchase record
      const { data: purchase, error: insertError } = await supabaseAdmin
        .from("user_purchases")
        .insert({
          user_id: userId,
          product_type: productType,
          stripe_session_id: session.id,
        })
        .select()
        .single();

      if (insertError) {
        logStep("Error inserting purchase", { error: insertError.message });
        return new Response(JSON.stringify({ error: insertError.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      logStep("Purchase recorded successfully", { purchaseId: purchase.id });
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
