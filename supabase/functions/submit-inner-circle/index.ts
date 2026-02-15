import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ApplicationSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  businessName: z.string().trim().min(1).max(200),
  businessType: z.string().min(1).max(50),
  teamSize: z.string().min(1).max(20),
  annualRevenue: z.string().min(1).max(50),
  yearsInBusiness: z.string().trim().min(1).max(100),
  helpWith: z.string().trim().min(1).max(2000),
  referralSource: z.string().trim().min(1).max(500),
  anythingElse: z.string().trim().max(2000).optional().default(""),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    const parseResult = ApplicationSchema.safeParse(rawBody);

    if (!parseResult.success) {
      console.error('Validation error:', parseResult.error.errors);
      return new Response(JSON.stringify({ error: 'Please fill out all required fields correctly.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = parseResult.data;

    // Insert into database using service role (bypasses RLS for server-side insert)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabaseAdmin
      .from('inner_circle_applications')
      .insert({
        full_name: data.fullName,
        email: data.email,
        business_name: data.businessName,
        business_type: data.businessType,
        team_size: data.teamSize,
        annual_revenue: data.annualRevenue,
        years_in_business: data.yearsInBusiness,
        help_with: data.helpWith,
        referral_source: data.referralSource,
        anything_else: data.anythingElse || null,
        status: 'pending',
      });

    if (dbError) {
      console.error('Database insert error:', dbError);
      throw new Error('Failed to save application');
    }

    console.log(`Application saved for: ${data.email}`);

    // Send to ActiveCampaign
    const apiKey = Deno.env.get('ACTIVECAMPAIGN_API_KEY');
    const apiUrl = Deno.env.get('ACTIVECAMPAIGN_API_URL');

    if (apiKey && apiUrl) {
      const baseUrl = apiUrl.replace(/\/$/, '');
      try {
        const contactResponse = await fetch(`${baseUrl}/api/3/contact/sync`, {
          method: 'POST',
          headers: {
            'Api-Token': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contact: {
              email: data.email,
              firstName: data.fullName.split(' ')[0],
              lastName: data.fullName.split(' ').slice(1).join(' ') || '',
              fieldValues: [
                { field: 'BUSINESS_NAME', value: data.businessName },
                { field: 'BUSINESS_TYPE', value: data.businessType },
                { field: 'TEAM_SIZE', value: data.teamSize },
                { field: 'ANNUAL_REVENUE', value: data.annualRevenue },
                { field: 'YEARS_IN_BUSINESS', value: data.yearsInBusiness },
                { field: 'HELP_WITH', value: data.helpWith },
                { field: 'REFERRAL_SOURCE', value: data.referralSource },
              ],
            },
          }),
        });

        if (contactResponse.ok) {
          const contactData = await contactResponse.json();
          console.log('ActiveCampaign contact synced:', contactData.contact?.id);

          // Add tag "inner-circle-applicant"
          if (contactData.contact?.id) {
            // Search for or create the tag, then apply it
            const tagResponse = await fetch(`${baseUrl}/api/3/contactTags`, {
              method: 'POST',
              headers: { 'Api-Token': apiKey, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contactTag: {
                  contact: contactData.contact.id,
                  tag: 'inner-circle-applicant',
                },
              }),
            });
            const tagText = await tagResponse.text();
            console.log('Tag applied:', tagResponse.ok, tagText);
          }
        } else {
          const errorText = await contactResponse.text();
          console.error('ActiveCampaign error:', errorText);
        }
      } catch (acError) {
        console.error('ActiveCampaign sync failed (non-blocking):', acError);
      }
    } else {
      console.warn('ActiveCampaign credentials not configured, skipping CRM sync');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in submit-inner-circle:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
