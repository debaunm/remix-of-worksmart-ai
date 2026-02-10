import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Input validation schema
const ContactRequestSchema = z.object({
  email: z.string().email().max(255),
  firstName: z.string().max(100).optional(),
  toolName: z.string().min(1).max(200),
  agreedToMarketing: z.boolean(),
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate and parse input
    const rawBody = await req.json();
    const parseResult = ContactRequestSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      console.error('Validation error:', parseResult.error.errors);
      return new Response(JSON.stringify({ error: 'Invalid input format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { email, firstName, toolName, agreedToMarketing } = parseResult.data;
    
    const apiKey = Deno.env.get('ACTIVECAMPAIGN_API_KEY');
    const apiUrl = Deno.env.get('ACTIVECAMPAIGN_API_URL');

    if (!apiKey || !apiUrl) {
      console.error('ActiveCampaign credentials not configured');
      throw new Error('ActiveCampaign credentials not configured');
    }

    // Clean the API URL (remove trailing slash if present)
    const baseUrl = apiUrl.replace(/\/$/, '');

    console.log(`Adding contact: ${email} from tool: ${toolName} for user: ${userData.user.id}`);

    // Create or update contact in ActiveCampaign
    const contactResponse = await fetch(`${baseUrl}/api/3/contact/sync`, {
      method: 'POST',
      headers: {
        'Api-Token': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          email: email,
          firstName: firstName || '',
          fieldValues: [
            {
              field: 'TOOL_SOURCE',
              value: toolName
            },
            {
              field: 'MARKETING_CONSENT',
              value: agreedToMarketing ? 'Yes' : 'No'
            }
          ]
        }
      }),
    });

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text();
      console.error('ActiveCampaign API error:', errorText);
      throw new Error(`ActiveCampaign API error: ${contactResponse.status}`);
    }

    const contactData = await contactResponse.json();
    console.log('Contact created/updated successfully:', contactData.contact?.id);

    return new Response(
      JSON.stringify({ success: true, contactId: contactData.contact?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in add-activecampaign-contact:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
