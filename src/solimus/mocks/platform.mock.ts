import { AuditEntry, Manager, PlatformSummary } from '../domain/models/agency.model';
import { Plan, SubscriptionInvoice } from '../domain/models/subscription.model';

/** The three subscription plans sold on solimus.sn. */
export const PLANS: readonly Plan[] = [
  {
    id: 'essentiel', name: 'Essentiel',
    monthlyExclTax: 25_000, yearlyExclTax: 250_000,
    limits: { owners: 3, properties: 25, users: 2, storageGb: 5 },
    features: [
      'Biens, baux et états des lieux',
      'Loyers payés en ligne et quittances automatiques',
      'Application locataire et propriétaire',
      'Sinistres et prestataires',
      'Notifications application, e-mail et SMS',
    ],
    visibleOnWebsite: true,
  },
  {
    id: 'pro', name: 'Pro',
    monthlyExclTax: 75_000, yearlyExclTax: 750_000,
    limits: { owners: 20, properties: 100, users: 5, storageGb: 20 },
    features: [
      'Tout Essentiel',
      'Relances WhatsApp',
      'Candidatures et visite virtuelle',
      'Rapports et exports',
      'Modèles de documents personnalisés',
    ],
    visibleOnWebsite: true,
  },
  {
    id: 'entreprise', name: 'Entreprise',
    monthlyExclTax: 200_000, yearlyExclTax: 2_000_000,
    limits: { owners: 100, properties: 500, users: 20, storageGb: 100 },
    features: ['Tout Pro', 'Plusieurs agences', 'Accès API', 'Rôles avancés', 'Accompagnement dédié'],
    visibleOnWebsite: true,
  },
];

export const MANAGERS: readonly Manager[] = [
  {
    id: 'm-teranga', name: 'Teranga Gestion Immobilière', city: 'Dakar Plateau',
    contactName: 'Awa Ndoye', phone: '+221 33 822 40 10', email: 'contact@teranga-gestion.sn',
    rccm: 'SN-DKR-2019-B-22841', ninea: '007 412 589 2G3', address: '12, rue Carnot, Dakar Plateau',
    subscribedOn: '2025-03-01', planId: 'pro', cycle: 'yearly', status: 'active',
    usage: { owners: 12, properties: 46, users: 4, storageGb: 6.4 },
    payoutMode: 'onRequest',
    accounts: [
      { label: 'Wave · +221 77 540 88 12', verified: true },
      { label: 'CBAO ••• 7731', verified: true },
    ],
    feeRate: 0.1, avatarPalette: 1,
  },
  {
    id: 'm-keur', name: 'Keur Immo Services', city: 'Dakar Sacré-Cœur',
    contactName: 'Mame Diarra Sène', phone: '+221 33 864 05 05', email: 'contact@keurimmo.sn',
    rccm: 'SN-DKR-2021-B-05518', ninea: '008 341 670 2C2', address: 'Sacré-Cœur 3, villa 8710',
    subscribedOn: '2026-01-15', planId: 'essentiel', cycle: 'monthly', status: 'active',
    usage: { owners: 3, properties: 22, users: 2, storageGb: 2.1 },
    payoutMode: 'automatic',
    accounts: [{ label: 'Wave · +221 76 318 22 40', verified: true }],
    feeRate: 0.1, avatarPalette: 4,
  },
  {
    id: 'm-almadies', name: 'Almadies Property Management', city: 'Dakar Almadies',
    contactName: 'Jean-Pierre Mendy', phone: '+221 33 860 12 12', email: 'contact@almadies-pm.sn',
    rccm: 'SN-DKR-2016-B-08831', ninea: '005 774 120 2B2', address: 'Route des Almadies, immeuble Atlantique',
    subscribedOn: '2024-09-01', planId: 'entreprise', cycle: 'monthly', status: 'active',
    usage: { owners: 41, properties: 184, users: 14, storageGb: 38.5 },
    payoutMode: 'automatic',
    accounts: [{ label: 'Wave · +221 77 610 45 03', verified: true }],
    feeRate: 0.1, avatarPalette: 6,
  },
  {
    id: 'm-petitecote', name: 'Petite Côte Immobilier', city: 'Saly Portudal',
    contactName: 'Coumba Faye', phone: '+221 33 957 22 10', email: 'contact@petitecote-immo.sn',
    ninea: '006 902 118 2S1', address: 'Saly Portudal, Mbour',
    subscribedOn: '2026-06-01', planId: 'pro', cycle: 'monthly', status: 'active',
    usage: { owners: 9, properties: 71, users: 3, storageGb: 9.8 },
    payoutMode: 'automatic',
    accounts: [{ label: 'Wave · +221 78 455 12 67', verified: true }],
    feeRate: 0.1, avatarPalette: 5,
  },
  {
    id: 'm-ndiaye', name: 'Ndiaye & Associés', city: 'Thiès',
    contactName: 'Abdou Ndiaye', phone: '+221 33 951 40 08', email: 'contact@ndiaye-associes.sn',
    ninea: '009 225 401 2T2', address: 'Avenue Lamine Guèye, Thiès',
    subscribedOn: '2026-04-10', planId: 'essentiel', cycle: 'monthly', status: 'suspended',
    usage: { owners: 3, properties: 14, users: 1, storageGb: 0.9 },
    payoutMode: 'automatic',
    accounts: [{ label: 'Wave · +221 77 902 33 18', verified: true }],
    feeRate: 0.1, avatarPalette: 2,
  },
  {
    id: 'm-diourbel', name: 'Diourbel Habitat', city: 'Diourbel',
    contactName: 'Serigne Fall', phone: '+221 33 971 05 44', email: 'contact@diourbel-habitat.sn',
    subscribedOn: '2026-10-01', planId: 'essentiel', cycle: 'trial', status: 'trial',
    usage: { owners: 2, properties: 9, users: 1, storageGb: 0.4 },
    payoutMode: 'automatic',
    accounts: [{ label: 'Wave · +221 70 214 87 50', verified: false }],
    feeRate: 0.1, avatarPalette: 3,
  },
];

