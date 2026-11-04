import { Routes } from '@angular/router';
import { Shell } from './core/layout/shell';

export const routes: Routes = [
  {
    path: 'connexion',
    title: 'Connexion · Administration Solimus',
    loadComponent: () => import('./features/auth/login'),
  },
  {
    path: 'connexion/verification',
    title: 'Vérification · Administration Solimus',
    loadComponent: () => import('./features/auth/otp-verification'),
  },
  {
    path: 'mot-de-passe-oublie',
    title: 'Mot de passe oublié · Administration Solimus',
    loadComponent: () => import('./features/auth/forgot-password'),
  },
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: "Vue d'ensemble · Administration Solimus",
        loadComponent: () => import('./features/overview/overview'),
      },
      {
        path: 'gestionnaires',
        title: 'Gestionnaires · Administration Solimus',
        loadComponent: () => import('./features/managers/manager-list'),
      },
      {
        path: 'gestionnaires/nouveau',
        title: 'Ajouter un gestionnaire · Administration Solimus',
        loadComponent: () => import('./features/managers/manager-form'),
      },
      {
        path: 'encaissements',
        title: 'Encaissements · Administration Solimus',
        loadComponent: () => import('./features/collections/collection-list'),
      },
      {
        path: 'demandes',
        title: 'Demandes de paiement · Administration Solimus',
        loadComponent: () => import('./features/payout-requests/payout-request-list'),
      },
      {
        path: 'versements',
        title: 'Versements · Administration Solimus',
        loadComponent: () => import('./features/payouts/payout-list'),
      },
      {
        path: 'versements/nouveau',
        title: 'Enregistrer un versement · Administration Solimus',
        data: { recording: true },
        loadComponent: () => import('./features/payouts/payout-list'),
      },
      {
        path: 'plans',
        title: "Plans d'abonnement · Administration Solimus",
        loadComponent: () => import('./features/plans/plan-list'),
      },
      {
        path: 'plans/:id',
        title: 'Formule · Administration Solimus',
        loadComponent: () => import('./features/plans/plan-detail'),
      },
      {
        path: 'facturation',
        title: 'Facturation · Administration Solimus',
        loadComponent: () => import('./features/billing/billing-list'),
      },
      {
        path: 'equipe',
        title: 'Équipe Solimus · Administration Solimus',
        loadComponent: () => import('./features/team/team-list'),
      },
      {
        path: 'equipe/inviter',
        title: 'Inviter un membre · Administration Solimus',
        loadComponent: () => import('./features/team/member-form'),
      },
      {
        path: 'journal',
        title: "Journal d'activité · Administration Solimus",
        loadComponent: () => import('./features/journal/journal-list'),
      },
      {
        path: 'parametres',
        title: 'Paramètres · Administration Solimus',
        loadComponent: () => import('./features/settings/settings'),
      },
      {
        path: 'gestionnaires/:id',
        title: 'Gestionnaire · Administration Solimus',
        loadComponent: () => import('./features/managers/manager-detail'),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
