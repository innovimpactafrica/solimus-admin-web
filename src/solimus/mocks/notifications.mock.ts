import { AppNotification, NotificationPreference } from '../domain/models/notification.model';

/** Manager workspace notification panel. */
export const MANAGER_NOTIFICATIONS: readonly AppNotification[] = [
  { id: 'n-1', at: '2026-10-16T09:20', title: 'Loyer en retard', detail: 'Cheikh Ba · F4 Plateau · 11 jours de retard', read: false, tone: 'red', icon: 'alert', link: ['/loyers'] },
  { id: 'n-2', at: '2026-10-15T10:42', title: 'Bail signé par la locataire', detail: 'BAIL-033 · Khady Ndiaye · F2 Sacré-Cœur', read: false, tone: 'green', icon: 'pen', link: ['/baux', 'BAIL-033'] },
  { id: 'n-3', at: '2026-10-16T08:12', title: 'Nouveau sinistre déclaré', detail: "Coupure d'électricité · Studio Point E", read: false, tone: 'orange', icon: 'wrench', link: ['/sinistres', 'SIN-2026-016'] },
  { id: 'n-4', at: '2026-10-16T09:12', title: 'Paiement reçu', detail: 'Alioune Badara Thiam · 550 000 FCFA payés en ligne', read: false, tone: 'blue', icon: 'wallet', link: ['/loyers'] },
  { id: 'n-5', at: '2026-10-15T14:00', title: 'Nouvelle candidature', detail: 'Babacar Seck · F3 Liberté 6', read: true, tone: 'blue', icon: 'inbox', link: ['/biens', 'B-058', 'candidatures'] },
];

/** Tenant app notifications on 30 October 2026. */
export const TENANT_NOTIFICATIONS: readonly AppNotification[] = [
  { id: 'tn-1', at: '2026-10-30T10:12', title: 'Intervention planifiée', detail: 'Ma maison · BTP Ndiaye & Fils passera mardi 3/11 entre 9 h et 11 h pour la fissure.', read: false, tone: 'purple', icon: 'wrench', link: ['/sinistres', 'SIN-2026-015'] },
  { id: 'tn-2', at: '2026-10-30T08:30', title: 'État des lieux à signer', detail: 'Ma boutique · Sandaga · réalisé ce matin', read: false, tone: 'orange', icon: 'pen', link: ['/etats-des-lieux', 'EDLE-K-0112'] },
  { id: 'tn-3', at: '2026-10-25T06:05', title: "4 avis d'échéance de novembre", detail: '1 245 200 FCFA au total · à payer avant le 5/11', read: true, tone: 'blue', icon: 'file', link: ['/loyers'] },
  { id: 'tn-4', at: '2026-10-22T16:00', title: 'Bail signé', detail: 'Ma boutique · bail commercial avec Keur Immo Services', read: true, tone: 'neutral', icon: 'pen', link: ['/documents'] },
  { id: 'tn-5', at: '2026-10-17T12:00', title: 'Sinistre résolu', detail: 'Ma maison · SIN-2026-009 · robinet remplacé', read: true, tone: 'green', icon: 'check', link: ['/sinistres', 'SIN-2026-009'] },
];

/** Owner app notifications on 16 October 2026. */
export const OWNER_NOTIFICATIONS: readonly AppNotification[] = [
  { id: 'on-1', at: '2026-10-16T09:12', title: "Loyer d'octobre payé", detail: 'F4 Mamelles · Alioune Badara Thiam · 520 000 FCFA', read: false, tone: 'green', icon: 'wallet', link: ['/biens', 'B-040'] },
  { id: 'on-2', at: '2026-10-16T08:40', title: 'Devis à valider', detail: 'Chauffe-eau F3 Liberté 6 · 96 000 FCFA', read: false, tone: 'orange', icon: 'check', link: ['/travaux', 'SIN-2026-010'] },
  { id: 'on-3', at: '2026-10-16T08:12', title: 'Nouveau sinistre urgent', detail: "Studio Point E · coupure d'électricité · Fatou Sarr", read: false, tone: 'red', icon: 'bolt', link: ['/travaux', 'SIN-2026-016'] },
  { id: 'on-4', at: '2026-10-11T11:00', title: 'Loyer en retard', detail: 'F2 Grand Yoff · Moussa Kane · 1re relance envoyée', read: true, tone: 'red', icon: 'alert', link: ['/biens', 'B-019'] },
  { id: 'on-5', at: '2026-10-10T09:00', title: 'Reversement effectué', detail: 'Septembre 2026 · 1 638 000 FCFA', read: true, tone: 'blue', icon: 'receipt', link: ['/revenus', 'sep'] },
  { id: 'on-6', at: '2026-10-10T09:00', title: 'Relevé disponible', detail: 'Relevé de gestion de septembre', read: true, tone: 'neutral', icon: 'file', link: ['/documents'] },
];

/** Default notification matrix of the agency (specification, section 8). */
export const NOTIFICATION_PREFERENCES: readonly NotificationPreference[] = [
  { event: 'rentNoticeIssued', label: 'Nouveau loyer appelé', channels: ['app', 'email', 'whatsapp'] },
  { event: 'paymentReceived', label: 'Paiement reçu', channels: ['app', 'email'], locked: true },
  { event: 'paymentLate', label: 'Retard de paiement', channels: ['app', 'email', 'sms', 'whatsapp'] },
  { event: 'signatureRequired', label: 'Signature à effectuer', channels: ['app', 'email', 'whatsapp'] },
  { event: 'signatureCompleted', label: 'Signature finalisée', channels: ['app', 'email'] },
  { event: 'leaseRenewal', label: 'Échéance ou renouvellement de bail', channels: ['app', 'email'] },
  { event: 'incidentDeclared', label: 'Nouveau sinistre déclaré', channels: ['app', 'email', 'sms', 'whatsapp'] },
  { event: 'incidentStageChanged', label: "Changement de statut d'un sinistre", channels: ['app', 'whatsapp'] },
  { event: 'contractorScheduled', label: "Intervention d'un prestataire", channels: ['app'] },
  { event: 'conditionReportDue', label: 'État des lieux à réaliser', channels: ['app', 'email', 'whatsapp'] },
  { event: 'documentAvailable', label: 'Nouveau document disponible', channels: ['app'] },
];
