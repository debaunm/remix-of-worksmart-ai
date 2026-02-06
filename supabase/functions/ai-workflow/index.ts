import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const WorkflowInputSchema = z.object({
  workflow_id: z.string().min(1).max(100),
  inputs: z.record(z.string().max(50000)),
});

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

  early_retirement_calculator: `You are CoastFIRECalcAgent_v2. You calculate Coast FIRE numbers and provide realistic retirement forecasts based on compound growth. Coast FIRE is when you have enough invested that compound growth alone will carry you to your retirement target without additional contributions. Steps: 1) Calculate the inflation-adjusted retirement target using annual_spending and safe withdrawal rate. 2) Determine current trajectory using current_assets, monthly_contributions, net growth rate (growth_rate minus inflation minus fees). 3) Calculate Coast FIRE number (amount needed today to reach target by retirement with zero contributions). 4) Determine if user has already reached Coast FIRE. 5) Calculate years to Coast FIRE if not reached. 6) Generate three paths: aggressive (maximize contributions), moderate (balanced approach), conservative (slower but safer). 7) Create monthly_habits for achieving Coast FIRE. Key outputs: fire_number (retirement target portfolio), coast_fire_number (what you need now to coast), timeline (years to Coast FIRE or "Already Coasting"), gap (difference between current assets and coast number), projected_retirement_income, paths with specific savings targets, monthly_habits[]. Flag unrealistic inputs. Remind user this is educational, not financial advice. Output JSON with: fire_number, coast_fire_number, timeline, gap, already_coasting (boolean), projected_retirement_income, paths{aggressive[], moderate[], conservative[]}, monthly_habits[].`,

  press_release_generator: `You are PressReleaseAgent_v1. Your job is to create a complete, newsroom-ready press release and matching media outreach strategy from a single user prompt. Behavior rules: 1) Assume the user will provide only a short announcement description. Infer announcement_type (launch, funding, milestone, partnership, hire, event), key facts (who/what/when/where/why), likely context and significance. 2) Always generate a first-pass full press release immediately. Never ask clarifying questions unless the text is literally unusable. 3) Follow the standard PR newsroom structure: headline, subheadline, lead paragraph, body paragraphs, 1-2 executive quotes, call to action, boilerplate. 4) Quotes must sound human and media-friendly. No corporate jargon. Quotes should be energetic, clear, vision-oriented, attributable to real roles (CEO, Founder, COO). 5) Generate a media list + outreach strategy: 5-12 suggested outlets, rationale, angles the press might care about, 5-10 outreach tactics (PR stunts, hooks, formats). 6) Create a pitch email that a journalist would open. Short, clear, with a strong hook. 7) Never fabricate financial details or claims. If facts are missing, keep them general and label them as placeholders. Output JSON containing: press_release{headline, subheadline, lead_paragraph, body_paragraphs[], quote_section[], call_to_action, boilerplate}, media_list[], outreach_strategy[], pitch_email.`,

  pitch_deck_reviewer: `You are PitchDeckReviewerAgent_v1. Your job is to instantly review a startup pitch deck using evaluation patterns from YC, 500 Startups, and top Silicon Valley investors. Behavior rules: 1) Always produce a first-pass review immediately. The user will often paste only bullets, a rough outline, or partial text. Do NOT wait for structured inputs. Do NOT block the user with questions. Infer stage, industry, traction, and fundraising intent from whatever text is provided. 2) Use YC logic + 500 Startups logic internally. YC evaluation categories: Problem, Solution, Team, Market, Traction, Business Model, Why Now. 500 Startups categories: Clarity, Metrics, Competition, GTM, Ask. 3) Be blunt and high-signal. Write like an investor reviewing 100 decks a day. Avoid politeness fluff. Get straight to the real weaknesses and missing slides. 4) Never fabricate metrics. If the deck lacks data, explicitly note: "Missing metrics." Suggest realistic ways to improve clarity and credibility. 5) Return slide-by-slide and section-level analysis. If slides are not clearly distinguishable, infer the sections and review them as if they were slides. 6) Label assumptions. Example: "Assuming Seed-stage based on language used." 7) After the first output, refinement is optional, not required. Never force a clarifying question on first pass. Output JSON including: overall_score (0-100), strengths[], weaknesses[], slide_by_slide_feedback[], missing_elements[], recommended_improvements[], investor_style_summary, yc_scorecard{problem, solution, traction, team, market, business_model, why_now}, five_hundred_scorecard{clarity, metrics, competition, gtm, ask_quality}.`,

  pitch_deck_builder: `You are PitchDeckBuilderAgent_v1. Your job is to create a complete YC-style pitch deck OUTLINE with slide-by-slide guidance, speaker notes, and investor preparation. You are NOT creating actual slides—you are creating the strategic blueprint and content outline that founders use to build their deck. Behavior rules: 1) Follow the classic YC deck structure: Title, Problem, Solution, Why Now, Market Size, Product, Business Model, Team, Traction, Competition, Financials, Ask. Adjust order if the startup's story benefits from a different flow. 2) Each slide should have: slide_number, slide_title, duration_seconds (how long to spend on it in a 3-5 min pitch), key_points (3-5 bullets of what to say), speaker_notes (how to deliver it), visual_suggestion (what to show). 3) Create investor_hooks—3-5 memorable phrases or stats that stick. 4) Generate common_questions investors will ask and suggested_answers. 5) Provide deck_tips—specific advice for this particular deck. 6) Build a narrative_arc—a 2-3 sentence description of the story flow. 7) Be direct and practical. No fluff. Think like a YC partner giving feedback. Output JSON with: company_name, one_liner, slides[{slide_number, slide_title, duration_seconds, key_points[], speaker_notes, visual_suggestion}], narrative_arc, investor_hooks[], common_questions[{question, suggested_answer}], deck_tips[].`,

  life_simplifier: `You are LifeSimplifierAgent_v2. Your job is to take a small amount of user input and instantly deliver 3-5 high-leverage micro-automations that make the user's life easier in the areas of work, home, kids, money, or general logistics. Behavior rules: 1) Default to inference. You should NOT ask the user follow-up questions unless their input is truly unusable. Assume you can infer: category, pain points, context (work vs home vs parenting vs personal), relevant tools (calendar, email, notes apps). 2) Always produce a first usable output. Even with minimal information, generate 3 micro-automations that reduce friction immediately. 3) Use the Rewrite Your Rules framework internally. Map the user's friction to one of the four rule types: obligation rules, time rules, perfectionism rules, emotional rules. Use these to select or design micro-automations. 4) Micro-automations must be simple and realistic. Each automation must meet all criteria: immediately helpful, very low effort, does not require new tools or subscriptions, reduces cognitive load. 5) Produce one-click style outputs. For each micro-automation, provide: a short clear name, 1-2 sentence description, micro-step instructions, optional connector actions (Google Calendar events, Gmail drafts, Notes templates). 6) Never overload the user. Limit recommendations to the 3-5 highest-impact automations. 7) Do not ask for more input unless absolutely required. The default is: Infer. Produce. Deliver value. Output JSON with: category (inferred or provided), top_friction_points[], recommended_micro_automations[{name, description, impact_level, effort_level, steps[]}], one_click_actions[].`,

  linkedin_21_day_exec_content: `You are the 21-Day LinkedIn Content Architect for executives. Your role: Design a 21-day LinkedIn content plan that helps an expert executive attract, nurture, and convert their ideal audience for a specific paid offer. You will receive: INDUSTRY (the niche or vertical), AUDIENCE (the ideal client profile), OFFER (a specific paid program, service, or product), THEMES (3-6 recurring ideas or pillars). Key principles: 1) This is for an EXECUTIVE-LEVEL creator. The voice must be sharp, confident, experienced, never fluffy. Posts should feel like they come from someone who has actually done the work, not a generic content marketer. 2) Optimize for LinkedIn, not generic social media. Prioritize substance, insight, and specificity. Use a mix of stories, frameworks, contrarian takes, and proof. 3) Exactly 21 days, not 30. Output exactly 21 posts, one per day, no gaps. Group them by weekly focus. Content archetypes you MUST use: Controversial Take, Educational, Personal Story, How-to/Framework, Win/Social Proof, Engagement/Poll/Question, Reflection/Vulnerability. Mix requirements across 21 days: At least 7 Educational or How-to/Framework posts, at least 4 Personal Story or Reflection/Vulnerability posts, at least 4 Win/Social Proof posts, at least 3 Controversial Takes, at least 2 Engagement-style posts. Do NOT cluster all sales or offer-heavy posts at the end; seed the OFFER throughout in a subtle, value-first way. Hook rules: Each day must start with a strong hook line. Vary hook patterns. No single hook pattern should be reused more than 3 times across the 21 days. Hooks must speak directly to the AUDIENCE's lived reality, frustrations, and ambitions. Offer integration: Include 3-5 posts with explicit CTAs to learn more, apply, DM, or check a link. The rest should position the OFFER indirectly. For each of the 21 days, return: day_number (1-21), suggested_week_label, weekday_suggestion, content_archetype, hook, content_type, angle, detailed_structure, CTA, suggested_character_count_range, offer_integration_note. Output JSON with: plan_title, industry, audience, offer, themes[], weekly_overview[], days[], mix_summary.`,
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

    case 'early_retirement_calculator': {
      // Do the math deterministically instead of relying on AI
      const currentAge = parseFloat(inputs.current_age) || 35;
      const retirementAge = parseFloat(inputs.retirement_age) || 65;
      const annualSpending = parseFloat(inputs.annual_spending) || 60000;
      const currentAssets = parseFloat(inputs.current_assets) || 0;
      const monthlyContributions = parseFloat(inputs.monthly_contributions) || 0;
      const retirementIncome = parseFloat(inputs.retirement_income) || 0;
      const growthRate = parseFloat(inputs.growth_rate) || 7;
      const inflationRate = parseFloat(inputs.inflation_rate) || 3;
      const withdrawalRate = parseFloat(inputs.withdrawal_rate) || 4;
      const investmentFees = parseFloat(inputs.investment_fees) || 0.5;
      
      const yearsToRetirement = retirementAge - currentAge;
      const realReturnRate = (growthRate - inflationRate - investmentFees) / 100;
      const nominalReturnRate = (growthRate - investmentFees) / 100;
      
      // Net spending = Annual spending minus retirement income (part-time work, etc.)
      const netSpendingFromPortfolio = Math.max(0, annualSpending - retirementIncome);
      
      // FIRE Number = Net spending needed from portfolio / withdrawal rate
      const fireNumber = netSpendingFromPortfolio / (withdrawalRate / 100);
      
      // Coast FIRE Number = What you need TODAY so that compound growth alone reaches FIRE Number by retirement
      // Formula: CoastFIRE = FIRE Number / (1 + realReturnRate)^yearsToRetirement
      const coastFireNumber = fireNumber / Math.pow(1 + realReturnRate, yearsToRetirement);
      
      // Project current assets forward with contributions
      const annualContributions = monthlyContributions * 12;
      let projectedAssets = currentAssets;
      for (let year = 0; year < yearsToRetirement; year++) {
        projectedAssets = projectedAssets * (1 + realReturnRate) + annualContributions;
      }
      
      // Already coasting if current assets >= coast fire number
      const alreadyCoasting = currentAssets >= coastFireNumber;
      
      // Gap to close
      const gap = Math.max(0, coastFireNumber - currentAssets);
      
      // Calculate years to coast (with current contributions)
      let yearsToCoast = 0;
      if (!alreadyCoasting && gap > 0) {
        let assets = currentAssets;
        while (assets < coastFireNumber && yearsToCoast < 100) {
          assets = assets * (1 + realReturnRate) + annualContributions;
          yearsToCoast++;
        }
        if (yearsToCoast >= 100) yearsToCoast = -1; // Never reaches
      }
      
      const timeline = alreadyCoasting 
        ? "Already Coasting!" 
        : yearsToCoast === -1 
          ? "Not achievable with current savings rate"
          : `${yearsToCoast} years`;
      
      // Required withdrawal = what you actually need from portfolio (net spending)
      const requiredWithdrawal = netSpendingFromPortfolio;
      
      // Available withdrawal = what 4% of projected assets gives you
      const availableWithdrawal = projectedAssets * (withdrawalRate / 100);
      
      // Surplus = available minus required (positive = buffer, negative = shortfall)
      const surplus = availableWithdrawal - requiredWithdrawal;
      
      const projectedRetirementIncome = availableWithdrawal + retirementIncome;
      
      // Format currency for display
      const formatCurrency = (val: number) => {
        if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
        if (val >= 1000) return `$${Math.round(val / 1000).toLocaleString()}K`;
        return `$${Math.round(val).toLocaleString()}`;
      };
      
      return `Provide actionable advice for my Coast FIRE plan. I've already calculated the numbers - focus on creating the paths and habits.

MY CALCULATED NUMBERS (do NOT recalculate these - use them as given):
- FIRE Number (portfolio needed at retirement): ${formatCurrency(fireNumber)}
- Coast FIRE Number (what I need today): ${formatCurrency(coastFireNumber)}
- Current Assets: ${formatCurrency(currentAssets)}
- Gap to Coast FIRE: ${formatCurrency(gap)}
- Already Coasting: ${alreadyCoasting ? 'YES' : 'NO'}
- Timeline to Coast FIRE: ${timeline}
- Required Withdrawal (what you need from portfolio): ${formatCurrency(requiredWithdrawal)}/year
- Available Withdrawal (${withdrawalRate}% of projected assets): ${formatCurrency(availableWithdrawal)}/year
- Surplus/Buffer: ${surplus >= 0 ? '+' : ''}${formatCurrency(surplus)}/year
- Part-Time Retirement Income: ${formatCurrency(retirementIncome)}/year
- Total Retirement Income: ${formatCurrency(projectedRetirementIncome)}/year

MY INPUTS:
- Current Age: ${currentAge}
- Retirement Age: ${retirementAge}
- Years to Retirement: ${yearsToRetirement}
- Annual Spending: $${annualSpending.toLocaleString()}
- Part-Time Retirement Income: $${retirementIncome.toLocaleString()}
- Net Spending from Portfolio: $${netSpendingFromPortfolio.toLocaleString()}
- Monthly Contributions: $${monthlyContributions.toLocaleString()}
- Expected Return: ${growthRate}% (${(realReturnRate * 100).toFixed(1)}% real after inflation/fees)
- Safe Withdrawal Rate: ${withdrawalRate}%

Based on these EXACT numbers, provide:
1. Three paths (aggressive, moderate, conservative) with specific monthly savings targets to reach Coast FIRE faster
2. 3-5 monthly habits to build wealth

IMPORTANT: Use the exact fire_number, coast_fire_number, timeline, and gap values I provided above. Do not recalculate them.

Return structured JSON with:
- fire_number: "${formatCurrency(fireNumber)}"
- coast_fire_number: "${formatCurrency(coastFireNumber)}"  
- timeline: "${timeline}"
- gap: "${formatCurrency(gap)}"
- already_coasting: ${alreadyCoasting}
- required_withdrawal: "${formatCurrency(requiredWithdrawal)}/year"
- available_withdrawal: "${formatCurrency(availableWithdrawal)}/year"
- surplus: "${surplus >= 0 ? '+' : ''}${formatCurrency(surplus)}/year"
- projected_retirement_income: "${formatCurrency(projectedRetirementIncome)}/year"
- paths{aggressive[], moderate[], conservative[]} with specific monthly savings targets
- monthly_habits[]`
    }

    case 'press_release_generator':
      return `Create a complete press release package.

ANNOUNCEMENT:
${inputs.announcement}

COMPANY NAME: ${inputs.company_name || 'Not specified'}
EXECUTIVE NAME: ${inputs.executive_name || 'Not specified'}
EXECUTIVE TITLE: ${inputs.executive_title || 'Not specified'}

Return structured JSON with press_release{headline, subheadline, lead_paragraph, body_paragraphs[], quote_section[], call_to_action, boilerplate}, media_list[], outreach_strategy[], pitch_email.`;

    case 'pitch_deck_reviewer':
      return `Review this startup pitch deck.

DECK CONTENT:
${inputs.deck_content}

FUNDING STAGE: ${inputs.stage || 'Not specified'}
INDUSTRY: ${inputs.industry || 'Not specified'}

Return structured JSON with overall_score, strengths[], weaknesses[], slide_by_slide_feedback[], missing_elements[], recommended_improvements[], investor_style_summary, yc_scorecard, five_hundred_scorecard.`;

    case 'pitch_deck_builder':
      return `Build a YC-style pitch deck outline for this startup.

COMPANY NAME: ${inputs.company_name}
ONE-LINER: ${inputs.one_liner}
PROBLEM: ${inputs.problem}
SOLUTION: ${inputs.solution}
TARGET MARKET: ${inputs.target_market}
BUSINESS MODEL: ${inputs.business_model}
TRACTION: ${inputs.traction || 'Pre-traction / early stage'}
TEAM: ${inputs.team}
THE ASK: ${inputs.ask}

Return structured JSON with company_name, one_liner, slides[{slide_number, slide_title, duration_seconds, key_points[], speaker_notes, visual_suggestion}], narrative_arc, investor_hooks[], common_questions[{question, suggested_answer}], deck_tips[].`;

    case 'life_simplifier':
      return `Simplify my life based on this situation.

SITUATION:
${inputs.situation}

Return structured JSON with category, top_friction_points[], recommended_micro_automations[{name, description, impact_level, effort_level, steps[]}], one_click_actions[].`;

    case 'linkedin_21_day_exec_content':
      return `Create a 21-day LinkedIn content plan for an executive.

INDUSTRY: ${inputs.industry}
AUDIENCE: ${inputs.audience}
OFFER: ${inputs.offer}
THEMES: ${inputs.themes}

Return structured JSON with plan_title, industry, audience, offer, themes[], weekly_overview[{week_number, week_label, focus_description, primary_objectives[]}], days[{day_number, suggested_week_label, weekday_suggestion, content_archetype, hook, content_type, angle, detailed_structure[], CTA, suggested_character_count_range, offer_integration_note}], mix_summary.`;

    default:
      throw new Error(`Unknown workflow: ${workflowId}`);
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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
    const { data: claimsData, error: authError } = await supabaseClient.auth.getClaims(token);

    if (authError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate and parse input
    const rawBody = await req.json();
    const parseResult = WorkflowInputSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      console.error('Validation error:', parseResult.error.errors);
      return new Response(JSON.stringify({ error: 'Invalid input format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { workflow_id, inputs } = parseResult.data;
    
    console.log(`Processing workflow: ${workflow_id} for user: ${claimsData.claims.sub}`);
    console.log('Inputs received');

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
