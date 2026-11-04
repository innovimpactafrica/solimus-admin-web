import { Tenant, TenantApplication } from '../domain/models/tenant.model';

export const TENANTS: readonly Tenant[] = [
  {
    id: 't-ibrahima-ndiaye', name: 'Ibrahima Ndiaye', kind: 'individual',
    phone: '+221 77 412 35 08', email: 'i.ndiaye@gmail.com',
    birthDate: '1988-06-22', idDocument: 'CNI 1 758 1988 02417',
    occupation: 'Ingénieur réseaux · Sonatel', monthlyIncome: 1_250_000,
    vatLiable: false, hasMobileAccess: true, since: '2025-02-01',
  },
  {
    id: 't-fatou-sarr', name: 'Fatou Sarr', kind: 'individual',
    phone: '+221 76 220 14 91', email: 'fatou.sarr@gmail.com',
    birthDate: '1996-05-03', idDocument: 'CNI 2 765 1996 01177',
    occupation: 'Développeuse · Wave', monthlyIncome: 700_000,
    vatLiable: false, hasMobileAccess: true, since: '2025-07-01',
  },
  {
    id: 't-mariama-fall', name: 'Mariama Fall', kind: 'individual',
    phone: '+221 77 655 02 33', email: 'mariama.fall@yahoo.fr',
    birthDate: '1980-10-09', idDocument: 'CNI 2 750 1980 01462',
    occupation: 'Directrice financière · Sococim', monthlyIncome: 2_800_000,
    vatLiable: false, hasMobileAccess: true, since: '2024-09-01',
  },
  {
    id: 't-cheikh-ba', name: 'Cheikh Ba', kind: 'individual',
    phone: '+221 78 104 77 20', email: 'cheikh.ba@gmail.com',
    birthDate: '1983-11-14', idDocument: 'CNI 1 754 1983 00918',
    occupation: 'Cadre bancaire · Ecobank', monthlyIncome: 1_900_000,
    vatLiable: false, hasMobileAccess: true, since: '2025-03-01',
  },
  {
    id: 't-aminata-diouf', name: 'Aminata Diouf', kind: 'individual',
    phone: '+221 77 901 44 18', email: 'aminata.diouf@orange.sn',
    birthDate: '1978-02-15', idDocument: 'CNI 2 748 1978 00715',
    occupation: 'Avocate · cabinet Diouf', monthlyIncome: 4_500_000,
    vatLiable: false, hasMobileAccess: true, since: '2023-12-01',
  },
  {
    id: 't-pharmacie-du-port', name: 'Pharmacie du Port', kind: 'company',
    phone: '+221 33 821 56 30', email: 'contact@pharmacieduport.sn',
    ninea: '005 881 240 2A1', vatLiable: true, hasMobileAccess: true, since: '2020-11-01',
    address: 'Avenue Lamine Guèye, Dakar Plateau',
  },
  {
    id: 't-moussa-kane', name: 'Moussa Kane', kind: 'individual',
    phone: '+221 70 330 61 52', email: 'moussa.kane@gmail.com',
    birthDate: '1990-08-17', idDocument: 'CNI 1 760 1990 02281',
    occupation: 'Mécanicien · Dakar Dem Dikk', monthlyIncome: 450_000,
    vatLiable: false, hasMobileAccess: true, since: '2025-04-01',
  },
  {
    id: 't-seynabou-cisse', name: 'Seynabou Cissé', kind: 'individual',
    phone: '+221 77 588 90 04', email: 'seynabou.cisse@gmail.com',
    birthDate: '1987-04-21', idDocument: 'CNI 2 757 1987 00936',
    occupation: 'Responsable RH · Orange', monthlyIncome: 1_400_000,
    vatLiable: false, hasMobileAccess: true, since: '2025-01-01',
  },
  {
    id: 't-alioune-thiam', name: 'Alioune Badara Thiam', kind: 'individual',
    phone: '+221 77 230 64 18', email: 'ab.thiam@gmail.com',
    birthDate: '1979-01-30', idDocument: 'CNI 1 751 1979 00463',
    occupation: 'Consultant · indépendant', monthlyIncome: 1_600_000,
    vatLiable: false, hasMobileAccess: true, since: '2026-01-01',
  },
  {
    id: 't-khady-ndiaye', name: 'Khady Ndiaye', kind: 'individual',
    phone: '+221 77 318 52 40', email: 'khady.ndiaye@gmail.com',
    birthDate: '1991-03-12', idDocument: 'CNI 1 751 1991 01234',
    occupation: 'Infirmière · Hôpital Principal', monthlyIncome: 620_000,
    vatLiable: false, hasMobileAccess: true, since: '2026-11-01',
  },
  {
    id: 't-nogaye-faye', name: 'Nogaye Faye', kind: 'individual',
    phone: '+221 77 845 20 61', email: 'nogaye.faye@gmail.com',
    birthDate: '1994-07-08', idDocument: 'CNI 2 764 1994 00512',
    occupation: 'Pharmacienne · Pharmacie Guigon', monthlyIncome: 900_000,
    vatLiable: false, hasMobileAccess: true, since: '2026-10-16',
  },
];

