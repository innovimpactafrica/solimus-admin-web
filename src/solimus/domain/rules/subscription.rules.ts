import { Amount } from '../models/common.model';
import { Plan, PlanLimits, PlanUsage, UsageLevel } from '../models/subscription.model';

/** VAT added by Solimus to subscription invoices (RG-28). */
export const SUBSCRIPTION_VAT_RATE = 0.18;

export function withVat(amountExclTax: Amount): Amount {
  return Math.round(amountExclTax * (1 + SUBSCRIPTION_VAT_RATE));
}

/** Managers are warned at 80% of a limit and blocked at 100% (RG-29). */
export function usageLevel(used: number, limit: number): UsageLevel {
  if (limit <= 0) return 'ok';
  const ratio = used / limit;
  if (ratio >= 1) return 'blocked';
  if (ratio >= 0.8) return 'warning';
  return 'ok';
}

export type LimitKey = keyof PlanLimits;

export interface LimitStatus {
  readonly key: LimitKey;
  readonly label: string;
  readonly used: number;
  readonly limit: number;
  readonly level: UsageLevel;
  readonly ratio: number;
}

const LIMIT_LABELS: Record<LimitKey, string> = {
  owners: 'Propriétaires',
  properties: 'Biens',
  users: "Utilisateurs de l'agence",
  storageGb: 'Stockage des documents',
};

export function planUsageStatus(usage: PlanUsage, limits: PlanLimits): readonly LimitStatus[] {
  return (Object.keys(LIMIT_LABELS) as LimitKey[]).map((key) => {
    const used = key === 'storageGb' ? usage.storageGb : usage[key];
    const limit = limits[key];
    return {
      key,
      label: LIMIT_LABELS[key],
      used,
      limit,
      level: usageLevel(used, limit),
      ratio: limit > 0 ? Math.min(1, used / limit) : 0,
    };
  });
}

/** Adding a record is refused once the matching limit is reached (RG-29). */
export function canAdd(kind: LimitKey, usage: PlanUsage, limits: PlanLimits): boolean {
  const used = kind === 'storageGb' ? usage.storageGb : usage[kind];
  return used < limits[kind];
}

/**
 * Downgrading is only possible when current usage fits the smaller plan
 * (section 9 of the specification).
 */
export function canSwitchTo(plan: Plan, usage: PlanUsage): boolean {
  return (
    usage.owners <= plan.limits.owners &&
    usage.properties <= plan.limits.properties &&
    usage.users <= plan.limits.users &&
    usage.storageGb <= plan.limits.storageGb
  );
}

/** Yearly billing is ten months paid for twelve (section 9). */
export function yearlyFromMonthly(monthlyExclTax: Amount): Amount {
  return monthlyExclTax * 10;
}

/** Days of unpaid subscription before the workspace becomes read only (RG-30). */
export const SUSPENSION_AFTER_DAYS = 7;

export function isReadOnly(daysUnpaid: number): boolean {
  return daysUnpaid >= SUSPENSION_AFTER_DAYS;
}
