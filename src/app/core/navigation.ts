import { IconName } from '@solimus/ui';

export interface NavItem {
  readonly path: string;
  readonly label: string;
  readonly icon: IconName;
  readonly exact?: boolean;
  readonly badge?: number;
  readonly badgeTone?: 'neutral' | 'danger';
}

export interface NavGroup {
  readonly title: string;
  readonly items: readonly NavItem[];
}

/** Sidebar of the Solimus administration. */
export const NAVIGATION: readonly NavGroup[] = [
  {
    title: 'Pilotage',
    items: [
      { path: '/', label: "Vue d'ensemble", icon: 'grid', exact: true },
      { path: '/gestionnaires', label: 'Gestionnaires', icon: 'building', badge: 6 },
    ],
  },
  {
    title: 'Flux financiers',
    items: [
      { path: '/encaissements', label: 'Encaissements', icon: 'wallet' },
      { path: '/demandes', label: 'Demandes de paiement', icon: 'inbox', badge: 1, badgeTone: 'danger' },
      { path: '/versements', label: 'Versements', icon: 'send', badge: 1, badgeTone: 'danger' },
    ],
  },
  {
    title: 'Offre',
    items: [
      { path: '/plans', label: "Plans d'abonnement", icon: 'layers' },
      { path: '/facturation', label: 'Facturation', icon: 'receipt', badge: 1, badgeTone: 'danger' },
    ],
  },
  {
    title: 'Plateforme',
    items: [
      { path: '/equipe', label: 'Équipe Solimus', icon: 'shield' },
      { path: '/journal', label: "Journal d'activité", icon: 'list' },
      { path: '/parametres', label: 'Paramètres', icon: 'gear' },
    ],
  },
];
