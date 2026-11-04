import { ReminderStage } from '../models/rent.model';

/** Reminder ladder from RG-19, expressed in days relative to the due date. */
export const REMINDER_LADDER = [
  { stage: 'beforeDue' as const, offset: -3, label: 'Rappel avant échéance' },
  { stage: 'first' as const, offset: 1, label: 'Première relance' },
  { stage: 'second' as const, offset: 7, label: 'Deuxième relance, propriétaire informé' },
  { stage: 'formalNotice' as const, offset: 15, label: 'Mise en demeure, après validation du gestionnaire' },
];

/**
 * Reminder stage reached for an unpaid due date.
 * Reminders stop as soon as the rent is paid (RG-19).
 */
export function reminderStage(daysFromDueDate: number, paid: boolean): ReminderStage {
  if (paid) return 'none';
  if (daysFromDueDate >= 15) return 'formalNotice';
  if (daysFromDueDate >= 7) return 'second';
  if (daysFromDueDate >= 1) return 'first';
  if (daysFromDueDate >= -3) return 'beforeDue';
  return 'none';
}

/** The formal notice is only sent once the manager has approved it (RG-19). */
export function formalNoticeNeedsApproval(stage: ReminderStage): boolean {
  return stage === 'formalNotice';
}