/** Rent collected this month for each manager, and what is still owed to them. */
export const MANAGER_MONTH: Record<string, { collected: number; owed: number; payments: number; tenants: number }> = {
  'm-teranga': { collected: 12_400_000, owed: 2_900_000, payments: 37, tenants: 41 },
  'm-keur': { collected: 3_150_000, owed: 0, payments: 18, tenants: 19 },
  'm-almadies': { collected: 48_900_000, owed: 0, payments: 151, tenants: 162 },
  'm-petitecote': { collected: 8_200_000, owed: 0, payments: 55, tenants: 58 },
  'm-ndiaye': { collected: 950_000, owed: 0, payments: 4, tenants: 12 },
  'm-diourbel': { collected: 1_200_000, owed: 1_200_000, payments: 6, tenants: 7 },
};

export const PLATFORM_SUMMARY: PlatformSummary = {
  period: '2026-10-01',
  collected: 74_800_000,
  owedToManagers: 4_100_000,
  paidOut: 70_700_000,
  subscriptionRevenueExclTax: 362_500,
  paymentCount: 271,
  managerCount: 6,
};

/** Collected versus paid out across the platform, in millions of FCFA. */
export const PLATFORM_CASHFLOW = [
  { month: 'Mai', paidOut: 57.4, collected: 58.2 },
  { month: 'Juin', paidOut: 60.2, collected: 61.0 },
  { month: 'Juil', paidOut: 62.6, collected: 63.4 },
  { month: 'Août', paidOut: 65.4, collected: 66.1 },
  { month: 'Sep', paidOut: 69.6, collected: 70.3 },
  { month: 'Oct', paidOut: 70.7, collected: 74.8 },
] as const;

