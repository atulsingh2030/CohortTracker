const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

function sanitizeText(value) {
  return `${value || ''}`.replace(/\s+/g, ' ').trim();
}

function uniqueStrings(values, limit = values.length) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const normalized = sanitizeText(value);
    if (!normalized) {
      continue;
    }

    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(normalized);

    if (result.length >= limit) {
      break;
    }
  }

  return result;
}

function classifyRepository(snapshot) {
  const topics = (snapshot.repo.topics || []).map((topic) => topic.toLowerCase());
  const description = sanitizeText(snapshot.repo.description).toLowerCase();
  const languageNames = Object.keys(snapshot.languages || {}).map((name) => name.toLowerCase());
  const topicText = `${topics.join(' ')} ${description} ${languageNames.join(' ')}`;

  if (/(ai|agent|llm|machine-learning|ml|genai|gpt|gemini|claude)/.test(topicText)) {
    return { category: 'ai-platform', themeKey: 'signal-factory' };
  }

  if (/(infra|docker|kubernetes|terraform|devops|platform|cloud|server)/.test(topicText)) {
    return { category: 'infrastructure', themeKey: 'midnight-grid' };
  }

  if (/(research|paper|benchmark|notebook|dataset|science|analysis)/.test(topicText)) {
    return { category: 'research', themeKey: 'atlas-notes' };
  }

  if (/(design|creative|portfolio|visual|figma|animation|image)/.test(topicText)) {
    return { category: 'creative-tool', themeKey: 'studio-fold' };
  }

  if (/(react|next|frontend|ui|web|typescript|javascript)/.test(topicText)) {
    return { category: 'web-builder', themeKey: 'builder-spring' };
  }

  return { category: 'developer-tool', themeKey: 'builder-spring' };
}

function buildDefaultAudienceProfiles(category) {
  switch (category) {
    case 'ai-platform':
      return [
        {
          title: 'AI builders',
          beneficiaries: 'Teams shipping model-powered products',
          impact: 'They get a clearer path from prototype ideas to repeatable product behavior.',
        },
        {
          title: 'Operators and founders',
          beneficiaries: 'People turning AI into a business outcome',
          impact: 'They can explain the product faster and connect the repo to a commercial narrative.',
        },
      ];
    case 'infrastructure':
      return [
        {
          title: 'Platform engineers',
          beneficiaries: 'Teams responsible for reliability and deployment',
          impact: 'They get leverage over setup, safety, or runtime operations.',
        },
        {
          title: 'Growing product teams',
          beneficiaries: 'Teams outgrowing manual infrastructure habits',
          impact: 'They can move faster without carrying as much operational friction.',
        },
      ];
    case 'research':
      return [
        {
          title: 'Researchers and evaluators',
          beneficiaries: 'People trying to understand a new method or benchmark',
          impact: 'They can learn the idea faster and decide whether to trust or adapt it.',
        },
        {
          title: 'Applied teams',
          beneficiaries: 'Teams looking to turn research into implementation',
          impact: 'They get a cleaner story for why the work matters beyond a paper or notebook.',
        },
      ];
    default:
      return [
        {
          title: 'Busy builders',
          beneficiaries: 'Developers, founders, and product teams evaluating the repo quickly',
          impact: 'They can understand the project without digging through raw repository structure first.',
        },
        {
          title: 'Open-source maintainers',
          beneficiaries: 'People trying to explain and distribute their work',
          impact: 'They get a clearer page for sharing the repo outside GitHub-native audiences.',
        },
      ];
  }
}

function buildDefaultStrategy(repoTitle, audienceProfiles, meaning, importance) {
  return {
    idealCustomerProfile:
      audienceProfiles?.[0]?.beneficiaries || 'Busy builders deciding whether the repo deserves their attention.',
    userProblem: 'A raw repository makes every visitor do their own interpretation work before they can trust the project.',
    desiredOutcome: `${repoTitle} is understood quickly enough to evaluate, adopt, or share with confidence.`,
    adoptionTrigger: 'The visitor needs a fast, credible explanation before committing time to the codebase.',
    positioning: `${repoTitle} should read like a premium product brief, not a raw GitHub index.`,
  };
}

