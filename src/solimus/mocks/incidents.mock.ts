import { Incident, Quote, WorkOrder } from '../domain/models/incident.model';

export const INCIDENTS: readonly Incident[] = [
  {
    id: 'SIN-2026-015', stage: 'declared', urgency: 'normal',
    title: 'Fissure au plafond du séjour',
    propertyRef: 'B-014', propertyLabel: 'F3 · Mermoz', location: 'Séjour',
    tenantName: 'Ibrahima Ndiaye', ownerName: 'Mamadou Sow',
    declaredBy: 'Ibrahima Ndiaye', declaredAt: '2026-10-15T18:30', source: "depuis l'application",
    description: "« Une fissure d'environ 40 cm est apparue au plafond du séjour, au-dessus du canapé. Rien ne tombe pour l'instant. »",
    insuranceStatus: 'À évaluer après diagnostic', photoSeed: 1,
    journal: [
      { at: '2026-10-15T18:30', title: 'Sinistre déclaré par le locataire', detail: 'Numéro de dossier attribué automatiquement · 2 photos', author: 'Ibrahima Ndiaye' },
    ],
  },
  {
    id: 'SIN-2026-016', stage: 'declared', urgency: 'urgent',
    title: "Coupure d'électricité partielle",
    propertyRef: 'B-022', propertyLabel: 'Studio · Point E', location: 'Cuisine',
    tenantName: 'Fatou Sarr', ownerName: 'Mamadou Sow',
    declaredBy: 'Fatou Sarr', declaredAt: '2026-10-16T08:12', source: "depuis l'application",
    description: "« Les prises de la cuisine ne marchent plus depuis ce matin et le disjoncteur saute dès que je le remonte. »",
    insuranceStatus: 'Non sollicitée', photoSeed: 3,
    journal: [
      { at: '2026-10-16T08:12', title: 'Sinistre déclaré par la locataire', detail: 'Urgence signalée · 3 photos', author: 'Fatou Sarr' },
    ],
  },
  {
    id: 'SIN-2026-010', stage: 'quoting', urgency: 'normal',
    title: 'Chauffe-eau hors service',
    propertyRef: 'B-058', propertyLabel: 'F3 · Liberté 6', location: "Salle d'eau",
    tenantName: 'Bien vacant', ownerName: 'Mamadou Sow',
    declaredBy: 'Serigne Mbacké', declaredAt: '2026-10-13T11:20', source: "lors d'une visite du bien vacant",
    description: "« Constat lors de la visite du 13/10 : chauffe-eau de 80 L hors service, traces de rouille à la base, thermostat sans réponse. »",
    contractorId: 'c-electro', quoteId: 'ES-0417',
    insuranceStatus: 'Non sollicitée', photoSeed: 5,
    journal: [
      { at: '2026-10-16T08:40', title: 'Devis transmis au propriétaire', detail: 'Au-delà de 50 000 FCFA : validation de Mamadou Sow requise', author: 'Awa Ndoye' },
      { at: '2026-10-15T11:05', title: 'Devis reçu', detail: 'ES-0417 · 96 000 FCFA · remplacement du chauffe-eau', author: 'Électro Sénégal' },
      { at: '2026-10-13T16:30', title: 'Prestataire affecté', detail: 'Électro Sénégal · électricité', author: 'Awa Ndoye' },
      { at: '2026-10-13T11:20', title: 'Constat de visite', detail: 'Bien vacant F3 Liberté 6 · 4 photos', author: 'Serigne Mbacké' },
    ],
  },
  {
    id: 'SIN-2026-013', stage: 'quoting', urgency: 'normal',
    title: 'Climatisation en panne',
    propertyRef: 'B-003', propertyLabel: 'Duplex · Almadies', location: 'Chambre parentale',
    tenantName: 'Aminata Diouf', ownerName: 'SCI Teranga',
    declaredBy: 'Aminata Diouf', declaredAt: '2026-10-09T21:14', source: "depuis l'application",
    description: "« Le climatiseur de la chambre parentale souffle de l'air chaud et fait un bruit de claquement. »",
    contractorId: 'c-froid', quoteId: 'FS-2210',
    insuranceStatus: 'Non sollicitée', photoSeed: 2,
    journal: [
      { at: '2026-10-13T16:00', title: 'Devis transmis au propriétaire', detail: 'Au-delà de 50 000 FCFA : validation de SCI Teranga requise', author: 'Awa Ndoye' },
      { at: '2026-10-13T15:20', title: 'Devis reçu', detail: 'FS-2210 · 185 000 FCFA · remplacement du compresseur', author: 'Froid Services' },
      { at: '2026-10-10T09:00', title: 'Prestataire affecté', detail: 'Froid Services · climatisation', author: 'Awa Ndoye' },
      { at: '2026-10-09T21:14', title: 'Sinistre déclaré par la locataire', detail: 'Numéro de dossier attribué automatiquement', author: 'Aminata Diouf' },
    ],
  },
  {
    id: 'SIN-2026-014', stage: 'inProgress', urgency: 'urgent',
    title: "Dégât des eaux salle de bain",
    propertyRef: 'B-031', propertyLabel: 'F4 · Plateau', location: 'Salle de bain',
    tenantName: 'Cheikh Ba', ownerName: 'SCI Teranga',
    declaredBy: 'Cheikh Ba', declaredAt: '2026-10-11T08:02', source: "depuis l'application",
    description: "« De l'eau coule sous le lavabo depuis ce matin et le sol de la salle de bain est mouillé. J'ai fermé l'arrivée d'eau mais ça continue de goutter. »",
    contractorId: 'c-plombex', quoteId: 'PX-0912',
    insuranceStatus: 'Non sollicitée', photoSeed: 4,
    journal: [
      { at: '2026-10-14T09:20', title: 'Intervention démarrée', detail: 'Plombex Services sur place · photos avant travaux ajoutées', author: 'Plombex Services' },
      { at: '2026-10-12T16:05', title: 'Devis validé par le propriétaire · acompte de 30 %', detail: 'Devis n° PX-0912 · 141 600 FCFA TTC', author: 'SCI Teranga' },
      { at: '2026-10-12T11:40', title: 'Devis reçu', detail: 'Remplacement du siphon et du flexible, reprise des joints', author: 'Plombex Services' },
      { at: '2026-10-11T10:15', title: 'Prestataire affecté', detail: 'Plombex Services · plomberie · disponible sous 24 h', author: 'Awa Ndoye' },
      { at: '2026-10-11T08:02', title: 'Sinistre déclaré par le locataire', detail: 'Numéro de dossier attribué automatiquement', author: 'Cheikh Ba' },
    ],
  },
  {
    id: 'SIN-2026-009', stage: 'inProgress', urgency: 'normal',
    title: 'Robinet de cuisine qui fuit',
    propertyRef: 'B-014', propertyLabel: 'F3 · Mermoz', location: 'Cuisine',
    tenantName: 'Ibrahima Ndiaye', ownerName: 'Mamadou Sow',
    declaredBy: 'Ibrahima Ndiaye', declaredAt: '2026-10-12T07:48', source: "depuis l'application",
    description: "« Le robinet de la cuisine fuit à la base, même fermé. »",
    contractorId: 'c-plombex', quoteId: 'PX-0927',
    insuranceStatus: 'Non sollicitée', photoSeed: 0,
    journal: [
      { at: '2026-10-14T17:10', title: 'Intervention planifiée', detail: 'Samedi 17/10 entre 9 h et 11 h · locataire prévenu', author: 'Plombex Services' },
      { at: '2026-10-14T10:02', title: 'Devis validé', detail: '38 000 FCFA : sous le seuil de 50 000, validé par la gestionnaire', author: 'Awa Ndoye' },
      { at: '2026-10-13T15:45', title: 'Devis reçu', detail: 'PX-0927 · forfait remplacement du robinet', author: 'Plombex Services' },
      { at: '2026-10-13T09:15', title: 'Prestataire affecté', detail: 'Plombex Services · plomberie', author: 'Awa Ndoye' },
      { at: '2026-10-12T07:48', title: 'Sinistre déclaré par le locataire', detail: 'Numéro de dossier attribué automatiquement', author: 'Ibrahima Ndiaye' },
    ],
  },
  {
    id: 'SIN-2026-011', stage: 'acknowledged', urgency: 'normal',
    title: 'Infiltration terrasse',
    propertyRef: 'B-052', propertyLabel: 'Local · Plateau', location: 'Terrasse',
    tenantName: 'Pharmacie du Port', ownerName: 'SCI Teranga',
    declaredBy: 'Pharmacie du Port', declaredAt: '2026-10-07T08:45', source: "depuis l'application",
    description: "« Après la pluie d'hier, de l'eau s'infiltre par le plafond de la réserve, côté terrasse. »",
    contractorId: 'c-btp-ndiaye',
    insuranceStatus: "Déclaration à l'assureur de l'immeuble en préparation", photoSeed: 6,
    journal: [
      { at: '2026-10-09T15:10', title: 'Visite de diagnostic planifiée', detail: 'BTP Ndiaye & Fils · samedi 17/10 à 08:00', author: 'BTP Ndiaye & Fils' },
      { at: '2026-10-08T10:30', title: 'Prestataire affecté', detail: 'BTP Ndiaye & Fils · étanchéité', author: 'Awa Ndoye' },
      { at: '2026-10-07T08:45', title: 'Sinistre déclaré par le locataire', detail: 'Numéro de dossier attribué automatiquement', author: 'Pharmacie du Port' },
    ],
  },
  {
    id: 'SIN-2026-012', stage: 'resolved', urgency: 'normal',
    title: "Serrure de la porte d'entrée",
    propertyRef: 'B-007', propertyLabel: 'Villa F5 · Ouakam', location: 'Entrée',
    tenantName: 'Mariama Fall', ownerName: 'Aïda Mbaye',
    declaredBy: 'Mariama Fall', declaredAt: '2026-10-02T08:10', source: "depuis l'application",
    description: "« La serrure de la porte d'entrée bloque, la clé ne tourne plus qu'à moitié. »",
    contractorId: 'c-cle-dor', quoteId: 'CD-1180',
    insuranceStatus: 'Non sollicitée', photoSeed: 7,
    journal: [
      { at: '2026-10-04T09:30', title: 'Dossier clôturé', detail: 'Facture CD-1180 · 35 000 FCFA · note du locataire : 5/5', author: 'Awa Ndoye' },
      { at: '2026-10-03T10:40', title: 'Intervention terminée', detail: 'Serrure remplacée · 3 clés remises à la locataire', author: "Clé d'Or Dakar" },
      { at: '2026-10-02T09:30', title: 'Prestataire affecté', detail: "Clé d'Or Dakar · serrurerie", author: 'Awa Ndoye' },
      { at: '2026-10-02T08:10', title: 'Sinistre déclaré par la locataire', detail: 'Numéro de dossier attribué automatiquement', author: 'Mariama Fall' },
    ],
  },
];

