import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService, FormAside, FormScaffold, FormSection } from '@solimus/ui';

@Component({
  selector: 'app-manager-form',
  imports: [FormScaffold],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-form-scaffold
      title="Ajouter un gestionnaire"
      subtitle="Crée l'espace de l'agence et l'accès de son administrateur."
      [sections]="sections" [aside]="aside" submitLabel="Créer l'espace"
      [cancelLink]="['/gestionnaires']"
      successMessage="Espace créé · identifiants envoyés à l'administrateur" />
  `,
})
export default class ManagerForm implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);

  protected readonly sections: readonly FormSection[] = [
    {
      title: 'Agence',
      fields: [
        { label: 'Raison sociale', value: 'Sine Saloum Immobilier SARL', required: true },
        { label: 'Nom commercial', value: 'Sine Saloum Immobilier' },
        { label: 'RCCM', value: 'SN-KLK-2023-B-0412' },
        { label: 'NINEA', value: '009 874 120 2R5' },
        { label: 'Ville', value: 'Kaolack', kind: 'select', required: true },
        { label: 'Adresse', value: 'Avenue Valdiodio Ndiaye, Kaolack' },
      ],
    },
    {
      title: "Administrateur de l'espace",
      subtitle: 'Reçoit ses identifiants par SMS et e-mail.',
      fields: [
        { label: 'Prénom et nom', value: 'Mariama Sène', required: true },
        { label: 'Téléphone', value: '+221 77 145 62 30', required: true },
        { label: 'E-mail', value: 'mariama@sinesaloum-immo.sn', required: true },
        { label: 'Fonction', value: 'Gérante' },
      ],
    },
    {
      title: 'Formule et facturation',
      subtitle: "Solimus se rémunère uniquement par l'abonnement ; aucune commission sur les loyers.",
      choiceLabel: 'Formule',
      choiceColumns: 3,
      choices: [
        { label: 'Essentiel', hint: '25 000 FCFA HT / mois', icon: 'layers' },
        { label: 'Pro', hint: '75 000 FCFA HT / mois', icon: 'layers', selected: true },
        { label: 'Entreprise', hint: '200 000 FCFA HT / mois', icon: 'layers' },
      ],
      toggles: [
        { label: 'Facturation annuelle', hint: 'Pro : 750 000 FCFA HT / an au lieu de 900 000 · 2 mois offerts', enabled: true },
        { label: 'Commencer par un essai gratuit de 30 jours', hint: 'Facturation à partir du 15/11/2026', enabled: true },
      ],
      fields: [
        { label: "Mode de paiement de l'abonnement", value: 'Paiement en ligne', kind: 'select' },
        { label: 'Date de renouvellement', value: '15/11/2027', kind: 'locked' },
      ],
    },
    {
      title: 'Versements',
      choiceLabel: 'Mode de versement',
      choiceColumns: 2,
      choices: [
        { label: 'Automatique', hint: "Chaque jour à 06:00 par l'API", icon: 'refresh', selected: true },
        { label: 'Sur demande', hint: 'Le gestionnaire demande, Solimus vire hors système', icon: 'inbox' },
      ],
      fields: [
        { label: 'Compte de versement', value: 'Wave · +221 77 145 62 30', kind: 'select', required: true },
        {
          label: 'Vérification', value: 'Code envoyé au titulaire du compte', kind: 'locked',
          hint: "Les versements sont bloqués tant que le compte n'est pas vérifié",
        },
      ],
    },
  ];

  protected readonly aside: FormAside = {
    steps: ['Agence', 'Administrateur', 'Formule et facturation', 'Versements'],
    currentStep: 4,
    summaryTitle: 'Récapitulatif',
    summary: [
      { label: 'Formule', value: 'Pro · annuelle' },
      { label: 'Montant', value: '750 000 FCFA HT / an' },
      { label: 'TTC (TVA 18 %)', value: '885 000 FCFA' },
      { label: 'Essai gratuit', value: 'du 16/10 au 14/11' },
      { label: 'Premier paiement', value: '15/11/2026' },
    ],
  };

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Gestionnaires', link: ['/gestionnaires'] }, { label: 'Ajouter un gestionnaire' });
  }
}
