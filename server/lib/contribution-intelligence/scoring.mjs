export const METRIC_FIELDS = ['prOpened', 'prMerged', 'issuesClosed', 'reviews', 'commits'];

export const DEFAULT_WEIGHTS = Object.freeze({
  prMerged: 5,
  prOpened: 2,
  issuesClosed: 3,
  reviews: 2,
  commits: 0.5,
});

export function createEmptyMetrics() {
  return {
    prOpened: 0,
    prMerged: 0,
    issuesClosed: 0,
    reviews: 0,
    commits: 0,
  };
}

export function normalizeWeights(candidate = {}) {
  return {
    prMerged: toNumber(candidate.prMerged, DEFAULT_WEIGHTS.prMerged),
    prOpened: toNumber(candidate.prOpened, DEFAULT_WEIGHTS.prOpened),
    issuesClosed: toNumber(candidate.issuesClosed, DEFAULT_WEIGHTS.issuesClosed),
    reviews: toNumber(candidate.reviews, DEFAULT_WEIGHTS.reviews),
    commits: toNumber(candidate.commits, DEFAULT_WEIGHTS.commits),
  };
}

export function computeContributionScore(metrics, weights = DEFAULT_WEIGHTS) {
  const resolvedWeights = normalizeWeights(weights);

  return roundToTwoDecimals(
    (toNumber(metrics.prMerged) * resolvedWeights.prMerged)
      + (toNumber(metrics.prOpened) * resolvedWeights.prOpened)
      + (toNumber(metrics.issuesClosed) * resolvedWeights.issuesClosed)
      + (toNumber(metrics.reviews) * resolvedWeights.reviews)
      + (toNumber(metrics.commits) * resolvedWeights.commits)
  );
}

export function mergeMetricTotals(target, source) {
  for (const field of METRIC_FIELDS) {
    target[field] = toNumber(target[field]) + toNumber(source[field]);
  }

  target.score = roundToTwoDecimals(toNumber(target.score) + toNumber(source.score));

  return target;
}

function roundToTwoDecimals(value) {
  return Math.round(value * 100) / 100;
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
