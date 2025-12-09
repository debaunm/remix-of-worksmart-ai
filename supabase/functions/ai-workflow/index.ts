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

  fix_my_content: `You are ContentFixerAgent_v2 in the AI Content Engine. Transform rough content into platform-specific polished outputs. Steps: 1) Analyze raw_content for core idea and emotional anchor. 2) Rewrite content for clarity, impact, and platform conventions. 3) Generate 10 strong hook options tailored to the platform. 4) Produce 3 finished variants: direct, story-based, educational. 5) Create angle_buckets (3–5 angles) the creator can use repeatedly. 6) Extract a CTA appropriate for chosen platform. Output JSON with: improved_version, hook_options[], angle_buckets[], variants{direct, story, educational}, cta_options[].`,

  idea_to_revenue: `You are OfferBuilderAgent_v2 in the AI Content Engine. Turn rough ideas into structured, validated product concepts. Steps: 1) Define JTBD (job-to-be-done). 2) Clarify the problem and promise. 3) Suggest features aligned with skillset and constraints. 4) Map value ladder (free → premium). 5) Recommend pricing using value equation. 6) Identify differentiators. 7) Generate a 3-day micro-launch plan. Output JSON with: offer_name, JTBD, problem, promise, features[], value_ladder[], pricing, differentiators[], launch_plan_3_days[].`,

  brand_voice_generator: `You are BrandVoiceAgent_v2 in the AI Content Engine. Extract a user's brand voice from sample writing and create consistent voice rules. Steps: 1) Analyze sentence structure, rhythm, tone, emotion, and storytelling patterns. 2) Convert patterns into a voice_profile. 3) Translate patterns into actionable voice_rules. 4) Create 2–3 sample rewrites to show the voice in action. 5) Identify potential inconsistencies. Output JSON with: voice_profile{tone, pacing, formality, signature_elements[]}, voice_rules[], sample_rewrites[], inconsistencies[].`,

  social_bio_builder: `You are SocialBioAgent_v2 in the AI Content Engine. Create optimized bios for major platforms. Steps: 1) Clarify positioning (who you are, what you do, who you help). 2) Condense into platform-specific formats respecting character limits. 3) Create versions for Instagram, TikTok, LinkedIn, and personal website. 4) Include CTA matched to desired_action. 5) Generate 3 headline options for LinkedIn. Output JSON with: instagram_bio, tiktok_bio, linkedin_headline[], linkedin_about, website_about, cta.`,

  c_level_statement_builder: `You are CLevelStatementAgent_v1 for executives. Turn leadership updates and decisions into polished C-level and board-ready statements. Steps: 1) Clarify strategic intent using purpose and desired_outcome. 2) Segment audience into stakeholder groups with their concerns. 3) Build narrative structure: current situation, what leadership is doing, what it means, what happens next. 4) Weave in key_facts truthfully and concisely. 5) Frame risks constructively. 6) Generate key_messages (3-7 quotable sentences). 7) Produce talking_points for Q&A. 8) Recommend delivery channel and format. Output JSON with: statement, key_messages[], stakeholder_implications[], talking_points[], delivery_guidance.`,

  roles_and_responsibilities_creator: `You are RoleClarityAgent_v1 for executives. Build role clarity definitions, RACI maps, and accountability charts. Steps: 1) Create concise role_summary explaining why this role exists. 2) Cluster responsibilities into themes (strategy, execution, communication). 3) Derive specific, observable success_criteria. 4) Build RACI matrix across projects showing Responsible, Accountable, Consulted, Informed. 5) Identify gaps or overlaps in ownership. 6) Generate alignment_actions to resolve ambiguities. Output JSON with: role_summary, success_criteria[], responsibilities[], raci{}, gaps_identified[], alignment_actions[].`,

  budget_builder_prompts: `You are BudgetBuilderAgent_v1 for executives. Create clear project or department budgets with scenarios. Steps: 1) Construct baseline_budget from revenue, expenses, headcount. 2) Compute key metrics: total_expenses, net_result, margin_percentage. 3) Generate low scenario (lean), medium scenario (balanced), high scenario (growth/investment). 4) Identify cost_drivers with largest impact. 5) Create summary explaining tradeoffs and recommending one scenario. Respect constraints. Output JSON with: baseline_budget{}, scenarios{low, medium, high}, cost_drivers[], summary.`,

  linkedin_audit_tool_exec: `You are LinkedInAuditAgent_v1 for executives. Audit LinkedIn profiles for clarity, authority, and strategic positioning. Steps: 1) Evaluate about_section, headline, experience for clarity, specificity, outcomes, leadership signaling. 2) Identify authority_gaps (missing metrics, generic language, unclear seniority). 3) Rewrite about_section emphasizing leadership, scope, and results. 4) Generate upgraded headline_options combining role, domain, value proposition. 5) Create 30-day content_plan focused on thought leadership. Output JSON with: audit_summary, rewritten_about, headline_options[], authority_gaps[], content_plan_30_days[].`,

  early_retirement_calculator: `You are RetirementCalcAgent_v1. Produce forecast and savings strategy for early retirement. Steps: 1) Estimate annual spending from expenses. 2) Calculate FIRE number using 4% safe withdrawal rate. 3) Estimate timeline to reach FIRE number. 4) Generate three paths: aggressive (higher savings), moderate (small improvements), conservative (slower with safety). 5) Identify gap between current position and target. 6) Convert moderate path into monthly_habits and practices. Flag unrealistic inputs. State projections are estimates, not financial advice. Output JSON with: fire_number, timeline, gap, paths{aggressive[], moderate[], conservative[]}, monthly_habits[].`,
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

    case 'fix_my_content':
      return `Fix and optimize this content for ${inputs.platform || 'social media'}.

RAW CONTENT:
${inputs.raw_content}

TONE PREFERENCE: ${inputs.tone_preference || 'Not specified'}
PROFILE URLS FOR CONTEXT: ${inputs.profile_urls || 'None provided'}

Return structured JSON with improved_version, hook_options, variants, angle_buckets, cta_options.`;

    case 'idea_to_revenue':
      return `Convert this idea into a structured product concept.

IDEA:
${inputs.idea_text}

MY SKILLS/EXPERIENCE: ${inputs.skillset || 'Not specified'}
CONSTRAINTS: ${inputs.constraints || 'None specified'}

Return structured JSON with offer_name, JTBD, problem, promise, features, value_ladder, pricing, differentiators, launch_plan_3_days.`;

    case 'brand_voice_generator':
      return `Analyze these writing samples and extract my brand voice.

WRITING SAMPLES:
${inputs.writing_samples}

TONE ADJECTIVES I WANT: ${inputs.tone_adjectives || 'Not specified'}

Return structured JSON with voice_profile, voice_rules, sample_rewrites, inconsistencies.`;

    case 'social_bio_builder':
      return `Create optimized bios for my social platforms.

MY ROLE: ${inputs.role}
EXPERTISE: ${inputs.expertise || 'Not specified'}
ACHIEVEMENTS: ${inputs.achievements || 'Not specified'}
PERSONALITY TRAITS: ${inputs.personality_traits || 'Not specified'}
DESIRED ACTION: ${inputs.desired_action || 'Not specified'}

Return structured JSON with instagram_bio, tiktok_bio, linkedin_headline, linkedin_about, website_about, cta.`;

    case 'c_level_statement_builder':
      return `Create a polished C-level statement.

PURPOSE: ${inputs.purpose}
AUDIENCE: ${inputs.audience || 'Not specified'}
KEY FACTS: ${inputs.key_facts}
RISKS/SENSITIVITIES: ${inputs.risks || 'None specified'}
DESIRED OUTCOME: ${inputs.desired_outcome || 'Not specified'}

Return structured JSON with statement, key_messages, stakeholder_implications, talking_points, delivery_guidance.`;

    case 'roles_and_responsibilities_creator':
      return `Build role clarity documentation.

ROLE NAME: ${inputs.role_name}
RESPONSIBILITIES: ${inputs.responsibilities}
CURRENT PROJECTS: ${inputs.projects || 'Not specified'}
CROSS-TEAM PARTNERS: ${inputs.cross_team_partners || 'Not specified'}
90-DAY SUCCESS CRITERIA: ${inputs.success_criteria || 'Not specified'}

Return structured JSON with role_summary, success_criteria, responsibilities, raci, gaps_identified, alignment_actions.`;

    case 'budget_builder_prompts':
      return `Build a budget with scenarios.

REVENUE: ${inputs.revenue}
EXPENSES: ${inputs.expenses}
HEADCOUNT: ${inputs.headcount || 'Not specified'}
GOALS: ${inputs.goals || 'Not specified'}
CONSTRAINTS: ${inputs.constraints || 'None specified'}

Return structured JSON with baseline_budget, scenarios{low, medium, high}, cost_drivers, summary.`;

    case 'linkedin_audit_tool_exec':
      return `Audit this executive LinkedIn profile.

HEADLINE: ${inputs.headline || 'Not provided'}
ABOUT SECTION: ${inputs.about_section || 'Not provided'}
EXPERIENCE: ${inputs.experience || 'Not provided'}
CAREER GOAL: ${inputs.career_goal || 'Not specified'}
TARGET ROLES: ${inputs.target_roles || 'Not specified'}

Return structured JSON with audit_summary, rewritten_about, headline_options, authority_gaps, content_plan_30_days.`;

    case 'early_retirement_calculator':
      return `Calculate early retirement plan.

ANNUAL INCOME: ${inputs.income}
MONTHLY EXPENSES: ${inputs.expenses}
SAVINGS RATE: ${inputs.savings_rate || 'Not specified'}
CURRENT INVESTMENTS: ${inputs.current_investments || 'Not specified'}
CURRENT AGE: ${inputs.current_age || 'Not specified'}
TARGET RETIREMENT AGE: ${inputs.target_retirement_age || 'Not specified'}

Return structured JSON with fire_number, timeline, gap, paths{aggressive, moderate, conservative}, monthly_habits.`;

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
