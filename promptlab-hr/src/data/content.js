// Single source of truth for app content.
// In production, this can be moved to Firestore so non-devs can edit.

export const welcomeCards = [
  {
    label: 'Learn',
    title: 'Learn the logic of AI use',
    visible: 'Understand what AI can support in recruitment and where human judgment must remain in control.',
    hidden: 'AI can help recruiters organize text, summarize CVs, compare candidate information with job requirements, and prepare structured notes. However, AI must not replace human evaluation. The recruiter remains responsible for checking facts, interpreting context, and making final decisions.',
  },
  {
    label: 'Build',
    title: 'Build structured HR prompts',
    visible: 'Create prompts step by step using task, context, criteria, format, safety rules, and review instructions.',
    hidden: 'A strong HR prompt is not only a question. It contains the recruitment task, job context, candidate information, job-related criteria, expected output format, fairness rules, and verification instruction. Each element controls a different part of the AI output.',
  },
  {
    label: 'Practice',
    title: 'Practice with recruitment scenarios',
    visible: 'Train on CV screening, candidate summaries, comparison tables, and hiring manager briefs.',
    hidden: 'Practice scenarios help recruiters move from vague AI use to controlled AI-supported workflows. The platform shows weak prompts, improved prompts, output examples, and recruiter review checklists.',
  },
  {
    label: 'Verify',
    title: 'Verify before using',
    visible: 'Check AI outputs for missing information, unsupported claims, bias risk, and job relevance.',
    hidden: 'AI output should be treated as a draft. Recruiters must verify whether the output uses only provided information, avoids protected characteristics, follows job-related criteria, and clearly marks missing data.',
  },
];

export const purposeBlocks = [
  {
    title: 'Use AI to structure recruitment work',
    visible: 'AI can organize CV content into clear categories for recruiter review.',
    hidden: 'When recruiters read many CVs, important information can be spread across different sections. AI can help structure that information into categories such as experience, skills, tools, education, certifications, and missing information. This saves reading time, but the recruiter must verify the original CV before making any decision.',
  },
  {
    title: 'Use AI to improve consistency',
    visible: 'AI can apply the same job-related criteria across multiple CV summaries.',
    hidden: 'Early screening becomes inconsistent when each CV is read with different attention or different notes. A structured prompt can tell AI to use the same role-related criteria every time. This improves consistency in summaries, but it does not remove the need for human judgment.',
  },
  {
    title: 'Use AI to save reading time',
    visible: 'AI can create short summaries from long CV text.',
    hidden: 'AI can reduce time spent on first reading by extracting role-related evidence from CVs. For example, it can summarize work experience, tools, education, and project evidence. The summary should be used as a navigation aid, not as the final evaluation.',
  },
  {
    title: 'Use AI to support communication',
    visible: 'AI can draft professional messages and hiring manager briefs.',
    hidden: 'Recruiters often communicate with candidates and hiring managers. AI can help draft clear and structured communication, but every message must be reviewed for accuracy, tone, and company policy before sending.',
  },
];

export const circumstanceBlocks = [
  {
    title: 'When many CVs must be read',
    visible: 'Use AI to create structured CV summaries.',
    hidden: 'AI is useful when recruiters need to process a large number of CVs and extract repeated categories of information. The recruiter can ask AI to summarize only job-related evidence and mark missing information.',
  },
  {
    title: 'When job criteria are clear',
    visible: 'Use AI when the job requirements are defined.',
    hidden: 'AI works better when the recruiter provides clear must-have and nice-to-have requirements. If the criteria are unclear, AI may focus on irrelevant details or produce generic summaries.',
  },
  {
    title: 'When output can be verified',
    visible: 'Use AI only when the recruiter can check the result.',
    hidden: 'Recruitment output affects real candidates. Therefore, AI-generated summaries, comparisons, and recommendations must be verified against the original CV and job requirements.',
  },
  {
    title: 'When data can be anonymized',
    visible: 'Use AI only with necessary and anonymized information.',
    hidden: 'Recruiters should remove unnecessary personal identifiers and sensitive information before using AI tools. The prompt should focus on role-related evidence, not personal characteristics.',
  },
];

export const doList = [
  'Use AI to summarize CVs.',
  'Use AI to structure notes.',
  'Use AI to compare job-related criteria.',
  'Use AI to identify missing information.',
  'Use AI to draft recruiter communication.',
  'Use AI to prepare interview question drafts.',
];

export const dontList = [
  'Use AI to make final hiring decisions.',
  'Use AI to reject candidates automatically.',
  'Use AI to infer age, gender, ethnicity, religion, health, family status, or political views.',
  'Use AI with sensitive unnecessary personal data.',
  'Use AI without human review.',
  'Use AI when job criteria are unclear.',
];

