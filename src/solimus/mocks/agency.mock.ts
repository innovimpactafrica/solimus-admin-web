import { AgencyIdentity, AgencyUser, TaxSettings } from '../domain/models/agency.model';
import { DEFAULT_TAX_SETTINGS } from '../domain/rules/rent-notice.rules';

/** The agency the manager workspace is signed in as. */
export const AGENCY: AgencyIdentity = {
  name: 'Teranga Gestion Immobilière',
  legalLine: 'Administrateur de biens · RCCM SN-DKR-2019-B-22841 · NINEA 007 412 589 2G3',
  contactLine: '12, rue Carnot · Dakar Plateau · +221 33 822 40 10 · contact@teranga-gestion.sn',
  initials: 'TG',
};

/** Other agencies appearing in the tenant app, which rents from three of them. */
export const OTHER_AGENCIES: Record<string, AgencyIdentity> = {
  almadies: {
    name: 'Almadies Property Management',
    legalLine: 'Administrateur de biens · RCCM SN-DKR-2016-B-08831 · NINEA 005 774 120 2B2',
    contactLine: 'Route des Almadies, immeuble Atlantique · +221 33 860 12 12 · contact@almadies-pm.sn',
    initials: 'AP',
  },
  keur: {
    name: 'Keur Immo Services',
    legalLine: 'Administrateur de biens · RCCM SN-DKR-2021-B-05518 · NINEA 008 341 670 2C2',
    contactLine: 'Sacré-Cœur 3, villa 8710 · +221 33 864 05 05 · contact@keurimmo.sn',
    initials: 'KI',
  },
  solimus: {
    name: 'Solimus',
    legalLine: 'Solimus SAS · RCCM SN-DKR-2024-B-31877 · NINEA 010 552 784 2Z1',
    contactLine: 'Sicap Fann Hock · Dakar · +221 33 860 70 70 · contact@solimus.sn',
    initials: 'S',
  },
};

export const AGENCY_USERS: readonly AgencyUser[] = [
  {
    id: 'u-awa', name: 'Awa Ndoye', email: 'awa.ndoye@teranga-gestion.sn', role: 'admin',
    scopeLabel: 'Tous les biens', lastSeen: "À l'instant", canRequestPayouts: true, avatarPalette: 1,
  },
  {
    id: 'u-modou', name: 'Modou Faye', email: 'modou.faye@teranga-gestion.sn', role: 'manager',
    scopeLabel: 'Plateau, Médina, Point E', lastSeen: "Aujourd'hui 09:14", canRequestPayouts: false, avatarPalette: 3,
  },
  {
    id: 'u-rokhaya', name: 'Rokhaya Diop', email: 'rokhaya.diop@teranga-gestion.sn', role: 'accountant',
    scopeLabel: 'Loyers, reversements, rapports', lastSeen: 'Hier 18:02', canRequestPayouts: true, avatarPalette: 5,
  },
  {
    id: 'u-serigne', name: 'Serigne Mbacké', email: 's.mbacke@teranga-gestion.sn', role: 'fieldAgent',
    scopeLabel: 'États des lieux, visites', lastSeen: 'Hier 16:40', canRequestPayouts: false, avatarPalette: 2,
  },
];

export const AGENCY_TAX_SETTINGS: TaxSettings = DEFAULT_TAX_SETTINGS;

/** Management fee applied by Teranga, as written in every mandate. */
export const AGENCY_FEE_RATE = 0.1;

/** Day of the month owners are paid. */
export const OWNER_REMITTANCE_DAY = 10;

export const ROLE_LABEL: Record<AgencyUser['role'], string> = {
  admin: 'Administratrice',
  manager: 'Gestionnaire',
  accountant: 'Comptable',
  fieldAgent: 'Agent terrain',
};