function buildFallbackIntelligence(snapshot) {
  const classification = classifyRepository(snapshot);
  const description = sanitizeText(snapshot.repo.description);
  const topics = snapshot.repo.topics || [];
  const languageNames = Object.keys(snapshot.languages || {});
  const repoName = snapshot.repo.name;
  const repoTitle = repoName.replace(/[-_]/g, ' ');

  const meaning =
    description ||
    `This repository packages ${repoTitle} into something another builder can adopt, evaluate, or build on.`;

  const importance = topics.length > 0
    ? `It matters because it gives people a faster way to reason about ${topics.slice(0, 3).join(', ')} without reading the entire repository first.`
    : `It matters because it turns a raw repository into something easier to explain, evaluate, and share.`;

  const lifeImprovements = uniqueStrings([
    `Cuts the time it takes to understand what ${repoName} actually does.`,
    `Helps a busy evaluator decide whether this project fits their workflow or stack.`,
    `Gives the maintainer a better public surface than a raw GitHub landing page.`,
  ], 3);

  const futureImplications = uniqueStrings([
    `If the project grows, it can become a stronger trust surface for contributors, users, and partners.`,
    `It can evolve into a clearer entry point for onboarding, adoption, and custom deployment.`,
    `A sharper public narrative makes it easier for the repo to travel beyond GitHub-native audiences.`,
  ], 3);

  const audienceProfiles = buildDefaultAudienceProfiles(classification.category);
  const strategy = buildDefaultStrategy(repoTitle, audienceProfiles, meaning, importance);
  const tagline =
    description || `For ${strategy.idealCustomerProfile.toLowerCase()}, without the usual repository archaeology.`;
  const heroTitle = `See why ${repoTitle} matters`;
  const heroDescription = `${meaning} ${importance}`;
  const problem = `Raw repositories are powerful, but they ask every visitor to do their own interpretation work.`;
  const solution = `${repoTitle} gets a launch page that explains the repo, the people it helps, and why it matters before someone opens the code.`;
  const designPrompt = [
    `Design a high-trust launch page for the GitHub repository "${repoName}".`,
    `Audience focus: ${audienceProfiles.map((profile) => profile.beneficiaries).join('; ')}.`,
    `The user should feel: clarity, momentum, confidence.`,
    `Primary message: ${meaning}`,
    `Why it matters: ${importance}`,
    `Future implications: ${futureImplications.join(' ')}`,
    `Use an intentional, premium, Apple-leaning layout with restrained custom CSS, subtle surfaces, thin-line icons, and image-to-text balance.`,
    `Sections should include hero, metric rail, owner profile, who it helps, what this really is, why it matters, impact narrative, stack snapshot, source grounding, and other credible GitHub contributions.`,
    `Avoid Tailwind-card energy, loud gradients, or AI-slop aesthetics. Make it feel calm, crafted, and top-tier.`,
  ].join(' ');

  return {
    classification,
    story: {
      repositoryMeaning: meaning,
      importantBecause: importance,
      heroTitle,
      heroTagline: tagline,
      heroDescription,
      problem,
      solution,
      lifeImprovements,
      futureImplications,
    },
    audienceProfiles,
    strategy,
    design: {
      themeKey: classification.themeKey,
      themeName: classification.category,
      visualDirection: 'Subtle, premium product storytelling with icon-led proof, calm hierarchy, and high visual clarity.',
      stitchPrompt: designPrompt,
    },
    ai: {
      enabled: false,
      provider: 'none',
      model: '',
      fallback: true,
    },
  };
}

function normalizeAudienceProfiles(value, fallback) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = value
    .map((item) => ({
      title: sanitizeText(item?.title),
      beneficiaries: sanitizeText(item?.beneficiaries),
      impact: sanitizeText(item?.impact),
    }))
    .filter((item) => item.title && item.beneficiaries && item.impact);

  return cleaned.length > 0 ? cleaned.slice(0, 4) : fallback;
}