export const lessons = {
  when: [
    {
      question: 'When can recruiters use AI for CV screening?',
      answer: 'When AI is used to organize and summarize job-related CV information for human review.',
      explanation: 'AI can support CV screening by extracting relevant information from anonymized CV text and arranging it according to predefined job criteria. It can help identify experience, tools, education, certifications, and missing information. It should not decide whether the candidate should be accepted or rejected.',
      example: 'Summarize this anonymized CV for a Junior Sales Specialist role using only job-related evidence.',
      outcome: 'User can separate AI-supported screening from AI-made hiring decisions.',
    },
    {
      question: 'When can AI support candidate comparison?',
      answer: 'When candidates are compared against the same job-related criteria.',
      explanation: 'AI can help build comparison tables when the recruiter provides the same evaluation criteria for each candidate. The comparison must use evidence from CVs and must not include protected characteristics or subjective assumptions.',
      example: 'Compare Candidate A, B, and C against these criteria: CRM experience, B2B sales experience, English level, and reporting tools.',
      outcome: 'User can define measurable criteria before comparing candidates.',
    },
    {
      question: 'When can AI support hiring manager communication?',
      answer: 'When the recruiter needs a clear, short, and structured summary.',
      explanation: 'AI can help convert recruiter notes into a hiring manager brief. This can save time and improve clarity. The recruiter must verify that the summary is accurate and does not add unsupported claims.',
      example: 'Create a 150-word hiring manager summary based only on the CV evidence below.',
      outcome: 'User can prepare structured communication without losing responsibility.',
    },
    {
      question: 'When should recruiters avoid AI?',
      answer: 'When the task requires final judgment, sensitive data, or unclear criteria.',
      explanation: 'AI should not be used to make final decisions, infer personal characteristics, or evaluate candidates without clear role criteria. It should also not be used when the recruiter cannot verify the result.',
      example: 'Do not ask: Should I reject this candidate? Ask: What job-related information is present and what information is missing?',
      outcome: 'User can identify high-risk AI use cases in recruitment.',
    },
  ],
  basics: [
    {
      question: 'What is a prompt?',
      answer: 'A prompt is an instruction that tells AI what task to perform, what context to use, and how to present the answer.',
      explanation: 'In recruitment, a prompt should define the task, job role, candidate information, criteria, output format, and safety rules. The more structured the prompt is, the more controlled and useful the AI output becomes.',
      example: 'Weak: Check this CV. Strong: Summarize this anonymized CV for a Junior Accountant role using the criteria below.',
      outcome: 'User can identify the difference between vague and structured prompts.',
    },
    {
      question: 'Why does context matter?',
      answer: 'Context tells AI what role, company need, and recruitment task the output should support.',
      explanation: 'Without context, AI may produce a generic answer. Job title, seniority level, responsibilities, must-have skills, and work model help AI focus on the correct role.',
      example: 'CV analysis for a Junior Recruiter role should focus on different evidence than CV analysis for a Data Analyst role.',
      outcome: 'User can add job context before asking AI to analyze CV information.',
    },
    {
      question: 'Why do criteria matter?',
      answer: 'Criteria tell AI what information should be extracted and compared.',
      explanation: 'Recruitment criteria make AI output more consistent. Criteria should be job-related, measurable, and connected to role requirements. Poor criteria increase the risk of irrelevant or biased output.',
      example: 'Safe criterion: experience with Excel. Unsafe criterion: candidate seems young and energetic.',
      outcome: 'User can separate job-related criteria from risky criteria.',
    },
    {
      question: 'Why does output format matter?',
      answer: 'Format controls how easy the AI output is to read, compare, and verify.',
      explanation: 'A table helps compare candidates. A bullet summary helps quick reading. A checklist helps verification. A scorecard can support structure, but it must not replace recruiter judgment.',
      example: 'Use a table with columns: criterion, CV evidence, match level, missing information.',
      outcome: 'User can choose output format based on recruitment task.',
    },
    {
      question: 'Why are safety rules required?',
      answer: 'Safety rules reduce the risk of bias, hallucination, and overreliance on AI.',
      explanation: 'AI can produce confident but unsupported statements. Safety rules tell AI to use only provided information, avoid protected characteristics, mark missing data, and avoid final decisions.',
      example: 'Add: Do not invent facts. Mark missing information as not provided. Do not make a hiring decision.',
      outcome: 'User can add safety rules to recruitment prompts.',
    },
  ],
  semi: [
    {
      question: 'What is a structured AI workflow?',
      answer: 'A structured AI workflow is a repeated process for using AI with the same steps, criteria, and verification rules.',
      explanation: 'In early recruitment, a structured workflow can include: define job criteria, anonymize CV, create prompt, generate summary, check output, compare with original CV, and prepare recruiter notes. This makes AI use more consistent and easier to audit.',
      example: 'CV input -> criteria extraction -> summary table -> missing information -> recruiter verification.',
      outcome: 'User can describe a repeatable AI-supported recruitment workflow.',
    },
    {
      question: 'How can recruiters reduce hallucinations?',
      answer: 'By telling AI to use only provided information and mark missing data clearly.',
      explanation: 'Hallucination means AI may add information that was not provided. In recruitment, this can create false candidate claims. Recruiters can reduce this risk by using prompts such as: Use only the CV text below and Do not add facts that are not present.',
      example: 'Instead of asking for general candidate evaluation, ask for evidence-based extraction from the CV.',
      outcome: 'User can write prompts that reduce unsupported claims.',
    },
    {
      question: 'How can recruiters use AI fairly?',
      answer: 'By using only job-related criteria and excluding protected characteristics.',
      explanation: 'Fair AI use in recruitment requires criteria that are connected to the role. The prompt should not ask AI to infer personal traits, age, gender, ethnicity, family status, religion, health, or political views. It should focus on skills, experience, certifications, tools, and job evidence.',
      example: 'Use: Compare candidates by required CRM experience. Avoid: Which candidate seems like a better cultural fit?',
      outcome: 'User can identify and remove risky criteria from recruitment prompts.',
    },
    {
      question: 'How can AI support recruiter decision-making without making the decision?',
      answer: 'AI can prepare structured information, but the recruiter makes the decision.',
      explanation: 'AI can summarize, compare, and highlight missing information. It can also suggest follow-up questions. However, final recruitment decisions require human judgment, organizational context, and accountability.',
      example: 'AI output: The CV shows Excel experience but does not provide evidence of payroll software experience. Recruiter action: verify the CV and decide next step.',
      outcome: 'User can use AI output as input for judgment, not as judgment itself.',
    },
    {
      question: 'What is an AI review loop?',
      answer: 'A review loop means checking and improving AI output before using it.',
      explanation: 'A responsible AI workflow does not end after the first output. Recruiters should check if the output is accurate, complete, job-related, unbiased, and based only on provided information. Then they can revise the prompt or manually correct the output.',
      example: 'Step 1: Generate summary. Step 2: Check against CV. Step 3: Mark unsupported claims. Step 4: Improve prompt. Step 5: Generate corrected draft.',
      outcome: 'User can apply a 5-step review loop to AI recruitment outputs.',
    },
  ],
};

