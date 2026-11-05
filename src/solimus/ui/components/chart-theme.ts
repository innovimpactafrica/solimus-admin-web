/** Shared Chart.js styling, so every chart matches the Solimus theme. */

export const CHART_MUTED = '#8a8f95';
export const CHART_INK = '#1f2328';
export const CHART_GRID = '#efede8';
export const CHART_TRACK = '#efede8';
export const CHART_REFERENCE = '#d9e4df';

export const CHART_TOOLTIP = {
  backgroundColor: CHART_INK,
  padding: 10,
  cornerRadius: 8,
  boxPadding: 4,
  usePointStyle: true,
} as const;

/** Canvas cannot read CSS variables: resolve the app font once, at render time. */
export function chartFont(): { family: string; size: number } {
  const family =
    typeof document !== 'undefined' ? getComputedStyle(document.body).fontFamily : '';
  return { family: family || 'system-ui, sans-serif', size: 12 };
}
