import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  task: 'CV summary',
  jobTitle: 'Junior Marketing Specialist',
  department: 'Marketing',
  seniority: 'Junior',
  responsibilities:
    'Manage social media posts, support content creation, assist in basic marketing reporting.',
  mustHave:
    'Content creation, social media knowledge, English B2, Canva or similar tools.',
  niceHave:
    'Google Ads basics, copywriting samples, HubSpot or similar marketing CRM.',
  workModel: 'Hybrid',
  location: 'Helsinki, Finland',
  candidateInfo:
    'Anonymized CV: 1 year marketing internship, managed Instagram and LinkedIn posts, created basic Canva graphics, supported student event promotion, English B2 certificate, no formal portfolio attached.',
  recruiterNotes:
    'Recruiter note: verify portfolio samples and exact campaign responsibilities.',
  portfolioNotes: 'Portfolio not provided in the CV text.',
  criteria: ['relevant work experience', 'technical skills', 'tools/software knowledge', 'education', 'certifications', 'language level'],
  format: 'bullet summary',
  length: 'short: maximum 150 words',
  safety: [
    'Do not make final hiring decisions.',
    'Do not recommend rejection or acceptance.',
    'Use only provided CV information.',
    'Do not invent missing facts.',
    'Do not infer protected characteristics.',
    'Use only job-related criteria.',
    'Mark missing information as "not provided."',
    'Present output as a draft for recruiter review.',
    'Ask recruiter to verify the original CV.',
  ],
  review: ['list missing information', 'flag unsupported claims', 'show recruiter verification points', 'suggest follow-up interview questions'],
};

export const useBuilderStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      setField: (field, value) => set({ [field]: value }),
      toggleArrayItem: (field, item) => {
        const arr = get()[field];
        const exists = arr.includes(item);
        set({ [field]: exists ? arr.filter((i) => i !== item) : [...arr, item] });
      },
      reset: () => set(initialState),
    }),
    { name: 'promptlab-builder' }
  )
);

// Selectors / derived
export function buildPromptText(s) {
  const jobContext = [
    `Job title: ${s.jobTitle}`,
    `Department: ${s.department}`,
    `Seniority level: ${s.seniority}`,
    `Main responsibilities: ${s.responsibilities}`,
    `Must-have requirements: ${s.mustHave}`,
    `Nice-to-have requirements: ${s.niceHave}`,
    `Work model: ${s.workModel}`,
    `Location if relevant: ${s.location}`,
  ].join('\n');

  const candidateInformation = [
    `Anonymized CV text: ${s.candidateInfo}`,
    `Recruiter notes: ${s.recruiterNotes}`,
    `Candidate portfolio notes if relevant: ${s.portfolioNotes}`,
  ].join('\n');

  return `Act as a recruitment support assistant. Your task is to ${s.task}. Use the job context and anonymized candidate information below. Analyze only the information provided. Do not invent facts. Do not make a hiring decision.

Job context:
${jobContext}

Candidate information:
${candidateInformation}

Evaluation criteria:
${s.criteria.map((c) => `- ${c}`).join('\n')}

Output format:
${s.format}

Length:
${s.length}

Safety rules:
${s.safety.map((c) => `- ${c}`).join('\n')}

Review instruction:
${s.review.map((c) => `- ${c}`).join('\n')}`;
}

export function computeReadinessScore(s) {
  const checks = [
    { label: 'Task included',                  points: 15, passed: Boolean(s.task?.trim()) },
    { label: 'Job context included',           points: 15, passed: Boolean(s.jobTitle?.trim()) && Boolean(s.mustHave?.trim()) },
    { label: 'Candidate information included', points: 15, passed: Boolean(s.candidateInfo?.trim()) },
    { label: 'Criteria included',              points: 15, passed: s.criteria.length > 0 },
    { label: 'Output format included',         points: 10, passed: Boolean(s.format) },
    { label: 'Safety rules included',          points: 20, passed: s.safety.length >= 5 },
    { label: 'Review instruction included',    points: 10, passed: s.review.length > 0 },
  ];
  const score = checks.reduce((t, c) => t + (c.passed ? c.points : 0), 0);
  return { score, checks };
}