export const tasks = [
  'CV summary',
  'CV screening support',
  'Candidate-job fit analysis',
  'Candidate comparison table',
  'Hiring manager brief',
  'Interview question draft',
  'Candidate communication draft',
  'Recruiter notes organization',
];

export const criteria = [
  'relevant work experience',
  'technical skills',
  'soft skills if job-related',
  'tools/software knowledge',
  'education',
  'certifications',
  'language level',
  'industry experience',
  'project experience',
  'leadership experience',
  'availability if provided and job-relevant',
];

export const formats = [
  'bullet summary',
  'evidence table',
  'candidate scorecard for human review',
  'strengths and gaps',
  'hiring manager brief',
  'interview preparation note',
  'missing information checklist',
];

export const lengths = [
  'very short: maximum 80 words',
  'short: maximum 150 words',
  'medium: maximum 300 words',
  'detailed: one-page summary',
  'role-by-role table',
  'executive brief',
];

export const safetyRules = [
  'Do not make final hiring decisions.',
  'Do not recommend rejection or acceptance.',
  'Use only provided CV information.',
  'Do not invent missing facts.',
  'Do not infer protected characteristics.',
  'Use only job-related criteria.',
  'Mark missing information as "not provided."',
  'Present output as a draft for recruiter review.',
  'Ask recruiter to verify the original CV.',
];

export const reviewInstructions = [
  'list missing information',
  'flag unsupported claims',
  'show recruiter verification points',
  'suggest follow-up interview questions',
  'explain what information was used',
  'explain what information was not provided',
];

