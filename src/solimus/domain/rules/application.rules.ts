import { Amount } from '../models/common.model';
import { APPLICATION_DOCUMENTS } from '../models/tenant.model';

/** Share of a tenant's income taken by the rent and its charges. */
export function effortRate(rent: Amount, charges: Amount, monthlyIncome: Amount): number {
  if (monthlyIncome <= 0) return 0;
  return (rent + charges) / monthlyIncome;
}

export function effortRateLabel(rate: number): string {
  return `${Math.round(rate * 100)} %`;
}

/** An application can only be selected once the six documents are in (specification 4.4). */
export function applicationIsComplete(documentsProvided: number): boolean {
  return documentsProvided >= APPLICATION_DOCUMENTS.length;
}

export function missingApplicationDocuments(documentsProvided: number): readonly string[] {
  return APPLICATION_DOCUMENTS.slice(documentsProvided);
}
