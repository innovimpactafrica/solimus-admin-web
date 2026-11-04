import { ManagementMandate, Owner } from '../domain/models/owner.model';

export const OWNERS: readonly Owner[] = [
  {
    id: 'o-sci-teranga', name: 'SCI Teranga', kind: 'company',
    rccm: 'SN-DKR-2015-B-1204', countryOfResidence: 'Sénégal',
    address: 'Immeuble Teranga, boulevard de la République, Dakar Plateau',
    phone: '+221 33 849 12 00', email: 'gerance@sci-teranga.sn',
    hasMobileAccess: true, mandateId: 'MAN-2023-002',
  },
  {
    id: 'o-kane-immo', name: 'Groupe Kane Immo', kind: 'company',
    ninea: '00589 2104', countryOfResidence: 'Sénégal',
    address: 'VDN, immeuble Kane, Dakar', phone: '+221 33 867 44 10',
    hasMobileAccess: true, mandateId: 'MAN-2023-007',
  },
  {
    id: 'o-mamadou-sow', name: 'Mamadou Sow', kind: 'individual',
    countryOfResidence: 'France', address: '15, rue des Lilas, 92100 Boulogne',
    phone: '+33 6 12 48 90 77', email: 'm.sow@gmail.com',
    hasMobileAccess: true, mandateId: 'MAN-2024-006',
  },
  {
    id: 'o-aida-mbaye', name: 'Aïda Mbaye', kind: 'individual',
    countryOfResidence: 'Sénégal', address: 'Villa 45, Sacré-Cœur 3, Dakar',
    phone: '+221 77 318 02 44', email: 'aida.mbaye@gmail.com',
    hasMobileAccess: true, mandateId: 'MAN-2024-009',
  },
  {
    id: 'o-famille-diagne', name: 'Famille Diagne', kind: 'jointOwnership',
    countryOfResidence: 'Sénégal', address: 'Hann Maristes, Dakar',
    phone: '+221 77 640 55 21',
    hasMobileAccess: false, mandateId: 'MAN-2022-004',
  },
  {
    id: 'o-ibrahima-fall', name: 'Ibrahima Fall', kind: 'individual',
    countryOfResidence: 'Sénégal', address: 'Thiès',
    phone: '+221 77 229 81 06',
    hasMobileAccess: true, mandateId: 'MAN-2025-001',
  },
];

/** Portfolio figures shown on the owners list of the manager workspace. */
export const OWNER_PORTFOLIO: Record<string, { properties: number; monthlyRent: number; toRemit: number }> = {
  'o-sci-teranga': { properties: 9, monthlyRent: 3_950_000, toRemit: 3_555_000 },
  'o-kane-immo': { properties: 11, monthlyRent: 3_250_000, toRemit: 2_925_000 },
  'o-mamadou-sow': { properties: 6, monthlyRent: 1_820_000, toRemit: 1_638_000 },
  'o-aida-mbaye': { properties: 5, monthlyRent: 1_650_000, toRemit: 1_485_000 },
  'o-famille-diagne': { properties: 4, monthlyRent: 980_000, toRemit: 882_000 },
  'o-ibrahima-fall': { properties: 2, monthlyRent: 550_000, toRemit: 495_000 },
};

export const MANDATES: readonly ManagementMandate[] = [
  {
    id: 'MAN-2024-006', ownerId: 'o-mamadou-sow', signedOn: '2024-12-10',
    durationLabel: '1 an, renouvelable par tacite reconduction', feeRate: 0.1,
    worksApprovalThreshold: 50_000, lettingFeeLabel: '1 mois de loyer',
    remittanceMethod: 'bankTransfer', remittanceAccount: 'CBAO ••• 4521', remittanceDay: 10,
  },
  {
    id: 'MAN-2024-009', ownerId: 'o-aida-mbaye', signedOn: '2024-03-02',
    durationLabel: '1 an, renouvelable par tacite reconduction', feeRate: 0.1,
    worksApprovalThreshold: 50_000, lettingFeeLabel: '1 mois de loyer',
    remittanceMethod: 'bankTransfer', remittanceAccount: 'Ecobank ••• 2208', remittanceDay: 10,
  },
  {
    id: 'MAN-2023-002', ownerId: 'o-sci-teranga', signedOn: '2023-03-05',
    durationLabel: '1 an, renouvelable par tacite reconduction', feeRate: 0.1,
    worksApprovalThreshold: 50_000, lettingFeeLabel: '1 mois de loyer',
    remittanceMethod: 'bankTransfer', remittanceAccount: 'BICIS ••• 6610', remittanceDay: 10,
  },
  {
    id: 'MAN-2023-007', ownerId: 'o-kane-immo', signedOn: '2023-07-18',
    durationLabel: '1 an, renouvelable par tacite reconduction', feeRate: 0.1,
    worksApprovalThreshold: 50_000, lettingFeeLabel: '1 mois de loyer',
    remittanceMethod: 'bankTransfer', remittanceAccount: 'SGBS ••• 1180', remittanceDay: 10,
  },
  {
    id: 'MAN-2022-004', ownerId: 'o-famille-diagne', signedOn: '2022-11-04',
    durationLabel: '1 an, renouvelable par tacite reconduction', feeRate: 0.1,
    worksApprovalThreshold: 50_000, lettingFeeLabel: '1 mois de loyer',
    remittanceMethod: 'mobileMoney', remittanceAccount: 'Wave · +221 77 640 55 21', remittanceDay: 10,
  },
  {
    id: 'MAN-2025-001', ownerId: 'o-ibrahima-fall', signedOn: '2025-01-09',
    durationLabel: '1 an, renouvelable par tacite reconduction', feeRate: 0.1,
    worksApprovalThreshold: 50_000, lettingFeeLabel: '1 mois de loyer',
    remittanceMethod: 'mobileMoney', remittanceAccount: 'Orange Money · +221 77 229 81 06', remittanceDay: 10,
  },
];
