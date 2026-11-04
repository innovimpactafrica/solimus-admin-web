import { AgencyIdentity } from '../domain/models/agency.model';
import {
  AnnualIncomeSummaryDocument, ConditionReportDocument, ContractorQuoteDocument,
  DepositSettlementDocument, FormalNoticeDocument, LeaseAmendmentDocument,
  LeaseContractDocument, ManagementMandateDocument, ManagementStatementDocument,
  PaymentReceiptDocument, PayoutAdviceDocument, RentNoticeDocument, RentReceiptDocument,
  ReminderLetterDocument, ResidenceCertificateDocument, SubscriptionInvoiceDocument,
  WorkOrderDocument,
} from '../documents';
import { AGENCY, OTHER_AGENCIES } from './agency.mock';

/** The plumber who quotes and invoices in the reference data. */
export const CONTRACTOR_IDENTITY: AgencyIdentity = {
  name: 'Plombex Services',
  legalLine: 'Plomberie et sanitaire · NINEA 007 990 341 2D1',
  contactLine: 'Plateau, Dakar · +221 77 540 12 98 · plombex.services@gmail.com',
  initials: 'PS',
};

const SOLIMUS = OTHER_AGENCIES['solimus'];
const TERANGA_ADDRESS = ['Teranga Gestion Immobilière', '12, rue Carnot', 'Dakar Plateau'];

export const SAMPLE_RENT_NOTICE: RentNoticeDocument = {
  agency: AGENCY,
  addressee: ['Pharmacie du Port SARL', 'Avenue Lamine Guèye', 'Dakar Plateau'],
  reference: 'AE-2610-0335',
  periodLabel: 'Octobre 2026 · du 01/10 au 31/10',
  propertyLine: 'B-052 · Local commercial · Avenue Lamine Guèye, Plateau',
  leaseLine: 'Bail BAIL-011 · commercial',
  lines: [
    { label: 'LOYER', amount: 600_000 },
    { label: 'PROVISION T.O.M. (3,6 %)', amount: 21_600 },
    { label: 'TVA SUR LOYER (18 %)', amount: 108_000 },
  ],
  previousBalance: 0,
  total: 729_600,
  issuedOn: '25/09/2026',
  dueOn: '05/10/2026',
  vatLiable: true,
};

export const SAMPLE_PAYMENT_RECEIPT: PaymentReceiptDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Ibrahima Ndiaye', 'Résidence Les Filaos · A12', 'Mermoz, Dakar'],
  reference: 'REC-2610-0341',
  payerName: 'Monsieur Ibrahima Ndiaye',
  purpose: 'Loyer et charges d’octobre 2026 · bail BAIL-031',
  amount: 475_000,
  methodLabel: 'Wave',
  paymentReference: 'PAY-26100341',
  paidAtLabel: '03/10/2026 à 09:14',
  remaining: 0,
  issuedOn: '03/10/2026',
};

export const SAMPLE_RENT_RECEIPT: RentReceiptDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Ibrahima Ndiaye', 'Résidence Les Filaos · A12', 'Mermoz, Dakar'],
  reference: 'QT-2610-0341',
  periodLabel: 'Octobre 2026',
  propertyLine: 'B-014 · Appartement F3 · Résidence Les Filaos A12, Mermoz',
  leaseLine: 'Bail BAIL-031 · habitation',
  payerName: 'Monsieur Ibrahima Ndiaye',
  lines: [
    { label: 'LOYER', amount: 450_000 },
    { label: 'CHARGES LOCATIVES', amount: 25_000 },
  ],
  total: 475_000,
  paidOn: '03/10/2026',
  paymentLabel: 'Wave · réf. PAY-26100341',
  signatory: 'Awa Ndoye · gestionnaire',
};

export const SAMPLE_REMINDER: ReminderLetterDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Cheikh Ba', 'Immeuble Le Lagon · 5e étage', 'Dakar Plateau'],
  title: 'DEUXIÈME RELANCE',
  periodLabel: 'Octobre 2026',
  salutation: 'Monsieur',
  propertyLine: 'Appartement F4, Immeuble Le Lagon, réf. B-031',
  dueOn: '05/10/2026',
  amount: 685_000,
  amountDetail: 'loyer 650 000 + charges 35 000',
  daysLate: 7,
  noticeReference: 'AE-2610-0024',
  ownerInformed: true,
  issuedOn: '12/10/2026',
};

