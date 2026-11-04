import { LedgerEntry, ManagerBalance, OwnerRemittance, Payout, PayoutRequest } from '../domain/models/finance.model';

/** Teranga's account with Solimus on 16 October 2026. */
export const MANAGER_BALANCE: ManagerBalance = {
  managerId: 'm-teranga',
  available: 2_900_000,
  beingProcessed: 2_000_000,
  collectedThisMonth: 12_400_000,
  paidOutThisMonth: 9_500_000,
  paymentCount: 37,
  managementFees: 1_186_000,
};

export const PAYOUT_REQUESTS: readonly PayoutRequest[] = [
  {
    id: 'DP-2026-036', managerId: 'm-teranga', amount: 2_000_000,
    account: 'Wave · +221 77 540 88 12', status: 'processing',
    requestedAt: '2026-10-16T10:20', requestedBy: 'Awa Ndoye',
    note: 'Reversements aux propriétaires du 10 novembre.',
  },
  {
    id: 'DP-2026-034', managerId: 'm-teranga', amount: 5_500_000,
    account: 'Virement · CBAO ••• 7731', status: 'paid',
    requestedAt: '2026-10-11T17:05', requestedBy: 'Rokhaya Diop', payoutId: 'VRS-1052',
  },
  {
    id: 'DP-2026-031', managerId: 'm-teranga', amount: 4_000_000,
    account: 'Wave · +221 77 540 88 12', status: 'paid',
    requestedAt: '2026-10-06T09:40', requestedBy: 'Awa Ndoye', payoutId: 'VRS-1047',
  },
  {
    id: 'DP-2026-027', managerId: 'm-teranga', amount: 6_850_000,
    account: 'Virement · CBAO ••• 7731', status: 'paid',
    requestedAt: '2026-09-29T15:12', requestedBy: 'Rokhaya Diop', payoutId: 'VRS-1012',
  },
];

export const PAYOUTS: readonly Payout[] = [
  {
    id: 'VRS-1057', managerId: 'm-almadies', amount: 3_150_000, execution: 'automatic',
    executedAt: '2026-10-16T06:00', account: 'Wave · +221 77 610 45 03',
    reference: 'API · TX-8812044', balanceAfter: 0,
  },
  {
    id: 'VRS-1056', managerId: 'm-petitecote', amount: 520_000, execution: 'automatic',
    executedAt: '2026-10-16T06:00', account: 'Wave · +221 78 455 12 67',
    reference: 'API · TX-8812041', balanceAfter: 0,
  },
  {
    id: 'VRS-1055', managerId: 'm-keur', amount: 180_000, execution: 'automatic',
    executedAt: '2026-10-16T06:00', account: 'Wave · +221 76 318 22 40',
    reference: 'API · TX-8812039', balanceAfter: 0,
  },
  {
    id: 'VRS-1054', managerId: 'm-ndiaye', amount: 250_000, execution: 'automatic',
    executedAt: '2026-10-16T06:00', account: 'Wave · +221 77 902 33 18',
    reference: 'API · TX-8812036', balanceAfter: 0,
  },
  {
    id: 'VRS-1052', managerId: 'm-teranga', amount: 5_500_000, execution: 'offPlatform',
    executedAt: '2026-10-12T14:05', account: 'CBAO ••• 7731',
    reference: 'VIR-2610-88412', requestId: 'DP-2026-034', balanceAfter: 390_000,
  },
  {
    id: 'VRS-1051', managerId: 'm-keur', amount: 360_000, execution: 'offPlatform',
    executedAt: '2026-10-12T11:20', account: 'Wave · +221 76 318 22 40',
    reference: 'Wave · TX 7Q2LMB', balanceAfter: 0,
  },
  {
    id: 'VRS-1047', managerId: 'm-teranga', amount: 4_000_000, execution: 'offPlatform',
    executedAt: '2026-10-06T16:40', account: 'Wave · +221 77 540 88 12',
    reference: 'TX 4F7K2Q', requestId: 'DP-2026-031', balanceAfter: 4_990_000,
  },
  {
    id: 'VRS-1012', managerId: 'm-teranga', amount: 6_850_000, execution: 'offPlatform',
    executedAt: '2026-09-30T10:15', account: 'CBAO ••• 7731',
    reference: 'VIR-2609-80377', requestId: 'DP-2026-027', balanceAfter: 0,
  },
];