/** Candidates for the vacant F3 in Liberté 6 (B-058). */
export const APPLICATIONS: readonly TenantApplication[] = [
  {
    id: 'CAND-0314', propertyRef: 'B-058', stage: 'reviewing',
    fullName: 'Mame Diarra Ba', phone: '+221 77 284 19 63',
    occupation: 'Juriste · cabinet Diop & Associés', monthlyIncome: 950_000,
    documentsProvided: 6, household: '1 adulte', desiredMoveIn: '1er décembre 2026',
    statusLabel: 'Avis propriétaire demandé',
    ownerOpinion: 'Dossier transmis à Mamadou Sow le 15/10 pour avis.',
    receivedOn: '2026-10-12',
  },
  {
    id: 'CAND-0318', propertyRef: 'B-058', stage: 'new',
    fullName: 'Babacar Seck', phone: '+221 77 451 30 88',
    occupation: 'Commerçant · Sandaga', monthlyIncome: 600_000,
    documentsProvided: 2, household: '2 adultes, 1 enfant', desiredMoveIn: '1er novembre 2026',
    statusLabel: 'Reçue le 15/10', receivedOn: '2026-10-15',
  },
  {
    id: 'CAND-0315', propertyRef: 'B-058', stage: 'reviewing',
    fullName: 'Ousmane Diallo', phone: '+221 76 540 21 77',
    occupation: 'Comptable · Total Sénégal', monthlyIncome: 850_000,
    documentsProvided: 6, household: '2 adultes', desiredMoveIn: '1er décembre 2026',
    statusLabel: 'Dossier complet', receivedOn: '2026-10-11',
  },
  {
    id: 'CAND-0311', propertyRef: 'B-058', stage: 'visit',
    fullName: 'Pape Gueye', phone: '+221 77 830 12 64',
    occupation: 'Enseignant · Lycée Lamine Guèye', monthlyIncome: 480_000,
    documentsProvided: 5, household: '2 adultes, 2 enfants', desiredMoveIn: '1er décembre 2026',
    statusLabel: "Visite aujourd'hui 15 h 30", receivedOn: '2026-10-09',
  },
  {
    id: 'CAND-0312', propertyRef: 'B-058', stage: 'visit',
    fullName: 'Ndèye Fatou Lo', phone: '+221 78 120 66 39',
    occupation: 'Chargée de clientèle · CBAO', monthlyIncome: 520_000,
    documentsProvided: 6, household: '1 adulte', desiredMoveIn: '15 novembre 2026',
    statusLabel: 'Visite virtuelle vue', receivedOn: '2026-10-10',
  },
];

/** Listing performance of the vacant property, as shown above the kanban. */
export const APPLICATION_FUNNEL = {
  views: 1_284,
  virtualTourViews: 312,
  applications: 5,
  visitsPlanned: 1,
  averageDaysToLet: 18,
} as const;
