import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPTS: Record<string, string> = {
  rewrite_message: `You are RewriteAgent_v1 inside the AI Work-For-You Starter Kit. Your job is to take a draft message and return a version that is clearer, more confident, and more effective while preserving the sender's intent. Always: 1) apply BLUF (bottom-line up front), 2) remove filler, 3) clarify decision rights (who decides, who executes, who is informed), 4) align tone with the specified audience and tone parameters, 5) produce structured JSON output matching the rewrite_message_output_v1 contract. If required inputs are missing, ask concise follow-up questions to get them before rewriting. Never change factual content. Never hallucinate details or commitments. Output only valid JSON.`,
  
  meeting_to_action_plan: `You are MeetingActionAgent_v1 in the AI Work-For-You Starter Kit. Your role is to convert meeting notes into a structured action plan. Steps: 1) Summarize the meeting in 3–5 bullets. 2) Extract explicit decisions. 3) Identify risks and open questions. 4) Generate an action list with clear tasks, suggested owners, and suggested due dates. 5) Prepare optional connector payloads for task tools and calendar blocks. You must output valid JSON in the meeting_action_output_v1 format. If notes are too thin or missing context like team members or timelines, ask targeted clarifying questions first.`,
  
  decision_helper: `You are DecisionHelperAgent_v1 in the AI Work-For-You Starter Kit. You help the user think through a decision without being fluffy. Process: 1) Restate the decision in one sentence. 2) Identify 2–4 realistic options (including "do nothing" if relevant). 3) For each option, list pros, cons, and key risks. 4) Recommend one option and explain why in plain language. 5) Suggest the first 3 concrete actions for the recommended path. Output must conform to decision_helper_output_v1 JSON. If constraints, stakeholders, or timeline are missing, ask for them briefly before analysis.`,
  
  weekly_plan_builder: `You are WeeklyPlanAgent_v1 in the AI Work-For-You Starter Kit. You convert goals, responsibilities, constraints, and energy patterns into a realistic weekly plan. Steps: 1) Group goals into Must / Should / Could for this week. 2) Map responsibilities and known commitments onto days. 3) Respect energy patterns (deep work in high energy, admin in low energy). 4) Suggest specific time blocks, but keep them flexible. 5) Identify 3–5 things to drop, delegate, or defer. 6) Suggest 1 simple reset ritual for the end of the week. Output must follow weekly_plan_output_v1 JSON. If anything critical is missing, ask a single multi-part clarifying question, then plan.`,
  
  personal_ai_assistant_setup: `You are AssistantSetupAgent_v1 in the AI Work-For-You Starter Kit. Your job is to design a reusable system prompt for the user's personal AI assistant. Steps: 1) Understand the user's role, responsibilities, goals, tools, and communication style. 2) Generate a clear assistant persona description. 3) Define working rules (what the assistant should always do, never do, and how to ask follow-up questions). 4) Specify preferred output formats (bullets, tables, JSON, etc.). 5) Provide 5–10 example queries the user can paste into their assistant. Output must follow assistant_setup_output_v1 JSON. Do not include platform-specific tokens; keep it portable across OpenAI, Claude, Gemini, etc.`,
};

const buildUserPrompt = (workflowId: string, inputs: Record<string, string>): string => {
  switch (workflowId) {
    case 'rewrite_message':
      return `Rewrite the following message for clarity and impact.

RAW_TEXT:
${inputs.raw_text}

CONTEXT:
- Audience: ${inputs.audience || 'Not specified'}
- Purpose: ${inputs.purpose || 'Not specified'}
- Desired tone: ${inputs.tone || 'Professional'}
- Urgency: ${inputs.urgency || 'Normal'}

Return structured JSON only.`;

    case 'meeting_to_action_plan':
      return `Turn these meeting notes into a clear action plan.

MEETING_NOTES:
${inputs.meeting_notes}

TEAM MEMBERS (names or roles): ${inputs.team_members || 'Not specified'}
KNOWN DEADLINES (if any): ${inputs.deadlines || 'None specified'}

Return structured JSON only following meeting_action_output_v1.`;

    case 'decision_helper':
      return `Help me think through this decision.

DECISION CONTEXT:
${inputs.decision_context}

CONSTRAINTS (time, budget, people): ${inputs.constraints || 'Not specified'}
STAKEHOLDERS (who is affected): ${inputs.stakeholders || 'Not specified'}
TIMELINE / URGENCY: ${inputs.timeline || 'Not specified'}

Return structured JSON only following decision_helper_output_v1.`;

    case 'weekly_plan_builder':
      return `Build a realistic weekly plan for me.

GOALS FOR THIS WEEK:
${inputs.goals}

RESPONSIBILITIES (work and life):
${inputs.responsibilities || 'Not specified'}

CONSTRAINTS (hard commitments, childcare, travel, etc.):
${inputs.constraints || 'None'}

ENERGY PATTERNS (when I have most/least energy):
${inputs.energy_patterns || 'Not specified'}

Return structured JSON only following weekly_plan_output_v1.`;

    case 'personal_ai_assistant_setup':
      return `Help me set up my personal AI assistant.

MY ROLE:
${inputs.role}

MY RESPONSIBILITIES:
${inputs.responsibilities || 'Not specified'}

MY TOP GOALS (next 3–6 months):
${inputs.goals || 'Not specified'}

TOOLS I USE DAILY (email, calendar, docs, etc.):
${inputs.tools_used || 'Not specified'}

HOW I LIKE TO COMMUNICATE (short, detailed, formal, casual):
${inputs.communication_style || 'Not specified'}

Return structured JSON only following assistant_setup_output_v1.`;

    default:
      throw new Error(`Unknown workflow: ${workflowId}`);
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { workflow_id, inputs } = await req.json();
    
    console.log(`Processing workflow: ${workflow_id}`);
    console.log('Inputs:', JSON.stringify(inputs));

    const systemPrompt = SYSTEM_PROMPTS[workflow_id];
    if (!systemPrompt) {
      throw new Error(`Unknown workflow_id: ${workflow_id}`);
    }

    const userPrompt = buildUserPrompt(workflow_id, inputs);
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Usage limit reached. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log('AI Response received');

    let result;
    try {
      result = JSON.parse(content);
    } catch {
      result = { raw_response: content };
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-workflow function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
