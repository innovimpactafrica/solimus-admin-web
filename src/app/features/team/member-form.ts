import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService, FormAside, FormScaffold, FormSection } from '@solimus/ui';

@Component({
  selector: 'app-member-form',
  imports: [FormScaffold],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-form-scaffold
      title="Inviter un membre"
      subtitle="Membre de l'équipe Solimus ayant accès à l'administration."
      [sections]="sections" [aside]="aside" submitLabel="Envoyer l'invitation"
      [cancelLink]="['/equipe']"
      successMessage="Invitation envoyée · elle expire après 48 heures" />
  `,
})
export default class MemberForm implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);

  protected readonly sections: readonly FormSection[] = [
    {
      title: 'Identité',
      fields: [
        { label: 'Prénom et nom', value: 'Cheikh Tidiane Fall', required: true },
        { label: 'E-mail', value: 'cheikh.fall@solimus.sn', required: true },
        { label: 'Téléphone', value: '+221 77 802 14 66', required: true, hint: 'Reçoit le code de connexion' },
      ],
    },
    {
      title: 'Rôle',
      choiceLabel: 'Rôle',
      choiceColumns: 2,
      choices: [
        { label: 'Super administrateur', hint: 'Tous les droits', icon: 'shield' },
        { label: 'Finance', hint: 'Versements, demandes, facturation', icon: 'bank', selected: true },
        { label: 'Support', hint: 'Gestionnaires, lecture des flux', icon: 'users' },
        { label: 'Lecture seule', hint: 'Tableaux de bord et exports', icon: 'eye' },
      ],
      toggles: [{
        label: 'Peut enregistrer des versements hors système',
        hint: 'Réservé aux rôles Super administrateur et Finance',
        enabled: true,
      }],
      note: {
        tone: 'al-b', icon: 'lock', title: 'Sécurité',
        detail: "Connexion avec code SMS obligatoire à chaque session. L'invitation expire après 48 heures.",
      },
    },
  ];

  protected readonly aside: FormAside = { steps: ['Identité', 'Rôle'], currentStep: 2 };

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Équipe Solimus', link: ['/equipe'] }, { label: 'Inviter un membre' });
  }
}
