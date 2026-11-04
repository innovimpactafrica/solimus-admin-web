import { Amount } from '../models/common.model';

/** Default threshold written in the management mandate (RG-25). */
export const DEFAULT_WORKS_THRESHOLD: Amount = 50_000;

/**
 * Above the mandate threshold a quote must be approved by the owner in their
 * own application; at or below it the manager decides alone (RG-25).
 */
export function quoteNeedsOwnerApproval(total: Amount, threshold = DEFAULT_WORKS_THRESHOLD): boolean {
  return total > threshold;
}

/** Maximum response time by urgency, in hours (RG-26). */
export const RESPONSE_TIME_HOURS = { normal: 72, urgent: 24, danger: 0 } as const;

export interface IncidentClosureInput {
  readonly quoteApproved: boolean;
  readonly workDone: boolean;
  readonly invoiceUploaded: boolean;
}

/** An incident can only be closed with an approved quote, the work done and an invoice (RG-27). */
export function canCloseIncident(input: IncidentClosureInput): boolean {
  return input.quoteApproved && input.workDone && input.invoiceUploaded;
}
