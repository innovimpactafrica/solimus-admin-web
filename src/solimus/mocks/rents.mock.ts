import { RentSchedule } from '../domain/models/rent.model';

/** October 2026 rent roll, as displayed by the manager workspace. */
export const RENT_SCHEDULE_OCTOBER: readonly RentSchedule[] = [
  {
    noticeId: 'AE-2610-0014', leaseId: 'BAIL-031', tenantId: 't-ibrahima-ndiaye', tenantName: 'Ibrahima Ndiaye',
    propertyLabel: 'F3 · Mermoz', period: '2026-10-01', amount: 475_000, dueOn: '2026-10-05',
    status: 'paid', paidOn: '2026-10-03', channel: 'wave', avatarPalette: 1,
  },
  {
    noticeId: 'AE-2610-0022', leaseId: 'BAIL-029', tenantId: 't-fatou-sarr', tenantName: 'Fatou Sarr',
    propertyLabel: 'Studio · Point E', period: '2026-10-01', amount: 210_000, dueOn: '2026-10-05',
    status: 'paid', paidOn: '2026-10-04', channel: 'orangeMoney', avatarPalette: 4,
  },
  {
    noticeId: 'AE-2610-0007', leaseId: 'BAIL-027', tenantId: 't-mariama-fall', tenantName: 'Mariama Fall',
    propertyLabel: 'Villa F5 · Ouakam', period: '2026-10-01', amount: 900_000, dueOn: '2026-10-05',
    status: 'paid', paidOn: '2026-10-07', channel: 'wave', avatarPalette: 5,
  },
  {
    noticeId: 'AE-2610-0024', leaseId: 'BAIL-024', tenantId: 't-cheikh-ba', tenantName: 'Cheikh Ba',
    propertyLabel: 'F4 · Plateau', period: '2026-10-01', amount: 685_000, dueOn: '2026-10-05',
    status: 'late', daysLate: 11, avatarPalette: 3,
  },
  {
    noticeId: 'AE-2610-0003', leaseId: 'BAIL-018', tenantId: 't-aminata-diouf', tenantName: 'Aminata Diouf',
    propertyLabel: 'Duplex · Almadies', period: '2026-10-01', amount: 1_560_000, dueOn: '2026-10-05',
    status: 'paid', paidOn: '2026-10-05', channel: 'orangeMoney', avatarPalette: 6,
  },
  {
    noticeId: 'AE-2610-0047', leaseId: 'BAIL-011', tenantId: 't-pharmacie-du-port', tenantName: 'Pharmacie du Port',
    propertyLabel: 'Local · Plateau', period: '2026-10-01', amount: 912_000, dueOn: '2026-10-05',
    status: 'paid', paidOn: '2026-10-02', channel: 'wave', avatarPalette: 2,
  },
  {
    noticeId: 'AE-2610-0019', leaseId: 'BAIL-021', tenantId: 't-moussa-kane', tenantName: 'Moussa Kane',
    propertyLabel: 'F2 · Grand Yoff', period: '2026-10-01', amount: 265_000, dueOn: '2026-10-10',
    status: 'late', daysLate: 6, avatarPalette: 1,
  },
  {
    noticeId: 'AE-2610-0027', leaseId: 'BAIL-026', tenantId: 't-seynabou-cisse', tenantName: 'Seynabou Cissé',
    propertyLabel: 'F3 · Ngor', period: '2026-10-01', amount: 420_000, dueOn: '2026-10-20',
    status: 'pending', avatarPalette: 5,
  },
  {
    noticeId: 'AE-2610-0040', leaseId: 'BAIL-030', tenantId: 't-alioune-thiam', tenantName: 'Alioune Badara Thiam',
    propertyLabel: 'F4 · Mamelles', period: '2026-10-01', amount: 550_000, dueOn: '2026-10-20',
    status: 'paid', paidOn: '2026-10-16', channel: 'wave', avatarPalette: 4,
  },
];

/** Monthly totals for October 2026 (40 due dates across the portfolio). */
export const RENT_SUMMARY_OCTOBER = {
  expected: 13_770_000,
  collected: 12_400_000,
  pending: 420_000,
  late: 950_000,
  noticeCount: 40,
  paymentCount: 37,
  lateTenants: 2,
} as const;

/** September 2026 was fully collected. */
export const RENT_SUMMARY_SEPTEMBER = {
  expected: 13_600_000,
  collected: 13_600_000,
  pending: 0,
  late: 0,
  noticeCount: 41,
  paymentCount: 41,
  lateTenants: 0,
} as const;

/** Online payment statistics shown next to the rent table. */
export const ONLINE_PAYMENT_STATS = {
  paidInApp: 37,
  totalDue: 40,
  paidBeforeDueDate: 29,
  averageDaysBeforeDue: 1.8,
  lastPaymentLabel: "Aujourd'hui · 09:12",
} as const;

/** Collected versus expected rent over the last six months, in millions of FCFA. */
export const RENT_HISTORY = [
  { month: 'Mai', collected: 12.9, expected: 13.2 },
  { month: 'Juin', collected: 13.1, expected: 13.2 },
  { month: 'Juil', collected: 12.2, expected: 13.4 },
  { month: 'Août', collected: 12.8, expected: 13.4 },
  { month: 'Sep', collected: 13.3, expected: 13.6 },
  { month: 'Oct', collected: 12.4, expected: 13.77 },
] as const;

/** November 2026 notices, generated on 25 October. */
export const NOVEMBER_NOTICE_SUMMARY = {
  noticeCount: 41,
  totalCalled: 13_892_600,
  vatCollected: 162_000,
  carriedBalances: 950_000,
} as const;
