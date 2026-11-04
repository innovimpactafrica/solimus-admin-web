import { PillTone } from '@solimus/ui';
import { SubscriptionStatus, BillingCycle } from '@solimus/domain/models/subscription.model';

export const STATUS_LABEL: Record<SubscriptionStatus, string> = {
  active: 'Actif',
  trial: 'Essai',
  suspended: 'Suspendu',
};

export const STATUS_TONE: Record<SubscriptionStatus, PillTone> = {
  active: 'green',
  trial: 'blue',
  suspended: 'red',
};

export const CYCLE_LABEL: Record<BillingCycle, string> = {
  monthly: 'Mensuel',
  yearly: 'Annuel',
  trial: 'Essai',
};

export const PAYOUT_MODE_LABEL = {
  automatic: 'Automatique',
  onRequest: 'Sur demande',
} as const;
