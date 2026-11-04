import { Pipe, PipeTransform } from '@angular/core';

/** Platform "today" for the manager and administration workspaces. */
const REFERENCE_NOW = new Date('2026-10-16T11:20:00');

function parse(value: string): Date {
  return new Date(value.length === 10 ? `${value}T00:00:00` : value);
}

/**
 * Human wording used by the notification panels: "Il y a 2 h", "Hier 10:42",
 * then the plain date. The reference instant is fixed so the mock data always
 * reads the same way.
 */
@Pipe({ name: 'relativeFr' })
export class RelativeDatePipe implements PipeTransform {
  transform(value: string | null | undefined, now: Date = REFERENCE_NOW): string {
    if (!value) return '';
    const date = parse(value);
    if (Number.isNaN(date.getTime())) return value;

    const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    const minutes = Math.round((now.getTime() - date.getTime()) / 60_000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;

    const sameDay = date.toDateString() === now.toDateString();
    if (sameDay) {
      const hours = Math.round(minutes / 60);
      return hours < 6 ? `Il y a ${hours} h` : `Aujourd'hui ${time}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return `Hier ${time}`;

    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  }
}
