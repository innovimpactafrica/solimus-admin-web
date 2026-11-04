import { Pipe, PipeTransform } from '@angular/core';

const MONTHS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

export type DateFrFormat = 'short' | 'long' | 'month' | 'dayMonth';

function toDate(value: Date | string): Date {
  if (value instanceof Date) return value;
  // Accept both ISO (2026-10-16) and French (16/10/2026) inputs.
  const fr = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (fr) return new Date(Number(fr[3]), Number(fr[2]) - 1, Number(fr[1]));
  return new Date(value);
}

@Pipe({ name: 'dateFr' })
export class DateFrPipe implements PipeTransform {
  transform(value: Date | string | null | undefined, format: DateFrFormat = 'short'): string {
    if (!value) return '—';
    const date = toDate(value);
    if (Number.isNaN(date.getTime())) return String(value);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    switch (format) {
      case 'long':
        return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
      case 'month':
        return `${MONTHS[date.getMonth()][0].toUpperCase()}${MONTHS[date.getMonth()].slice(1)} ${date.getFullYear()}`;
      case 'dayMonth':
        return `${day}/${month}`;
      default:
        return `${day}/${month}/${date.getFullYear()}`;
    }
  }
}