export const builderLessons = [
  {
    step: '1',
    title: 'Select HR task',
    simple: 'Start by defining the recruitment task.',
    visible: 'The task tells AI what type of support you need.',
    hidden: 'A vague task creates a generic output. A precise task helps AI focus on one recruitment activity. For example, summarizing a CV, comparing a candidate with job requirements, and preparing interview questions are different tasks. Each task requires different context, criteria, and output format.',
    example: 'Weak: Check this CV. Strong: Summarize this anonymized CV for a Junior HR Assistant role using the job criteria below.',
    impact: 'Clear task selection improves relevance and reduces unnecessary information.',
  },
  {
    step: '2',
    title: 'Add job context',
    simple: 'Give AI the role context before asking it to analyze a CV.',
    visible: 'Job context helps AI focus on the correct role requirements.',
    hidden: 'AI cannot know what matters for a role unless the recruiter provides context. The same CV can be interpreted differently for different positions. For example, customer service experience may be highly relevant for a Sales Assistant role but less relevant for a Data Analyst role. Job context makes AI output more specific and more useful for recruiter review.',
    example: 'Role: Junior Marketing Specialist. Must-have: content creation, social media knowledge, English B2, Canva or similar tools.',
    impact: 'Job context changes the focus of the summary and helps AI ignore irrelevant information.',
  },
  {
    step: '3',
    title: 'Add candidate information',
    simple: 'Use anonymized and necessary information only.',
    visible: 'AI should analyze job-related evidence, not personal identity.',
    hidden: 'Recruitment data can include sensitive information. The recruiter should remove full name, address, personal identification numbers, photos, health details, family status, and unrelated personal information before using AI. The AI prompt should focus only on job-related facts from the CV.',
    example: 'Safe input: Candidate has 2 years of customer service experience and worked with CRM software. Risky input: Candidate is 24 years old, married, and lives at this exact address.',
    impact: 'Clean candidate input reduces privacy risk and keeps AI focused on job-related evidence.',
  },
  {
    step: '4',
    title: 'Define evaluation criteria',
    simple: 'Use criteria that are directly connected to the job.',
    visible: 'Criteria guide AI attention and make the output more consistent.',
    hidden: 'Recruitment criteria should be measurable, job-related, and connected to the role description. AI should not evaluate candidates based on personal characteristics or vague impressions. Good criteria help recruiters compare CVs fairly and consistently.',
    example: 'Safe criteria: Excel experience, payroll knowledge, HR administration experience. Unsafe criteria: looks energetic, seems young, probably fits our culture.',
    impact: 'Clear criteria make the output more evidence-based and reduce subjective interpretation.',
  },
  {
    step: '5',
    title: 'Choose output format',
    simple: 'Choose the format that matches the recruiter\'s next action.',
    visible: 'Format changes how easy the output is to read, compare, and verify.',
    hidden: 'If the recruiter needs a quick overview, a bullet summary is useful. If the recruiter compares candidates, a table is better. If the recruiter prepares a hiring manager update, a short brief is more useful. Output format should support the workflow, not create extra work.',
    example: 'Use a table with columns: criterion, CV evidence, match level, missing information, recruiter verification needed.',
    impact: 'Format controls structure, readability, and practical usability.',
  },
  {
    step: '6',
    title: 'Select detail level and length',
    simple: 'Choose length according to the decision stage.',
    visible: 'Early screening usually needs short and structured outputs.',
    hidden: 'Long outputs may slow down the recruiter. Short outputs can save time but may miss nuance. For early-stage CV screening, the best output is usually concise and structured. For complex roles, a more detailed analysis may be needed.',
    example: 'For first CV review, create a 150-word summary plus a missing information checklist.',
    impact: 'Length controls depth, speed, and reading effort.',
  },
  {
    step: '7',
    title: 'Add safety and fairness rules',
    simple: 'Keep AI in a support role.',
    visible: 'Safety rules reduce bias, hallucination, and overreliance.',
    hidden: 'AI can produce outputs that sound confident but are inaccurate or unfair. In recruitment, this creates risk because candidate opportunities can be affected. Safety rules force AI to stay within provided information, avoid protected characteristics, and clearly show uncertainty.',
    example: 'Do not infer age, gender, ethnicity, religion, health, family status, or political views. Do not make a hiring decision.',
    impact: 'Safety rules make the output more controlled, transparent, and suitable for human review.',
  },
  {
    step: '8',
    title: 'Add review instruction',
    simple: 'Every AI output must be checked.',
    visible: 'Review instructions turn AI output into a draft that can be verified.',
    hidden: 'Recruiters should not copy AI output directly into decisions or communication. A review instruction helps identify weak points in the output. It tells AI to show missing information, uncertain claims, and areas requiring manual confirmation.',
    example: 'End with 5 points the recruiter must verify manually in the original CV.',
    impact: 'Review instructions improve transparency and support responsible recruiter judgment.',
  },
];

export const safetyChecklist = [
  'Does the prompt include a clear recruitment task?',
  'Does it include job context?',
  'Does it include job-related criteria?',
  'Does it use anonymized candidate information?',
  'Does it include safety rules?',
  'Does it prevent final AI decision-making?',
  'Does it require missing information to be marked?',
  'Does it ask the recruiter to verify the result?',
];

export const navItems = [
  { id: 'home',     label: 'Welcome',          path: '/' },
  { id: 'purpose',  label: 'Purpose',          path: '/purpose' },
  { id: 'learning', label: 'AI in HR',         path: '/learning' },
  { id: 'builder',  label: 'Prompt Builder',   path: '/builder' },
  { id: 'safety',   label: 'Safety Checklist', path: '/safety' },
  { id: 'progress', label: 'Progress',         path: '/progress' },
];