function normalizeStringArray(value, fallback, limit = 4) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = uniqueStrings(value, limit);

  return cleaned.length > 0 ? cleaned : fallback;
}

function normalizeStrategy(value, fallback) {
  return {
    idealCustomerProfile: sanitizeText(value?.idealCustomerProfile) || fallback.idealCustomerProfile,
    userProblem: sanitizeText(value?.userProblem) || fallback.userProblem,
    desiredOutcome: sanitizeText(value?.desiredOutcome) || fallback.desiredOutcome,
    adoptionTrigger: sanitizeText(value?.adoptionTrigger) || fallback.adoptionTrigger,
    positioning: sanitizeText(value?.positioning) || fallback.positioning,
  };
}

function mergeIntelligence(fallback, generated, aiMetadata) {
  const classification = {
    category: sanitizeText(generated?.classification?.category) || fallback.classification.category,
    themeKey: sanitizeText(generated?.classification?.themeKey) || fallback.classification.themeKey,
  };

  return {
    classification,
    story: {
      repositoryMeaning: sanitizeText(generated?.story?.repositoryMeaning) || fallback.story.repositoryMeaning,
      importantBecause: sanitizeText(generated?.story?.importantBecause) || fallback.story.importantBecause,
      heroTitle: sanitizeText(generated?.story?.heroTitle) || fallback.story.heroTitle,
      heroTagline: sanitizeText(generated?.story?.heroTagline) || fallback.story.heroTagline,
      heroDescription: sanitizeText(generated?.story?.heroDescription) || fallback.story.heroDescription,
      problem: sanitizeText(generated?.story?.problem) || fallback.story.problem,
      solution: sanitizeText(generated?.story?.solution) || fallback.story.solution,
      lifeImprovements: normalizeStringArray(generated?.story?.lifeImprovements, fallback.story.lifeImprovements, 4),
      futureImplications: normalizeStringArray(generated?.story?.futureImplications, fallback.story.futureImplications, 4),
    },
    audienceProfiles: normalizeAudienceProfiles(generated?.audienceProfiles, fallback.audienceProfiles),
    strategy: normalizeStrategy(generated?.strategy, fallback.strategy),
    design: {
      themeKey: sanitizeText(generated?.design?.themeKey) || classification.themeKey,
      themeName: sanitizeText(generated?.design?.themeName) || fallback.design.themeName,
      visualDirection: sanitizeText(generated?.design?.visualDirection) || fallback.design.visualDirection,
      stitchPrompt: sanitizeText(generated?.design?.stitchPrompt) || fallback.design.stitchPrompt,
    },
    ai: aiMetadata,
  };
}

function buildSystemPrompt() {
  return [
    'You are an expert repository analyst, product storyteller, and launch-page strategist.',
    'Read the repository metadata and README excerpt, then explain the project for real people, not only developers.',
    'Your job is to identify who benefits, how their lives or work improve, why the repository matters, and what future implications it could have.',
    'Also produce strong hero copy, ICP-aware product strategy, and a premium UI design brief that could be sent to a design system or an AI design tool like Stitch.',
    'The page must feel calm, high-trust, and visually balanced, more like a premium Apple product brief than a generic startup landing page.',
    'Return JSON only.',
  ].join(' ');
}

