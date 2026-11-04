import { Pipe, PipeTransform } from '@angular/core';

/** Narrow no-break space, as used by the French thousands separator. */
const NBSP = ' ';

/** Formats an amount the way every Solimus document and screen does: `12 400 000 FCFA`. */
export function formatAmount(value: number, decimals = 0): string {
  return value
    .toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    .replace(/ | | /g, NBSP);
}

@Pipe({ name: 'fcfa' })
export class FcfaPipe implements PipeTransform {
  /**
   * @param suffix `true` appends ` FCFA` (default), `false` returns the number only.
   * @param decimals number of decimals — documents use 2, screens use 0.
   */
  transform(value: number | null | undefined, suffix = true, decimals = 0): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '—';
    }
    const formatted = formatAmount(value, decimals);
    return suffix ? `${formatted}${NBSP}FCFA` : formatted;
  }
}