/** Every tenant payment that reached the Solimus collection account. */
export const COLLECTIONS = [
  { id: 'PAY-26101688', at: '2026-10-16T09:12', tenant: 'Alioune Badara Thiam', property: 'F4 · Mamelles', managerId: 'm-teranga', amount: 550_000, payoutState: 'Au solde · sur demande', tone: 'neutral' },
  { id: 'PAY-26101652', at: '2026-10-15T19:05', tenant: 'Fatou Kiné Diop', property: 'F2 · Escale', managerId: 'm-diourbel', amount: 150_000, payoutState: 'Bloqué', tone: 'red' },
  { id: 'PAY-26101640', at: '2026-10-15T17:22', tenant: 'Lamine Sagna', property: 'Villa · Saly Niakh Niakhal', managerId: 'm-petitecote', amount: 300_000, payoutState: 'Versé le 16/10 · auto', tone: 'green' },
  { id: 'PAY-26101633', at: '2026-10-15T14:10', tenant: 'Batiplus SARL', property: 'Bureaux · Almadies', managerId: 'm-almadies', amount: 2_400_000, payoutState: 'Versé le 16/10 · auto', tone: 'green' },
  { id: 'PAY-26101619', at: '2026-10-15T11:48', tenant: 'Awa Gaye', property: 'F3 · Sacré-Cœur 2', managerId: 'm-keur', amount: 180_000, payoutState: 'Versé le 16/10 · auto', tone: 'green' },
  { id: 'PAY-26101602', at: '2026-10-15T09:30', tenant: 'Moussa Diallo', property: 'F3 · Cité Lamy', managerId: 'm-ndiaye', amount: 250_000, payoutState: 'Versé le 16/10 · auto', tone: 'green' },
  { id: 'PAY-26100417', at: '2026-10-04T08:55', tenant: 'Fatou Sarr', property: 'Studio · Point E', managerId: 'm-teranga', amount: 210_000, payoutState: 'Versé · DP-2026-031', tone: 'green' },
  { id: 'PAY-26100341', at: '2026-10-03T10:42', tenant: 'Ibrahima Ndiaye', property: 'F3 · Mermoz', managerId: 'm-teranga', amount: 475_000, payoutState: 'Versé · DP-2026-031', tone: 'green' },
] as const;

export const SUBSCRIPTION_INVOICES: readonly SubscriptionInvoice[] = [
  { id: 'FAC-2603-004', managerId: 'm-teranga', label: 'Pro · annuel · jusqu’au 28/02/2027', periodLabel: 'du 01/03/2026 au 28/02/2027 · 2 mois offerts', amountExclTax: 750_000, status: 'paid', issuedOn: '2026-03-01', paidOn: '2026-03-01' },
  { id: 'FAC-2610-002', managerId: 'm-almadies', label: 'Entreprise · mensuel', periodLabel: 'octobre 2026', amountExclTax: 200_000, status: 'paid', issuedOn: '2026-10-01', paidOn: '2026-10-01' },
  { id: 'FAC-2610-003', managerId: 'm-keur', label: 'Essentiel · mensuel', periodLabel: 'octobre 2026', amountExclTax: 25_000, status: 'paid', issuedOn: '2026-10-01', paidOn: '2026-10-02' },
  { id: 'FAC-2610-004', managerId: 'm-petitecote', label: 'Pro · mensuel', periodLabel: 'octobre 2026', amountExclTax: 75_000, status: 'paid', issuedOn: '2026-10-01', paidOn: '2026-10-03' },
  { id: 'FAC-2610-005', managerId: 'm-ndiaye', label: 'Essentiel · mensuel', periodLabel: 'octobre 2026', amountExclTax: 25_000, status: 'unpaid', issuedOn: '2026-10-01' },
  { id: 'FAC-2503-002', managerId: 'm-teranga', label: 'Pro · annuel 2025-2026', periodLabel: 'du 01/03/2025 au 28/02/2026 · 2 mois offerts', amountExclTax: 750_000, status: 'paid', issuedOn: '2025-03-01', paidOn: '2025-03-01' },
];