function buildUserPrompt(snapshot, fallback) {
  const readmeExcerpt = sanitizeText(snapshot.readme?.content || '').slice(0, 9000);

  return `
Analyze this GitHub repository and turn it into a launch-page intelligence packet.

Repository metadata:
${JSON.stringify(
    {
      repo: {
        name: snapshot.repo.name,
        description: snapshot.repo.description,
        topics: snapshot.repo.topics || [],
        homepage: snapshot.repo.homepage || '',
        stars: snapshot.repo.stargazers_count,
        forks: snapshot.repo.forks_count,
        watchers: snapshot.repo.subscribers_count,
        openIssues: snapshot.repo.open_issues_count,
      },
      languages: snapshot.languages,
      ownerProfile: snapshot.ownerProfile,
      ownerRepositories: snapshot.ownerRepositories,
      normalized: snapshot.normalized,
    },
    null,
    2
  )}

README excerpt:
${readmeExcerpt}

Fallback understanding to improve on:
${JSON.stringify(fallback, null, 2)}

Output JSON with this exact structure:
{
  "classification": {
    "category": "short category label",
    "themeKey": "builder-spring | midnight-grid | atlas-notes | signal-factory | studio-fold"
  },
  "story": {
    "repositoryMeaning": "plain-English explanation of what this repo really is",
    "importantBecause": "why it matters beyond the code",
    "heroTitle": "premium launch-page title",
    "heroTagline": "clear subtitle",
    "heroDescription": "2-3 sentence explanation for the hero body",
    "problem": "what pain or friction exists without this repo",
    "solution": "how the repo changes the situation",
    "lifeImprovements": ["3-4 bullets about how lives or work improve"],
    "futureImplications": ["3-4 bullets about future potential, implications, or importance"]
  },
  "audienceProfiles": [
    {
      "title": "audience label",
      "beneficiaries": "whose lives or work are affected",
      "impact": "how they benefit"
    }
  ],
  "strategy": {
    "idealCustomerProfile": "who this page should speak to most directly",
    "userProblem": "what makes the repo hard to evaluate today",
    "desiredOutcome": "what better future the visitor wants",
    "adoptionTrigger": "what causes them to care right now",
    "positioning": "how to frame the repo at a product-story level"
  },
  "design": {
    "themeKey": "builder-spring | midnight-grid | atlas-notes | signal-factory | studio-fold",
    "themeName": "human-readable theme name",
    "visualDirection": "short art-direction summary",
    "stitchPrompt": "detailed prompt for generating a high-quality landing page in Stitch"
  }
}

Constraints:
- Stay factual and grounded in the repo and README. Do not invent integrations or achievements.
- Explain the repo for a busy audience that may not read code.
- The hero copy should feel premium, clear, value-oriented, and easy to scan.
- Write the hero title like a marketing headline, not a README heading.
- Write the hero tagline like a subtitle for the most relevant user segment.
- The strategy object should feel like product strategy, not generic personas.
- The Stitch prompt should mention layout, tone, typography, proof signals, owner credibility, related repositories, and image-to-text balance.
- Prefer calm, subtle, top-tier product aesthetics over loud gradients or generic startup UI.
`.trim();
}

async function requestOpenAiIntelligence(snapshot, fallback) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEFAULT_OPENAI_MODEL,
        response_format: {
          type: 'json_object',
        },
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(),
          },
          {
            role: 'user',
            content: buildUserPrompt(snapshot, fallback),
          },
        ],
      }),
      signal: controller.signal,
    });

    const requestId = response.headers.get('x-request-id') || '';
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.error?.message || `OpenAI request failed with ${response.status}`);
    }

    const content = payload?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('OpenAI returned an empty response.');
    }

    return mergeIntelligence(fallback, JSON.parse(content), {
      enabled: true,
      provider: 'openai',
      model: payload.model || DEFAULT_OPENAI_MODEL,
      fallback: false,
      requestId,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function generateRepoIntelligence(snapshot) {
  const fallback = buildFallbackIntelligence(snapshot);

  if (!process.env.OPENAI_API_KEY) {
    return fallback;
  }

  try {
    return await requestOpenAiIntelligence(snapshot, fallback);
  } catch (error) {
    return {
      ...fallback,
      ai: {
        enabled: true,
        provider: 'openai',
        model: DEFAULT_OPENAI_MODEL,
        fallback: true,
        error: error instanceof Error ? error.message : 'AI interpretation failed.',
      },
    };
  }
}

export function buildFallbackRepoIntelligence(snapshot) {
  return buildFallbackIntelligence(snapshot);
}