export const SAMPLE_FORMAL_NOTICE: FormalNoticeDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Cheikh Ba', 'Immeuble Le Lagon · 5e étage', 'Dakar Plateau'],
  subtitle: 'Lettre recommandée · brouillon prêt, envoi le 20/10/2026 si le loyer reste impayé',
  salutation: 'Monsieur',
  reminderDates: ['06/10/2026', '12/10/2026'],
  periodLabel: 'Octobre 2026',
  leaseId: 'BAIL-024',
  propertyLine: 'l’appartement F4 de l’Immeuble Le Lagon',
  rows: [
    { label: 'Loyer octobre 2026', debit: 650_000 },
    { label: 'Charges octobre 2026', debit: 35_000 },
    { label: 'TOTAL DÛ', debit: 685_000, balance: 685_000, total: true },
  ],
  total: 685_000,
  graceDays: 8,
  signatory: 'Awa Ndoye · gestionnaire',
  issuedOn: '16/10/2026',
  footerLabel: 'Brouillon préparé le',
};

export const SAMPLE_LEASE: LeaseContractDocument = {
  agency: AGENCY,
  kind: 'residentialUnfurnished',
  reference: 'BAIL-031',
  subtitle: 'Appartement F3 · Mermoz',
  lessor: 'Monsieur Mamadou Sow, représenté par Teranga Gestion Immobilière en vertu d’un mandat de gestion',
  tenant: 'Monsieur Ibrahima Ndiaye',
  premises: 'l’appartement F3 de 86 m² situé Résidence Les Filaos, lot A12, Mermoz, Dakar',
  usage: 'à usage exclusif d’habitation',
  termLabel: 'deux (2) ans',
  startedOn: '01/02/2025',
  endsOn: '31/01/2027',
  rent: 450_000,
  charges: 25_000,
  dueDay: 5,
  deposit: 900_000,
  depositMonths: 2,
  specialClauses:
    'Climatiseurs des trois pièces entretenus par le locataire. Animaux non admis. Sous-location interdite.',
  signatories: [
    { role: 'Le bailleur', name: 'Mamadou Sow · signé par code SMS le 28/01/2025' },
    { role: 'Le locataire', name: 'Ibrahima Ndiaye · signé par code SMS le 28/01/2025' },
  ],
  issuedOn: '28/01/2025',
};

export const SAMPLE_AMENDMENT: LeaseAmendmentDocument = {
  agency: AGENCY,
  addressee: ['Madame Mariama Fall', 'Cité Comico, villa 18', 'Ouakam, Dakar'],
  number: 1,
  subtitle: 'Bail BAIL-027 · Villa F5 · Ouakam',
  lessor: 'Madame Aïda Mbaye, propriétaire, représentée par Teranga Gestion Immobilière en vertu d’un mandat de gestion',
  tenant: 'Madame Mariama Fall',
  purpose: 'Le présent avenant met en œuvre la révision annuelle prévue à l’article 3 du bail BAIL-027 du 01/09/2024.',
  effectiveOn: '01/09/2026',
  previousRent: 850_000,
  newRent: 900_000,
  signatories: [
    { role: 'Le bailleur', name: 'Aïda Mbaye · signé par code SMS le 02/09/2026' },
    { role: 'Le locataire', name: 'Mariama Fall · signé par code SMS le 02/09/2026' },
  ],
  issuedOn: '02/09/2026',
};