export const AUDIT_TRAIL: readonly AuditEntry[] = [
  { at: '2026-10-16T10:20', event: 'Demande de paiement reçue', detail: 'DP-2026-036 · Teranga Gestion Immobilière · 2 000 000 FCFA vers Wave', author: 'Awa Ndoye', tone: 'green', icon: 'inbox' },
  { at: '2026-10-16T09:12', event: 'Paiement reçu', detail: 'PAY-26101688 · Alioune Badara Thiam → Teranga Gestion Immobilière · 550 000 FCFA', author: 'Système', tone: 'green', icon: 'wallet' },
  { at: '2026-10-16T06:00', event: 'Lot de versements automatiques', detail: '4 versements effectués · 4 100 000 FCFA · Diourbel Habitat bloqué', author: 'Système', tone: 'blue', icon: 'send' },
  { at: '2026-10-15T18:40', event: 'Formule Pro modifiée', detail: 'Stockage : 15 Go → 20 Go', author: 'Khadija Sarr', tone: 'purple', icon: 'layers' },
  { at: '2026-10-14T10:05', event: 'Limite atteinte', detail: 'Keur Immo Services · propriétaires 3 / 3 · formule Pro proposée par e-mail', author: 'Système', tone: 'orange', icon: 'alert' },
  { at: '2026-10-12T14:05', event: 'Versement hors système enregistré', detail: 'VRS-1052 · DP-2026-034 · Teranga · 5 500 000 FCFA · réf. VIR-2610-88412', author: 'Babacar Diouf', tone: 'purple', icon: 'send' },
  { at: '2026-10-12T11:20', event: 'Versement hors système enregistré', detail: 'VRS-1051 · Keur Immo Services · 360 000 FCFA · réf. Wave TX 7Q2LMB', author: 'Babacar Diouf', tone: 'purple', icon: 'send' },
  { at: '2026-10-08T00:00', event: 'Compte suspendu', detail: 'Ndiaye & Associés · abonnement impayé depuis 7 jours', author: 'Système', tone: 'red', icon: 'pause' },
  { at: '2026-10-01T15:47', event: 'Gestionnaire créé', detail: "Diourbel Habitat · essai Essentiel de 30 jours", author: 'Aïssatou Kane', tone: 'neutral', icon: 'building' },
];

/** The Solimus team and what each role may do. */
export const SOLIMUS_TEAM = [
  { id: 's-khadija', name: 'Khadija Sarr', email: 'khadija.sarr@solimus.sn', role: 'superAdmin', roleLabel: 'Super administratrice', lastSeen: "À l'instant", avatarPalette: 5 },
  { id: 's-babacar', name: 'Babacar Diouf', email: 'babacar.diouf@solimus.sn', role: 'finance', roleLabel: 'Finance', lastSeen: "Aujourd'hui 08:31", avatarPalette: 2 },
  { id: 's-aissatou', name: 'Aïssatou Kane', email: 'aissatou.kane@solimus.sn', role: 'support', roleLabel: 'Support', lastSeen: "Aujourd'hui 09:02", avatarPalette: 4 },
  { id: 's-lamine', name: 'Lamine Ba', email: 'cabinet.ba@expert-comptable.sn', role: 'readOnly', roleLabel: 'Lecture seule', lastSeen: '12/10/2026', avatarPalette: 3 },
] as const;

export const TEAM_PERMISSIONS = [
  { action: 'Voir les flux et les tableaux de bord', superAdmin: true, finance: true, support: true, readOnly: true },
  { action: 'Gérer les gestionnaires (création, suspension)', superAdmin: true, finance: false, support: true, readOnly: false },
  { action: 'Enregistrer un versement hors système', superAdmin: true, finance: true, support: false, readOnly: false },
  { action: 'Modifier les abonnements des gestionnaires', superAdmin: true, finance: true, support: false, readOnly: false },
  { action: "Modifier les plans d'abonnement", superAdmin: true, finance: false, support: false, readOnly: false },
  { action: 'Régler le versement automatique', superAdmin: true, finance: false, support: false, readOnly: false },
  { action: "Gérer l'équipe Solimus", superAdmin: true, finance: false, support: false, readOnly: false },
] as const;
