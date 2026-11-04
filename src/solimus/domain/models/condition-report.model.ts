import { IsoDate, IsoDateTime } from './common.model';

export type ConditionReportType = 'entry' | 'exit';

export type ConditionReportStatus = 'scheduled' | 'capturing' | 'awaitingSignature' | 'signed';

export type ItemCondition = 'good' | 'worn' | 'damaged';

export interface ConditionReportItem {
  readonly label: string;
  readonly condition: ItemCondition;
  readonly observation?: string;
  readonly photoCount: number;
}

export interface ConditionReportRoom {
  readonly name: string;
  readonly items: readonly ConditionReportItem[];
}

/** Utility readings taken on site, prepaid electricity included. */
export interface MeterReadings {
  readonly electricity: string;
  readonly water: string;
  readonly keys: string;
}

export interface ConditionReport {
  /** `EDLE-NNN` for an entry, `EDLS-NNN` for an exit. */
  readonly id: string;
  readonly type: ConditionReportType;
  readonly status: ConditionReportStatus;
  readonly propertyRef: string;
  readonly propertyLabel: string;
  readonly leaseId?: string;
  readonly tenantName: string;
  readonly scheduledAt: IsoDateTime;
  readonly agent: string;
  readonly rooms: readonly ConditionReportRoom[];
  readonly readings?: MeterReadings;
  readonly signedOn?: IsoDate;
  /** Entry report this exit is compared against. */
  readonly comparedWith?: string;
  readonly photoSeed: number;
}