export const SAMPLE_CONDITION_REPORT: ConditionReportDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Daouda Sy', 'Cité Mixta, villa 51', 'Dakar'],
  kind: 'exit',
  reference: 'EDLS-009',
  subtitle: 'Appartement F3 · Hann Maristes',
  takenAtLabel: '30/09/2026 à 09:30',
  agent: 'Serigne Mbacké, Teranga Gestion Immobilière',
  propertyLine: 'B-036 · Appartement F3, Hann Maristes, villa n° 34',
  metersLabel: 'Senelec Woyofal : 12,4 kWh · SDE : 03 118 m³',
  keysLabel: 'Restituées : 2 clés porte · 1 télécommande portail',
  comparedWithLabel: 'Comparaison avec l’état des lieux d’entrée du 01/10/2023',
  rooms: [
    { name: 'Entrée', condition: 'Bon', observation: '—', photoCount: 3 },
    { name: 'Séjour', condition: 'Usé', observation: 'Peinture marquée derrière le canapé · usure normale', photoCount: 5 },
    { name: 'Cuisine', condition: 'Bon', observation: '—', photoCount: 4 },
    { name: 'Chambre 1', condition: 'Bon', observation: '—', photoCount: 3 },
    { name: 'Chambre 2', condition: 'Dégradé', observation: 'Deux vitres fêlées · à la charge du locataire', photoCount: 4 },
    { name: 'Salle d’eau', condition: 'Bon', observation: '—', photoCount: 3 },
    { name: 'Balcon', condition: 'Bon', observation: '—', photoCount: 2 },
    { name: 'Compteurs et clés', condition: 'Bon', observation: 'Relevés ci-dessus', photoCount: 2 },
  ],
  signatories: [
    { role: 'Le locataire', name: 'Daouda Sy · signé par code SMS le 30/09/2026' },
    { role: 'Le gestionnaire', name: 'Serigne Mbacké · signé par code SMS le 30/09/2026' },
  ],
  issuedOn: '30/09/2026',
};

export const SAMPLE_CERTIFICATE: ResidenceCertificateDocument = {
  agency: AGENCY,
  reference: 'AT-2610-0018',
  ownerName: 'Monsieur Mamadou Sow',
  tenantName: 'Monsieur Ibrahima Ndiaye',
  propertyLine: 'l’appartement F3 situé Résidence Les Filaos, lot A12, Mermoz, Dakar',
  leaseId: 'BAIL-031',
  leaseKindLabel: 'd’habitation',
  startedOn: '01/02/2025',
  rent: 450_000,
  charges: 25_000,
  upToDate: true,
  place: 'Dakar',
  signatory: 'Awa Ndoye · gestionnaire',
  issuedOn: '16/10/2026',
};

export const SAMPLE_DEPOSIT_SETTLEMENT: DepositSettlementDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Daouda Sy', 'Cité Mixta, villa 51', 'Dakar'],
  subtitle: 'Bail BAIL-009 · Appartement F3, Hann Maristes · sortie le 30/09/2026',
  rows: [
    { label: 'Dépôt de garantie versé à l’entrée', credit: 480_000 },
    { label: 'Remplacement de deux vitres · chambre 2 (devis BTP Ndiaye & Fils)', debit: 45_000 },
    { label: 'Facture SDE de septembre restant due', debit: 12_600 },
    { label: 'MONTANT RESTITUÉ', balance: 422_400, total: true },
  ],
  refunded: 422_400,
  payBefore: '30/10/2026',
  delayLabel: 'un mois',
  issuedOn: '02/10/2026',
};

export const SAMPLE_MANDATE: ManagementMandateDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Mamadou Sow', '15, rue des Lilas', '92100 Boulogne, France'],
  reference: 'MAN-2024-006',
  principal: 'Monsieur Mamadou Sow',
  feeRatePercent: 10,
  worksThreshold: 50_000,
  remittanceDay: 10,
  account: 'CBAO ••• 4521',
  signedOn: '10/12/2024',
  noticeMonths: 3,
  signatories: [
    { role: 'Le mandant', name: 'Mamadou Sow · signé par code SMS le 10/12/2024' },
    { role: 'Le mandataire', name: 'Awa Ndoye · signé par code SMS le 10/12/2024' },
  ],
};

export const SAMPLE_STATEMENT: ManagementStatementDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Mamadou Sow', '15, rue des Lilas', '92100 Boulogne, France'],
  reference: 'REL-2609-006',
  periodLabel: 'Septembre 2026 · mandat MAN-2024-006',
  mandateLine: 'Mandat MAN-2024-006 · honoraires 10 % des loyers encaissés',
  lines: [
    { label: 'F3 MERMOZ · I. NDIAYE', amount: 450_000 },
    { label: 'STUDIO POINT E · F. SARR', amount: 200_000 },
    { label: 'F4 MAMELLES · A. B. THIAM', amount: 520_000 },
    { label: 'F2 GRAND YOFF · M. KANE', amount: 250_000 },
    { label: 'F3 NGOR · S. CISSÉ', amount: 400_000 },
  ],
  collected: 1_820_000,
  fees: 182_000,
  works: 0,
  net: 1_638_000,
  payoutLabel: 'Virement CBAO ••• 4521 · le 10/10/2026',
  issuedOn: '10/10/2026',
};