/** Payout blocked because the manager's account is not verified yet (RG-13). */
export const BLOCKED_PAYOUT = {
  managerId: 'm-diourbel', amount: 1_200_000, reason: 'Compte non vérifié',
} as const;

/** Teranga's statement of account for October 2026. */
export const MANAGER_LEDGER: readonly LedgerEntry[] = [
  { at: '2026-10-16T09:12', label: "Loyer d'octobre · Alioune Badara Thiam · F4 Mamelles", kind: 'collection', amount: 550_000, balance: 2_900_000 },
  { at: '2026-10-15T20:00', label: 'Loyers encaissés · 4 paiements', kind: 'collection', amount: 1_960_000, balance: 2_350_000 },
  { at: '2026-10-12T14:05', label: 'Versement DP-2026-034 · virement CBAO ••• 7731', kind: 'payout', amount: -5_500_000, balance: 390_000 },
  { at: '2026-10-07T12:00', label: "Loyer d'octobre · Mariama Fall · Villa F5 Ouakam", kind: 'collection', amount: 900_000, balance: 5_890_000 },
  { at: '2026-10-06T16:40', label: 'Versement DP-2026-031 · Wave', kind: 'payout', amount: -4_000_000, balance: 4_990_000 },
  { at: '2026-10-05T12:00', label: 'Loyers encaissés · 17 paiements', kind: 'collection', amount: 3_940_000, balance: 8_990_000 },
  { at: '2026-10-04T12:00', label: 'Loyers encaissés · 14 paiements du 02/10 au 04/10', kind: 'collection', amount: 5_050_000, balance: 5_050_000 },
];

/** Monthly collected versus paid out, in millions of FCFA. */
export const MANAGER_CASHFLOW = [
  { month: 'Mai', paidOut: 12.7, collected: 12.9 },
  { month: 'Juin', paidOut: 12.9, collected: 13.1 },
  { month: 'Juil', paidOut: 12.0, collected: 12.2 },
  { month: 'Août', paidOut: 12.6, collected: 12.8 },
  { month: 'Sep', paidOut: 13.1, collected: 13.3 },
  { month: 'Oct', paidOut: 9.5, collected: 12.4 },
] as const;

/** September statement sent to Mamadou Sow with his remittance. */
export const OWNER_REMITTANCE_SEPTEMBER: OwnerRemittance = {
  ownerId: 'o-mamadou-sow', period: '2026-09-01',
  lines: [
    { propertyLabel: 'F3 Mermoz', tenantName: 'I. Ndiaye', rentCalled: 450_000, rentCollected: 450_000, fee: 45_000, net: 405_000 },
    { propertyLabel: 'Studio Point E', tenantName: 'F. Sarr', rentCalled: 200_000, rentCollected: 200_000, fee: 20_000, net: 180_000 },
    { propertyLabel: 'F4 Mamelles', tenantName: 'A. B. Thiam', rentCalled: 520_000, rentCollected: 520_000, fee: 52_000, net: 468_000 },
    { propertyLabel: 'F2 Grand Yoff', tenantName: 'M. Kane', rentCalled: 250_000, rentCollected: 250_000, fee: 25_000, net: 225_000 },
    { propertyLabel: 'F3 Ngor', tenantName: 'S. Cissé', rentCalled: 400_000, rentCollected: 400_000, fee: 40_000, net: 360_000 },
  ],
  collected: 1_820_000, fees: 182_000, works: 0, net: 1_638_000,
  paidOn: '2026-10-10', method: 'Virement', account: 'CBAO ••• 4521',
};
