import { buildTemplateContext } from './templates/context.mjs';
import { getTemplateDefinition } from './templates/registry.mjs';

function escapeHtml(value) {
  return `${value || ''}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const THEMES = {
  'builder-spring': { bg: 'linear-gradient(180deg,#f6f4ee 0%,#fbfaf7 45%,#f2efe8 100%)', panel: 'rgba(255,255,255,.9)', tint: '#f1eee7', text: '#161616', muted: '#67615b', line: 'rgba(22,22,22,.08)', accent: '#0f766e', accentSoft: 'rgba(15,118,110,.08)', accentLine: 'rgba(15,118,110,.18)' },
  'midnight-grid': { bg: 'linear-gradient(180deg,#eef2f9 0%,#fafbfd 42%,#edf1f7 100%)', panel: 'rgba(255,255,255,.9)', tint: '#eef3fb', text: '#101828', muted: '#667085', line: 'rgba(16,24,40,.08)', accent: '#2854c5', accentSoft: 'rgba(40,84,197,.08)', accentLine: 'rgba(40,84,197,.18)' },
  'atlas-notes': { bg: 'linear-gradient(180deg,#f8f6f1 0%,#fbfaf8 44%,#f0ece3 100%)', panel: 'rgba(255,255,255,.9)', tint: '#f2eee5', text: '#181818', muted: '#6f6a61', line: 'rgba(24,24,24,.08)', accent: '#7c5c3b', accentSoft: 'rgba(124,92,59,.08)', accentLine: 'rgba(124,92,59,.18)' },
  'signal-factory': { bg: 'linear-gradient(180deg,#f2f6f3 0%,#fafcfb 42%,#edf3ee 100%)', panel: 'rgba(255,255,255,.9)', tint: '#edf3ee', text: '#122018', muted: '#5f7167', line: 'rgba(18,32,24,.08)', accent: '#12715b', accentSoft: 'rgba(18,113,91,.08)', accentLine: 'rgba(18,113,91,.18)' },
  'studio-fold': { bg: 'linear-gradient(180deg,#f7f3f0 0%,#fbfaf9 45%,#f0ebe6 100%)', panel: 'rgba(255,255,255,.9)', tint: '#f5ece6', text: '#1d1716', muted: '#746663', line: 'rgba(29,23,22,.08)', accent: '#9a4d33', accentSoft: 'rgba(154,77,51,.08)', accentLine: 'rgba(154,77,51,.18)' },
};

function icon(name) {
  const map = {
    star: '<path d="M12 3.75l2.57 5.2 5.73.83-4.15 4.05.98 5.72L12 16.9 6.87 19.55l.98-5.72L3.7 9.78l5.73-.83L12 3.75z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    fork: '<path d="M8 5.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm0 13a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm6.5-7a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM10.5 8v6m0 0c0-1.8 1.6-2.5 3.25-2.5h1.75" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    eye: '<path d="M2.75 12s3.25-5.75 9.25-5.75S21.25 12 21.25 12 18 17.75 12 17.75 2.75 12 2.75 12z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.75" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    issue: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="15.75" r=".9" fill="currentColor"/>',
    github: '<path d="M12 3.5a8.5 8.5 0 00-2.68 16.57c.43.08.58-.18.58-.4v-1.44c-2.36.52-2.86-1-2.86-1-.39-.97-.95-1.22-.95-1.22-.78-.53.06-.52.06-.52.86.06 1.3.88 1.3.88.77 1.3 2 0.93 2.49.71.08-.55.3-.93.54-1.15-1.89-.21-3.87-.92-3.87-4.1 0-.91.33-1.66.87-2.25-.08-.21-.38-1.08.08-2.24 0 0 .72-.23 2.36.86a8.31 8.31 0 014.3 0c1.63-1.09 2.35-.86 2.35-.86.46 1.16.17 2.03.08 2.24.55.59.88 1.34.88 2.25 0 3.18-1.99 3.89-3.89 4.09.31.27.59.8.59 1.62v2.41c0 .22.16.48.59.4A8.5 8.5 0 0012 3.5z" fill="currentColor"/>',
    globe: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.75 12h16.5M12 3.75c2.3 2.5 3.5 5.25 3.5 8.25S14.3 17.75 12 20.25M12 3.75c-2.3 2.5-3.5 5.25-3.5 8.25S9.7 17.75 12 20.25" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    people: '<path d="M8.75 11a3 3 0 113-3 3 3 0 01-3 3zm6.5 0a2.5 2.5 0 102.5-2.5 2.5 2.5 0 00-2.5 2.5zM4.5 18.25a4.25 4.25 0 018.5 0M14 18.25a3.75 3.75 0 017.5 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    spark: '<path d="M12 3.5l1.55 4.45L18 9.5l-4.45 1.55L12 15.5l-1.55-4.45L6 9.5l4.45-1.55L12 3.5zm6 11l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2zM5.25 14.5l.58 1.67 1.67.58-1.67.58-.58 1.67-.58-1.67-1.67-.58 1.67-.58.58-1.67z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    arrow: '<path d="M7 17L17 7M8.75 7H17v8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    repo: '<path d="M6.5 4.75h8a2 2 0 012 2v12.5a.5.5 0 01-.76.43L12 17.5l-3.74 2.18a.5.5 0 01-.76-.43V6.75a2 2 0 012-2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 9.25h6M9 12h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  };

  return `<svg viewBox="0 0 24 24" aria-hidden="true">${map[name] || map.repo}</svg>`;
}

function metricMarkup(page) {
  const iconMap = { Stars: 'star', Forks: 'fork', Watchers: 'eye', Issues: 'issue' };
  return (page.metrics || []).map((item) => `<article class="metric"><span class="metric-icon">${icon(iconMap[item.label])}</span><span><strong>${escapeHtml(item.value)}</strong><small>${escapeHtml(item.label)}</small></span></article>`).join('');
}

function listMarkup(items) {
  return (items || []).map((item) => `<li><span class="mark">${icon('spark')}</span><span>${escapeHtml(item)}</span></li>`).join('');
}

function relatedMarkup(page) {
  return (page.relatedRepos || []).slice(0, 4).map((repo) => `<a class="repo-card" href="${escapeHtml(repo.url)}"><div class="eyebrow">Repository</div><h3>${escapeHtml(repo.name)}</h3>${repo.description ? `<p>${escapeHtml(repo.description)}</p>` : ''}<div class="repo-meta"><span>${icon('star')} ${escapeHtml(`${repo.stars}`)}</span><span>${icon('fork')} ${escapeHtml(`${repo.forks}`)}</span></div></a>`).join('');
}

function sourceMarkup(page) {
  return (page.readmeSections || []).slice(0, 3).map((section) => `<article class="info-card"><div class="eyebrow">Source grounding</div><h3>${escapeHtml(section.title)}</h3>${section.body ? `<p>${escapeHtml(section.body)}</p>` : ''}${section.bullets?.length ? `<ul class="micro-list">${listMarkup(section.bullets.slice(0, 3))}</ul>` : ''}</article>`).join('');
}

function audienceMarkup(page) {
  return (page.narrative?.audienceProfiles || []).slice(0, 3).map((profile, index) => `<article class="audience-card"><div class="index">0${index + 1}</div><h3>${escapeHtml(profile.title)}</h3><p class="headline">${escapeHtml(profile.beneficiaries)}</p><p>${escapeHtml(profile.impact)}</p></article>`).join('');
}

function socialMarkup(page) {
  return (page.owner?.socialLinks || []).map((link) => `<a class="chip-link" href="${escapeHtml(link.url)}">${/website/i.test(link.label) ? icon('globe') : icon('github')} ${escapeHtml(link.label)}</a>`).join('');
}

function ownerMarkup(page) {
  if (!page.owner) {
    return '';
  }

  return `
    <section class="section panel">
      <div class="section-head">
        <div class="eyebrow">${icon('people')} Maintainer context</div>
        <h2>The person or team behind the repo</h2>
      </div>
      <div class="owner-card">
        <div class="owner-head">
          ${page.owner.avatarUrl ? `<img class="avatar" src="${escapeHtml(page.owner.avatarUrl)}" alt="${escapeHtml(page.owner.displayName)}" />` : `<div class="avatar avatar-fallback">${icon('github')}</div>`}
          <div>
            <div class="owner-name">${escapeHtml(page.owner.displayName)}</div>
            <a class="owner-handle" href="${escapeHtml(page.owner.profileUrl)}">@${escapeHtml(page.owner.handle)}</a>
          </div>
        </div>
        <p class="owner-bio">${escapeHtml(page.owner.bio || 'Public GitHub profile linked to this repository.')}</p>
        <div class="chip-row">
          ${page.owner.company ? `<span class="chip-link">${icon('repo')} ${escapeHtml(page.owner.company)}</span>` : ''}
          ${page.owner.location ? `<span class="chip-link">${icon('globe')} ${escapeHtml(page.owner.location)}</span>` : ''}
          <span class="chip-link">${icon('people')} ${escapeHtml(`${page.owner.followers}`)} followers</span>
          <span class="chip-link">${icon('repo')} ${escapeHtml(`${page.owner.publicRepos}`)} public repos</span>
        </div>
        <div class="chip-row">${socialMarkup(page)}</div>
      </div>
    </section>
  `;
}

function quickstartMarkup(page) {
  if (!page.quickstart?.length) {
    return '';
  }

  return `<article class="info-card console-card"><div class="eyebrow">Quickstart</div><h3>Fastest credible starting point</h3><pre><code>${escapeHtml(page.quickstart.join('\n'))}</code></pre></article>`;
}

async function renderWithStitchHttp(page) {
  const endpoint = process.env.GOOGLE_STITCH_API_URL;
  if (!endpoint) {
    throw new Error('GOOGLE_STITCH_API_URL is not configured.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (process.env.GOOGLE_STITCH_API_KEY) {
      headers.Authorization = `Bearer ${process.env.GOOGLE_STITCH_API_KEY}`;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        prompt: page.design?.stitchPrompt || '',
        repo: page.source,
        owner: page.owner,
        template: page.template,
        hero: page.hero,
        metrics: page.metrics,
        strategy: page.strategy,
        narrative: page.narrative,
        relatedRepos: page.relatedRepos,
        languageBreakdown: page.languageBreakdown,
        quickstart: page.quickstart,
        readmeSections: page.readmeSections,
        visualParity: page.visualParity,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload?.error || `Stitch provider failed with ${response.status}`);
    }

    if (!payload?.html) {
      throw new Error('Stitch provider did not return html.');
    }

    return { provider: 'stitch-http', status: 'completed', html: payload.html, note: `${payload?.note || ''}`.trim() };
  } finally {
    clearTimeout(timeout);
  }
}

function renderLocalHtml(page) {
  const context = buildTemplateContext(page);
  const theme = THEMES[page.design?.themeKey] || THEMES['builder-spring'];
  const topics = (page.hero?.topics || []).slice(0, 6).map((topic) => `<span class="topic">${escapeHtml(topic)}</span>`).join('');
  const langs = (page.languageBreakdown || []).map((lang) => `<div class="stack-row"><div class="stack-label"><span>${escapeHtml(lang.name)}</span><span>${escapeHtml(`${lang.share}%`)}</span></div><div class="stack-track"><div class="stack-fill" style="width:${lang.share}%"></div></div></div>`).join('');
  const related = relatedMarkup(page);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(page.hero.title)} | Supratik Space</title>
  <base target="_blank" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root{--bg:${theme.bg};--panel:${theme.panel};--tint:${theme.tint};--text:${theme.text};--muted:${theme.muted};--line:${theme.line};--accent:${theme.accent};--accent-soft:${theme.accentSoft};--accent-line:${theme.accentLine};--display:"Instrument Sans","Segoe UI",sans-serif;--body:"Manrope","Segoe UI",sans-serif;--mono:"IBM Plex Mono",monospace}
    *{box-sizing:border-box} body{margin:0;min-height:100vh;background:var(--bg);color:var(--text);font-family:var(--body);-webkit-font-smoothing:antialiased} a{text-decoration:none;color:inherit} img{display:block;max-width:100%}
    .shell{position:relative;overflow:hidden}.glow{position:absolute;border-radius:999px;filter:blur(60px);opacity:.55;pointer-events:none}.glow.one{top:80px;right:6%;width:280px;height:280px;background:var(--accent-soft)}.glow.two{top:420px;left:-60px;width:220px;height:220px;background:rgba(255,255,255,.9)}
    .wrap{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:24px 20px 72px}.panel{border:1px solid var(--line);border-radius:32px;background:var(--panel);box-shadow:0 24px 80px rgba(18,18,18,.06)}
    .topbar{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding:14px 18px;border:1px solid var(--line);border-radius:999px;background:var(--panel)}.topmeta{display:flex;align-items:center;gap:12px}.badge,.eyebrow,.index{font:500 11px/1.3 var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}.badge{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--line);border-radius:999px;background:var(--tint)}.titleline{font-size:14px;color:var(--muted)} .titleline strong{color:var(--text)}
    .hero{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);gap:28px;margin-top:22px}.hero-copy{padding:38px}.hero-copy h1,.section-head h2,.value-card h3,.audience-card h3,.info-card h3,.repo-card h3{margin:0;font-family:var(--display);letter-spacing:-.045em}.hero-copy h1{margin-top:24px;max-width:11ch;font-size:clamp(42px,7vw,72px);line-height:.95}.subtitle{margin-top:18px;max-width:760px;font-size:clamp(19px,2.2vw,26px);line-height:1.45;color:var(--muted)}.bodycopy{margin-top:18px;max-width:760px;font-size:15px;line-height:1.85;color:var(--muted)}
    .cta-row{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:28px}.cta{display:inline-flex;align-items:center;gap:10px;padding:15px 20px;border-radius:999px;background:var(--text);color:#fff;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.assist{font-size:14px;line-height:1.7;color:var(--muted)}
    .metric-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:28px}.metric{display:flex;align-items:center;gap:12px;padding:16px;border-radius:22px;border:1px solid var(--line);background:var(--tint)}.metric-icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:14px;background:#fff;border:1px solid var(--accent-line);color:var(--accent)}.metric strong{display:block;font-size:18px;line-height:1}.metric small{display:block;margin-top:2px;font:500 11px/1.2 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
    .topic-row,.chip-row,.repo-meta{display:flex;gap:10px;flex-wrap:wrap}.topic-row{margin-top:24px}.topic,.chip-link{padding:9px 12px;border-radius:999px;border:1px solid var(--line);background:#fff;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:var(--mono)}.chip-link{display:inline-flex;align-items:center;gap:8px;font:600 13px/1.2 var(--body);letter-spacing:0;text-transform:none}
    .hero-side{position:relative;padding:24px;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.92) 0%,rgba(255,255,255,.84) 100%)}.hero-side:before{content:"";position:absolute;inset:18px;border-radius:28px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.72),rgba(255,255,255,.42))}
    .art{position:relative;min-height:430px}.orbit{position:absolute;border-radius:999px;border:1px solid var(--accent-line)}.orbit.one{top:34px;right:36px;width:280px;height:280px}.orbit.two{bottom:18px;left:18px;width:220px;height:220px}.glass{position:absolute;z-index:1;padding:18px;border-radius:24px;border:1px solid var(--line);background:rgba(255,255,255,.84);box-shadow:0 18px 42px rgba(17,17,17,.06);backdrop-filter:blur(10px)}.glass.one{top:28px;left:28px;width:min(300px,78%)}.glass.two{right:22px;top:174px;width:min(240px,68%)}.glass.three{left:54px;bottom:36px;width:min(260px,74%)}.minirow{display:flex;align-items:center;gap:14px;margin-top:12px}.minirow strong,.glass strong{display:block;font-size:19px;line-height:1.15}.minirow span,.glass span{display:block;margin-top:6px;color:var(--muted);font-size:14px;line-height:1.6}.avatar{width:56px;height:56px;border-radius:999px;object-fit:cover}.avatar-fallback{display:flex;align-items:center;justify-content:center;background:var(--tint);color:var(--accent);border:1px solid var(--accent-line)}
    .section{margin-top:22px;padding:30px}.section-head{display:flex;flex-direction:column;gap:10px;margin-bottom:20px}.section-head h2{font-size:clamp(28px,4.2vw,44px);line-height:1.02;max-width:14ch}.value-grid,.audience-grid,.impact-grid,.proof-grid,.source-grid,.repo-grid{display:grid;gap:16px}.value-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.audience-grid{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:16px}.impact-grid{grid-template-columns:1.1fr .9fr .9fr}.proof-grid{grid-template-columns:.98fr 1.02fr}.source-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.repo-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .value-card,.audience-card,.info-card,.repo-card,.owner-card{border:1px solid var(--line);background:var(--tint);border-radius:28px}.value-card,.audience-card,.info-card,.repo-card,.owner-card{padding:22px}.value-card p,.audience-card p,.info-card p,.owner-bio{margin:14px 0 0;color:var(--muted);line-height:1.8}.value-card h3{margin-top:18px;font-size:30px;line-height:1}.visual{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:16px;background:#fff;color:var(--accent);border:1px solid var(--accent-line)}.headline{margin:12px 0 0;font-size:15px;font-weight:700;color:var(--text)}
    .owner-head{display:flex;align-items:center;gap:16px}.owner-name{font-size:24px;font-weight:800;letter-spacing:-.03em}.owner-handle{display:inline-block;margin-top:6px;color:var(--muted)}
    .micro-list,.benefits{margin:16px 0 0;padding:0;list-style:none;display:grid;gap:14px}.micro-list li,.benefits li{display:flex;align-items:flex-start;gap:12px;color:var(--muted);line-height:1.7}.mark{display:inline-flex;align-items:center;justify-content:center;margin-top:2px;color:var(--accent);flex:0 0 auto}
    .stack-row+.stack-row{margin-top:12px}.stack-label{display:flex;justify-content:space-between;gap:16px;font-size:14px;font-weight:700}.stack-track{margin-top:10px;height:10px;border-radius:999px;overflow:hidden;background:rgba(0,0,0,.06)}.stack-fill{height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--accent),color-mix(in srgb,var(--accent) 58%,white))}
    .console-card pre{margin:16px 0 0;padding:18px;border-radius:22px;background:#121212;color:#f6f6f2;overflow-x:auto;font-size:13px;line-height:1.9}
    .repo-card{display:block}.repo-card h3{margin-top:10px;font-size:24px}.footer{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:22px;padding:18px 22px;border-radius:26px;border:1px solid var(--line);background:var(--panel)}.footer p{margin:8px 0 0;color:var(--muted);line-height:1.7}
    svg{width:16px;height:16px}
    @media (max-width:1120px){.hero,.impact-grid,.proof-grid,.value-grid,.audience-grid,.source-grid,.repo-grid{grid-template-columns:1fr}.hero-copy h1,.section-head h2{max-width:none}}
    @media (max-width:760px){.wrap{padding:16px 14px 44px}.hero-copy,.hero-side,.section{padding:22px}.metric-row{grid-template-columns:1fr 1fr}.panel,.value-card,.audience-card,.info-card,.repo-card,.owner-card{border-radius:24px}.art{min-height:auto;display:grid;gap:14px}.orbit{display:none}.glass{position:relative;top:auto;right:auto;left:auto;bottom:auto;width:100%}}
  </style>
</head>
<body>
  <div class="shell">
    <div class="glow one"></div><div class="glow two"></div>
    <div class="wrap">
      <header class="topbar">
        <div class="topmeta"><span class="badge">${icon('github')} ${escapeHtml(context.template.label)}</span><div class="titleline"><strong>${escapeHtml(page.source.owner)}</strong> / ${escapeHtml(page.source.repo)}</div></div>
        <div class="titleline">Built from real GitHub signals, not mocked copy.</div>
      </header>

      <section class="hero">
        <div class="panel hero-copy">
          <div class="eyebrow">${icon('spark')} AI-shaped product brief</div>
          <h1>${escapeHtml(page.hero.title)}</h1>
          <div class="subtitle">${escapeHtml(page.hero.tagline)}</div>
          <p class="bodycopy">${escapeHtml(page.hero.description)}</p>
          <div class="cta-row"><a class="cta" href="${escapeHtml(page.source.repoUrl)}">${icon('github')} View on GitHub</a><div class="assist">${escapeHtml(page.strategy?.positioning || 'A calmer, faster first read for a real open-source project.')}</div></div>
          <div class="metric-row">${metricMarkup(page)}</div>
          ${topics ? `<div class="topic-row">${topics}</div>` : ''}
        </div>
        <aside class="panel hero-side">
          <div class="art">
            <div class="orbit one"></div><div class="orbit two"></div>
            <div class="glass one"><div class="eyebrow">Maintainer</div><div class="minirow">${page.owner?.avatarUrl ? `<img class="avatar" src="${escapeHtml(page.owner.avatarUrl)}" alt="${escapeHtml(page.owner.displayName || page.source.owner)}" />` : `<div class="avatar avatar-fallback">${icon('github')}</div>`}<div><strong>${escapeHtml(page.owner?.displayName || page.source.owner)}</strong><span>@${escapeHtml(page.owner?.handle || page.source.owner)}</span></div></div></div>
            <div class="glass two"><div class="eyebrow">Visual balance</div><strong>${escapeHtml(page.visualParity?.status || 'balanced')}</strong><span>${escapeHtml(`${page.visualParity?.visualBlocks || 0} visual cues / ${page.visualParity?.textBlocks || 0} text blocks`)}</span></div>
            <div class="glass three"><div class="eyebrow">Audience</div><strong>${escapeHtml(page.strategy?.idealCustomerProfile || page.narrative?.audienceProfiles?.[0]?.beneficiaries || page.source.owner)}</strong><span>${escapeHtml(page.strategy?.adoptionTrigger || 'A fast, credible explanation before time goes into the codebase.')}</span></div>
          </div>
        </aside>
      </section>

      <section class="section panel">
        <div class="section-head"><div class="eyebrow">${icon('repo')} Product read</div><h2>The repo, translated into a story people can scan.</h2></div>
        <div class="value-grid">
          <article class="value-card"><div class="visual">${icon('repo')}</div><h3>What this really is</h3><p>${escapeHtml(page.narrative?.repositoryMeaning || page.hero.description)}</p></article>
          <article class="value-card"><div class="visual">${icon('spark')}</div><h3>Why it matters</h3><p>${escapeHtml(page.narrative?.importantBecause || page.strategy?.userProblem || '')}</p></article>
          <article class="value-card"><div class="visual">${icon('people')}</div><h3>Who it helps</h3><p>${escapeHtml(page.strategy?.idealCustomerProfile || page.narrative?.audienceProfiles?.[0]?.beneficiaries || '')}</p></article>
        </div>
        <div class="audience-grid">${audienceMarkup(page)}</div>
      </section>

      <section class="section panel">
        <div class="section-head"><div class="eyebrow">${icon('spark')} Impact narrative</div><h2>Why this project changes the situation for its audience.</h2></div>
        <div class="impact-grid">
          <article class="info-card"><div class="eyebrow">Problem to solve</div><h3>${escapeHtml(page.narrative?.problem || page.strategy?.userProblem || 'The repo is easy to undersell at first glance.')}</h3><p>${escapeHtml(page.narrative?.solution || page.strategy?.desiredOutcome || page.hero.description)}</p></article>
          <article class="info-card"><div class="eyebrow">Lives improved</div><ul class="benefits">${listMarkup(page.narrative?.lifeImprovements || [])}</ul></article>
          <article class="info-card"><div class="eyebrow">Future implications</div><ul class="benefits">${listMarkup(page.narrative?.futureImplications || [])}</ul></article>
        </div>
      </section>

      ${ownerMarkup(page)}

      <section class="section panel">
        <div class="section-head"><div class="eyebrow">${icon('repo')} Technical proof</div><h2>The stack and the fastest path into the repo.</h2></div>
        <div class="proof-grid">
          <article class="info-card"><div class="eyebrow">Stack snapshot</div><h3>What the repository is actually built with</h3><div style="margin-top:16px">${langs}</div></article>
          ${quickstartMarkup(page) || `<article class="info-card"><div class="eyebrow">Adoption trigger</div><h3>${escapeHtml(page.strategy?.desiredOutcome || 'A clearer first read for the right audience.')}</h3><p>${escapeHtml(page.strategy?.adoptionTrigger || 'The visitor needs a fast, credible explanation before going deeper into the repository.')}</p></article>`}
        </div>
      </section>

      <section class="section panel">
        <div class="section-head"><div class="eyebrow">${icon('repo')} Source grounding</div><h2>The page still stays close to the README.</h2></div>
        <div class="source-grid">${sourceMarkup(page)}</div>
      </section>

      ${related ? `<section class="section panel"><div class="section-head"><div class="eyebrow">${icon('github')} More from this GitHub profile</div><h2>Other credible repositories by the same account.</h2></div><div class="repo-grid">${related}</div></section>` : ''}

      <footer class="footer"><div><div class="eyebrow">${icon('spark')} Generated by Supratik Space</div><p>${escapeHtml(page.design?.visualDirection || 'A calmer, more visual repo page built on top of actual GitHub signals.')}</p></div><div class="titleline">${escapeHtml(context.template.label)} | Visual parity: <strong>${escapeHtml(page.visualParity?.status || 'balanced')}</strong></div></footer>
    </div>
  </div>
</body>
</html>`;
}

export async function renderLaunchPageDesign(page) {
  const template = getTemplateDefinition(page.template?.id);
  const preferredProvider = process.env.REPO_PAGE_DESIGN_PROVIDER || 'local-html';

  if (preferredProvider === 'stitch-http') {
    try {
      const stitched = await renderWithStitchHttp(page);
      return { provider: stitched.provider, status: stitched.status, html: stitched.html, note: stitched.note };
    } catch (error) {
      return { provider: 'local-html', status: 'fallback_local_html', html: renderLocalHtml(page), note: error instanceof Error ? error.message : 'Stitch provider failed.' };
    }
  }

  return { provider: 'local-html', status: 'completed', html: renderLocalHtml({ ...page, template }), note: `Rendered with ${template.label}.` };
}