export const SAMPLE_ANNUAL_SUMMARY: AnnualIncomeSummaryDocument = {
  agency: AGENCY,
  addressee: ['Monsieur Mamadou Sow', '15, rue des Lilas', '92100 Boulogne, France'],
  year: 2025,
  lines: [
    { label: 'Loyers encaissés hors charges', amount: 19_800_000 },
    { label: 'Honoraires de gestion (10 %)', amount: -1_980_000 },
    { label: 'Travaux et entretien', amount: -412_000 },
  ],
  net: 17_408_000,
  issuedOn: '15/01/2026',
  page: '1 / 2',
};

export const SAMPLE_WORK_ORDER: WorkOrderDocument = {
  agency: AGENCY,
  addressee: ['Plombex Services', 'Plateau, Dakar', '+221 77 540 12 98'],
  reference: 'OS-2026-0912',
  incidentId: 'SIN-2026-014',
  work: 'Dégât des eaux · salle de bain',
  place: 'Appartement F4, Immeuble Le Lagon, 5e étage, Plateau',
  occupant: 'Cheikh Ba · +221 78 104 77 20',
  quoteReference: 'PX-0912',
  quoteAmount: 141_600,
  depositAmount: 42_480,
  depositRatePercent: 30,
  depositPaidOn: '12/10/2026',
  scheduledLabel: '14/10/2026 à partir de 09:00',
  settlementDays: 7,
  issuedOn: '12/10/2026',
};

export const SAMPLE_QUOTE: ContractorQuoteDocument = {
  contractor: CONTRACTOR_IDENTITY,
  addressee: TERANGA_ADDRESS,
  reference: 'PX-0912',
  incidentLine: 'SIN-2026-014 · dégât des eaux · salle de bain',
  placeLine: 'Appartement F4, Immeuble Le Lagon, 5e étage, Plateau · occupant Cheikh Ba',
  items: [
    { label: 'Main-d’œuvre · recherche de fuite et remplacement', quantity: '3 h', unitPrice: 15_000, total: 45_000 },
    { label: 'Siphon, flexible et joints', quantity: '1', unitPrice: 75_000, total: 75_000 },
  ],
  totalExclTax: 120_000,
  vat: 21_600,
  totalInclTax: 141_600,
  termsLabel: 'Acompte de 30 % à la commande, solde à la fin des travaux',
  validityLabel: '15 jours',
  approvalLabel: 'Validé par SCI Teranga (propriétaire) le 12/10/2026 à 16:05 · acompte de 42 480 FCFA versé',
  issuedOn: '12/10/2026',
};

export const SAMPLE_PAYOUT_ADVICE: PayoutAdviceDocument = {
  platform: SOLIMUS,
  addressee: TERANGA_ADDRESS,
  reference: 'VRS-1052',
  originLabel: 'DP-2026-034 du 11/10/2026',
  fromRequest: true,
  amount: 5_500_000,
  accountLabel: 'CBAO ••• 7731',
  managerName: 'Teranga Gestion Immobilière',
  executionLabel: 'Virement hors système du 12/10/2026 à 14:05',
  transferReference: 'VIR-2610-88412',
  balanceAfter: 390_000,
  issuedOn: '12/10/2026',
};

export const SAMPLE_INVOICE: SubscriptionInvoiceDocument = {
  platform: SOLIMUS,
  addressee: ['Teranga Gestion Immobilière', 'NINEA 007 412 589 2G3', '12, rue Carnot, Dakar Plateau'],
  reference: 'FAC-2603-004',
  planLabel: 'formule Pro · annuel',
  periodLabel: 'du 01/03/2026 au 28/02/2027 · 2 mois offerts',
  yearly: true,
  amountExclTax: 750_000,
  vat: 135_000,
  dueOn: '01/03/2026',
  statusLabel: 'Payée le 01/03/2026 · paiement en ligne',
};