export const QUOTES: readonly Quote[] = [
  {
    id: 'PX-0912', incidentId: 'SIN-2026-014', contractorId: 'c-plombex', status: 'approved',
    lines: [
      { label: "Main-d'œuvre · recherche de fuite et remplacement (3 h)", amount: 45_000 },
      { label: 'Siphon, flexible et joints', amount: 75_000 },
      { label: 'TVA 18 %', amount: 21_600, isTax: true },
    ],
    total: 141_600, depositPaid: 42_480, issuedOn: '2026-10-12', decidedOn: '2026-10-12',
    note: 'Acompte de 30 % à la commande, solde à la fin des travaux.',
  },
  {
    id: 'PX-0927', incidentId: 'SIN-2026-009', contractorId: 'c-plombex', status: 'approved',
    lines: [{ label: 'Robinet mitigeur, fourniture et pose (forfait TTC)', amount: 38_000 }],
    total: 38_000, issuedOn: '2026-10-13', decidedOn: '2026-10-14',
    note: 'Déduit du reversement du 10/11 à Mamadou Sow.',
  },
  {
    id: 'ES-0417', incidentId: 'SIN-2026-010', contractorId: 'c-electro', status: 'awaitingOwner',
    lines: [
      { label: 'Chauffe-eau 80 L', amount: 68_000 },
      { label: 'Pose et raccordement', amount: 20_000 },
      { label: 'Déplacement', amount: 8_000 },
    ],
    total: 96_000, issuedOn: '2026-10-15',
    note: "Validation attendue dans l'application propriétaire.",
  },
  {
    id: 'FS-2210', incidentId: 'SIN-2026-013', contractorId: 'c-froid', status: 'awaitingOwner',
    lines: [
      { label: 'Compresseur Daikin 18 000 BTU', amount: 150_000 },
      { label: "Main-d'œuvre (2 h)", amount: 35_000 },
    ],
    total: 185_000, issuedOn: '2026-10-13',
    note: 'Prestataire non assujetti à la TVA.',
  },
  {
    id: 'CD-1180', incidentId: 'SIN-2026-012', contractorId: 'c-cle-dor', status: 'paid',
    lines: [{ label: 'Serrure 3 points, fourniture et pose (forfait)', amount: 35_000 }],
    total: 35_000, issuedOn: '2026-10-02', decidedOn: '2026-10-02',
    note: 'Déduite du reversement du 10/10 à Aïda Mbaye.',
  },
];

export const WORK_ORDERS: readonly WorkOrder[] = [
  { id: 'OS-2026-0912', quoteId: 'PX-0912', incidentId: 'SIN-2026-014', issuedOn: '2026-10-12', scheduledFor: '14/10/2026 à partir de 09:00' },
  { id: 'OS-2026-0927', quoteId: 'PX-0927', incidentId: 'SIN-2026-009', issuedOn: '2026-10-14', scheduledFor: '17/10/2026 entre 9 h et 11 h' },
];

export const INCIDENT_SUMMARY = { open: 7, urgent: 2, awaitingOwner: 2, averageResolutionDays: 4.2 } as const;
