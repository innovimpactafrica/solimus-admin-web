import { Pipe, PipeTransform } from '@angular/core';

const UNITS = [
  'zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf',
  'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize',
  'dix-sept', 'dix-huit', 'dix-neuf',
];
const TENS = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];

function underHundred(n: number): string {
  if (n < 20) return UNITS[n];
  const ten = Math.floor(n / 10);
  const unit = n % 10;
  if (ten === 7 || ten === 9) {
    const rest = n - (ten === 7 ? 60 : 80);
    return (ten === 7 ? 'soixante' : 'quatre-vingt') + (ten === 7 && rest === 11 ? ' et onze' : `-${UNITS[rest]}`);
  }
  if (ten === 8) return unit ? `quatre-vingt-${UNITS[unit]}` : 'quatre-vingts';
  return TENS[ten] + (unit === 0 ? '' : unit === 1 ? ' et un' : `-${UNITS[unit]}`);
}

function underThousand(n: number, isLastGroup: boolean): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  let out = '';
  if (hundreds) {
    out = `${hundreds > 1 ? `${UNITS[hundreds]} ` : ''}cent${hundreds > 1 && !rest && isLastGroup ? 's' : ''}`;
  }
  if (rest) out += `${out ? ' ' : ''}${underHundred(rest)}`;
  return out;
}

/**
 * Spells out an amount in French, as printed on rent receipts.
 * Ported from the reference mockup so wording stays identical.
 */
export function amountInWords(value: number): string {
  if (!value) return 'zéro';
  const millions = Math.floor(value / 1_000_000);
  const thousands = Math.floor((value % 1_000_000) / 1000);
  const rest = value % 1000;
  const parts: string[] = [];
  if (millions) parts.push(`${millions === 1 ? 'un' : underThousand(millions, true)} million${millions > 1 ? 's' : ''}`);
  if (thousands) parts.push(thousands === 1 ? 'mille' : `${underThousand(thousands, false)} mille`);
  if (rest) parts.push(underThousand(rest, true));
  return parts.join(' ');
}

@Pipe({ name: 'amountInWords' })
export class AmountInWordsPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return value === null || value === undefined ? '' : amountInWords(value);
  }
}
