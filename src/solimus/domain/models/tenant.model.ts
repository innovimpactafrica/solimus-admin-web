import { Amount, IsoDate, Party } from './common.model';

export type TenantKind = 'individual' | 'company';

export interface Tenant extends Party {
  readonly kind: TenantKind;
  readonly birthDate?: IsoDate;
  readonly idDocument?: string;
  readonly occupation?: string;
  readonly monthlyIncome?: Amount;
  readonly ninea?: string;
  /** Companies with a NINEA are VAT liable: their rent notices carry 18% VAT (RG-17). */
  readonly vatLiable: boolean;
  readonly hasMobileAccess: boolean;
  readonly since?: IsoDate;
  readonly guarantor?: {
    readonly name: string;
    readonly phone: string;
    readonly relationship: string;
    readonly occupation?: string;
  };
}

/** The six documents every applicant must provide. */
export const APPLICATION_DOCUMENTS = [
  "Carte d'identité",
  '3 derniers bulletins de salaire',
  'Contrat de travail',
  "Attestation de l'employeur",
  'Justificatif de domicile actuel',
  'Engagement de caution',
] as const;

export type ApplicationStage = 'new' | 'reviewing' | 'visit' | 'selected';

export interface TenantApplication {
  readonly id: string;
  readonly propertyRef: string;
  readonly stage: ApplicationStage;
  readonly fullName: string;
  readonly phone: string;
  readonly occupation: string;
  readonly monthlyIncome: Amount;
  /** Number of the six required documents already provided. */
  readonly documentsProvided: number;
  readonly household: string;
  readonly desiredMoveIn: string;
  readonly statusLabel: string;
  readonly ownerOpinion?: string;
  readonly receivedOn: IsoDate;
}
