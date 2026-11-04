import { StoredDocument } from '../domain/models/common.model';

/** Document library of the Teranga workspace. */
export const DOCUMENTS: readonly StoredDocument[] = [
  { id: 'doc-bail-033', kind: 'lease', name: 'Bail BAIL-033 · Sacré-Cœur.pdf', createdAt: '2026-10-14', sizeLabel: '1,1 Mo', propertyRef: 'B-045', leaseId: 'BAIL-033', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-033' },
  { id: 'doc-bail-032', kind: 'lease', name: 'Bail BAIL-032 · Hann Maristes.pdf', createdAt: '2026-10-10', sizeLabel: '1,2 Mo', propertyRef: 'B-036', leaseId: 'BAIL-032', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-032' },
  { id: 'doc-avenant-027', kind: 'amendment', name: 'Avenant n°1 · BAIL-027.pdf', createdAt: '2026-09-02', sizeLabel: '420 Ko', propertyRef: 'B-007', leaseId: 'BAIL-027', sharedWith: ['owner', 'tenant'], templateKey: 'amendment' },
  { id: 'doc-bail-031', kind: 'lease', name: 'Bail BAIL-031 · Mermoz.pdf', createdAt: '2025-01-28', sizeLabel: '1,2 Mo', propertyRef: 'B-014', leaseId: 'BAIL-031', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-031' },
  { id: 'doc-bail-029', kind: 'lease', name: 'Bail BAIL-029 · Point E.pdf', createdAt: '2025-06-20', sizeLabel: '1,1 Mo', propertyRef: 'B-022', leaseId: 'BAIL-029', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-029' },
  { id: 'doc-bail-024', kind: 'lease', name: 'Bail BAIL-024 · Plateau.pdf', createdAt: '2025-02-20', sizeLabel: '1,2 Mo', propertyRef: 'B-031', leaseId: 'BAIL-024', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-024' },
  { id: 'doc-bail-018', kind: 'lease', name: 'Bail BAIL-018 · Almadies.pdf', createdAt: '2023-11-24', sizeLabel: '1,3 Mo', propertyRef: 'B-003', leaseId: 'BAIL-018', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-018' },
  { id: 'doc-bail-011', kind: 'lease', name: 'Bail BAIL-011 · Local Plateau.pdf', createdAt: '2020-10-20', sizeLabel: '1,4 Mo', propertyRef: 'B-052', leaseId: 'BAIL-011', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-011' },
  { id: 'doc-bail-009', kind: 'lease', name: 'Bail BAIL-009 · Hann Maristes.pdf', createdAt: '2023-09-25', sizeLabel: '1,2 Mo', propertyRef: 'B-036', leaseId: 'BAIL-009', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-009' },
  { id: 'doc-bail-026', kind: 'lease', name: 'Bail BAIL-026 · Ngor.pdf', createdAt: '2024-12-20', sizeLabel: '1,1 Mo', propertyRef: 'B-027', leaseId: 'BAIL-026', sharedWith: ['owner', 'tenant'], templateKey: 'lease:BAIL-026' },
  { id: 'doc-depot-009', kind: 'depositSettlement', name: 'Décompte du dépôt · BAIL-009 · Daouda Sy.pdf', createdAt: '2026-10-02', sizeLabel: '180 Ko', propertyRef: 'B-036', leaseId: 'BAIL-009', sharedWith: ['owner', 'tenant'], templateKey: 'depositSettlement' },
  { id: 'doc-modele-bail', kind: 'lease', name: 'Modèle bail habitation 2 ans.docx', createdAt: '2026-01-05', sizeLabel: '96 Ko', sharedWith: ['internal'], templateKey: 'lease:TEMPLATE' },

  { id: 'doc-edle-035', kind: 'conditionReport', name: "EDL d'entrée EDLE-035 · Fann Hock (à signer).pdf", createdAt: '2026-10-14', sizeLabel: '3,6 Mo', propertyRef: 'B-048', sharedWith: ['owner', 'tenant'], templateKey: 'conditionReport:EDLE-035' },
  { id: 'doc-edle-031', kind: 'conditionReport', name: "EDL d'entrée EDLE-031 · Mermoz.pdf", createdAt: '2025-02-01', sizeLabel: '5,2 Mo', propertyRef: 'B-014', leaseId: 'BAIL-031', sharedWith: ['owner', 'tenant'], templateKey: 'conditionReport:EDLE-031' },
  { id: 'doc-edls-009', kind: 'conditionReport', name: 'EDL de sortie EDLS-009 · Hann Maristes.pdf', createdAt: '2026-09-30', sizeLabel: '3,9 Mo', propertyRef: 'B-036', leaseId: 'BAIL-009', sharedWith: ['owner', 'tenant'], templateKey: 'conditionReport:EDLS-009' },
  { id: 'doc-edle-027', kind: 'conditionReport', name: "EDL d'entrée EDLE-027 · Ouakam.pdf", createdAt: '2024-09-01', sizeLabel: '6,1 Mo', propertyRef: 'B-007', leaseId: 'BAIL-027', sharedWith: ['owner', 'tenant'], templateKey: 'conditionReport:EDLE-027' },

  { id: 'doc-quittance-ibrahima-10', kind: 'rentReceipt', name: "Quittance octobre 2026 · Ibrahima Ndiaye.pdf", createdAt: '2026-10-03', sizeLabel: '48 Ko', propertyRef: 'B-014', leaseId: 'BAIL-031', sharedWith: ['owner', 'tenant'], templateKey: 'rentReceipt:ibrahima:10' },
  { id: 'doc-quittance-fatou-10', kind: 'rentReceipt', name: 'Quittance octobre 2026 · Fatou Sarr.pdf', createdAt: '2026-10-04', sizeLabel: '48 Ko', propertyRef: 'B-022', leaseId: 'BAIL-029', sharedWith: ['owner', 'tenant'], templateKey: 'rentReceipt:fatou:10' },
  { id: 'doc-quittance-mariama-10', kind: 'rentReceipt', name: 'Quittance octobre 2026 · Mariama Fall.pdf', createdAt: '2026-10-07', sizeLabel: '48 Ko', propertyRef: 'B-007', leaseId: 'BAIL-027', sharedWith: ['owner', 'tenant'], templateKey: 'rentReceipt:mariama:10' },
  { id: 'doc-quittance-pharmacie-10', kind: 'rentReceipt', name: 'Quittance octobre 2026 · Pharmacie du Port.pdf', createdAt: '2026-10-02', sizeLabel: '52 Ko', propertyRef: 'B-052', leaseId: 'BAIL-011', sharedWith: ['owner', 'tenant'], templateKey: 'rentReceipt:pharmacie:10' },
  { id: 'doc-avis-pharmacie-10', kind: 'rentNotice', name: "Avis d'échéance octobre 2026 · Pharmacie du Port.pdf", createdAt: '2026-09-25', sizeLabel: '50 Ko', propertyRef: 'B-052', leaseId: 'BAIL-011', sharedWith: ['owner', 'tenant'], templateKey: 'rentNotice:company' },
  { id: 'doc-recu-alioune', kind: 'paymentReceipt', name: 'Reçu de paiement · Alioune Badara Thiam.pdf', createdAt: '2026-10-16', sizeLabel: '40 Ko', propertyRef: 'B-040', leaseId: 'BAIL-030', sharedWith: ['tenant'], templateKey: 'paymentReceipt:alioune' },
  { id: 'doc-relance-cheikh', kind: 'reminder', name: 'Relance loyer octobre · Cheikh Ba.pdf', createdAt: '2026-10-12', sizeLabel: '36 Ko', propertyRef: 'B-031', leaseId: 'BAIL-024', sharedWith: ['owner', 'tenant'], templateKey: 'reminder' },
  { id: 'doc-demeure-cheikh', kind: 'formalNotice', name: 'Mise en demeure · Cheikh Ba (brouillon).pdf', createdAt: '2026-10-16', sizeLabel: '40 Ko', propertyRef: 'B-031', leaseId: 'BAIL-024', sharedWith: ['internal'], templateKey: 'formalNotice' },

  { id: 'doc-os-0912', kind: 'workOrder', name: 'Ordre de service OS-2026-0912 · Plombex.pdf', createdAt: '2026-10-12', sizeLabel: '220 Ko', propertyRef: 'B-031', sharedWith: ['owner'], templateKey: 'workOrder' },
  { id: 'doc-photos-015', kind: 'photos', name: 'Photos · fissure séjour SIN-2026-015', createdAt: '2026-10-15', sizeLabel: '6 photos', propertyRef: 'B-014', sharedWith: ['owner', 'tenant'], templateKey: 'photos' },
  { id: 'doc-photos-012', kind: 'photos', name: 'Photos · serrure SIN-2026-012', createdAt: '2026-10-02', sizeLabel: '4 photos', propertyRef: 'B-007', sharedWith: ['owner'], templateKey: 'photos' },
  { id: 'doc-devis-0912', kind: 'quote', name: 'Devis PX-0912 · Plombex Services.pdf', createdAt: '2026-10-12', sizeLabel: '180 Ko', propertyRef: 'B-031', sharedWith: ['owner'], templateKey: 'quote' },
  { id: 'doc-facture-abo', kind: 'subscriptionInvoice', name: "Facture d'abonnement Solimus FAC-2603-004.pdf", createdAt: '2026-03-01', sizeLabel: '90 Ko', sharedWith: ['internal'], templateKey: 'subscriptionInvoice:FAC-2603-004' },
  { id: 'doc-avis-versement', kind: 'payoutAdvice', name: 'Avis de versement VRS-1052.pdf', createdAt: '2026-10-12', sizeLabel: '60 Ko', sharedWith: ['internal'], templateKey: 'payoutAdvice:VRS-1052' },

  { id: 'doc-cni-khady', kind: 'tenantFile', name: 'CNI · Khady Ndiaye.jpg', createdAt: '2026-10-09', sizeLabel: '1,1 Mo', propertyRef: 'B-045', sharedWith: ['internal'], templateKey: 'tenantFile' },
  { id: 'doc-dossier-khady', kind: 'tenantFile', name: 'Bulletins de salaire · Khady Ndiaye.pdf', createdAt: '2026-10-09', sizeLabel: '2,4 Mo', propertyRef: 'B-045', sharedWith: ['internal'], templateKey: 'tenantFile' },
  { id: 'doc-assurance-ibrahima', kind: 'tenantFile', name: "Attestation d'assurance 2026 · Ibrahima Ndiaye.pdf", createdAt: '2026-01-12', sizeLabel: '380 Ko', propertyRef: 'B-014', sharedWith: ['internal', 'tenant'], templateKey: 'tenantFile' },
  { id: 'doc-attestation-ibrahima', kind: 'residenceCertificate', name: 'Attestation de location · Ibrahima Ndiaye.pdf', createdAt: '2026-10-16', sizeLabel: '42 Ko', propertyRef: 'B-014', sharedWith: ['tenant'], templateKey: 'residenceCertificate' },

  { id: 'doc-mandat-006', kind: 'mandate', name: 'Mandat MAN-2024-006 · Mamadou Sow.pdf', createdAt: '2024-12-10', sizeLabel: '640 Ko', propertyRef: 'B-014', sharedWith: ['owner'], templateKey: 'mandate:MAN-2024-006' },
  { id: 'doc-mandat-009', kind: 'mandate', name: 'Mandat MAN-2024-009 · Aïda Mbaye.pdf', createdAt: '2024-03-02', sizeLabel: '610 Ko', propertyRef: 'B-007', sharedWith: ['owner'], templateKey: 'mandate:MAN-2024-009' },
  { id: 'doc-mandat-002', kind: 'mandate', name: 'Mandat MAN-2023-002 · SCI Teranga.pdf', createdAt: '2023-03-05', sizeLabel: '720 Ko', propertyRef: 'B-031', sharedWith: ['owner'], templateKey: 'mandate:MAN-2023-002' },
  { id: 'doc-releve-sep', kind: 'managementStatement', name: 'Relevé de gestion · septembre 2026 · Mamadou Sow.pdf', createdAt: '2026-10-10', sizeLabel: '120 Ko', sharedWith: ['owner'], templateKey: 'managementStatement' },
  { id: 'doc-annuel-2025', kind: 'annualIncomeSummary', name: 'Récapitulatif des revenus 2025 · Mamadou Sow.pdf', createdAt: '2026-01-15', sizeLabel: '140 Ko', sharedWith: ['owner'], templateKey: 'annualIncomeSummary' },
];

/** Folder tree shown on the left of the document library. */
export const DOCUMENT_FOLDERS = [
  { kind: 'lease', label: 'Baux', count: 186 },
  { kind: 'conditionReport', label: 'États des lieux', count: 142 },
  { kind: 'rentReceipt', label: 'Quittances', count: 612 },
  { kind: 'workOrder', label: 'Sinistres et travaux', count: 96 },
  { kind: 'quote', label: 'Devis et factures', count: 88 },
  { kind: 'tenantFile', label: 'Pièces locataires', count: 104 },
  { kind: 'mandate', label: 'Mandats propriétaires', count: 20 },
] as const;

export const DOCUMENT_STORAGE = { usedGb: 6.4, totalGb: 20, fileCount: 1_248 } as const;
