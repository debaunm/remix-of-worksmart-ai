import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactRequest {
  email: string;
  firstName?: string;
  toolName: string;
  agreedToMarketing: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, toolName, agreedToMarketing }: ContactRequest = await req.json();
    
    const apiKey = Deno.env.get('ACTIVECAMPAIGN_API_KEY');
    const apiUrl = Deno.env.get('ACTIVECAMPAIGN_API_URL');

    if (!apiKey || !apiUrl) {
      console.error('ActiveCampaign credentials not configured');
      throw new Error('ActiveCampaign credentials not configured');
    }

    // Clean the API URL (remove trailing slash if present)
    const baseUrl = apiUrl.replace(/\/$/, '');

    console.log(`Adding contact: ${email} from tool: ${toolName}`);

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

    // If they agreed to marketing, add them to a list (you can customize the list ID)
    // This is optional - uncomment and set your list ID if you want to use lists
    /*
    if (agreedToMarketing && contactData.contact?.id) {
      await fetch(`${baseUrl}/api/3/contactLists`, {
        method: 'POST',
        headers: {
          'Api-Token': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactList: {
            list: YOUR_LIST_ID,
            contact: contactData.contact.id,
            status: 1
          }
        }),
      });
    }
    */

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
