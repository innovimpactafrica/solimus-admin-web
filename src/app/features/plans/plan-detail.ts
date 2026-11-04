import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BreadcrumbService, FcfaPipe, SheetService, SolIcon, SolToggle } from '@solimus/ui';
import { PLATFORM_REPOSITORY } from '@solimus/domain';
import { MANAGERS, PLANS } from '@solimus/mocks';

/** Every feature the catalogue can grant, in the order of the specification. */
const ALL_FEATURES = [
  'Biens, baux, états des lieux',
  'Loyers en ligne et quittances automatiques',
  'Application locataire et propriétaire',
  'Sinistres et prestataires',
  'Relances WhatsApp',
  'Candidatures et visite virtuelle',
  'Rapports et exports',
  'Modèles de documents personnalisés',
  'Plusieurs agences',
  'Accès API',
];

/** Features implied by "Tout Essentiel" / "Tout Pro" in the plan descriptions. */
const INHERITED: Record<string, readonly string[]> = {
  pro: ALL_FEATURES.slice(0, 4),
  entreprise: ALL_FEATURES.slice(0, 8) };

@Component({
  selector: 'app-plan-detail',
  imports: [RouterLink, SolIcon, SolToggle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './plan-detail.html',
  styles: `
    .editor { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 320px; gap: 16px; align-items: start; }
    @media (max-width: 1300px) { .editor { grid-template-columns: minmax(0, 1fr); } }
  ` })
export default class PlanDetail {
  readonly id = input.required<string>();

  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);

  private readonly plans = toSignal(inject(PLATFORM_REPOSITORY).plans(), { initialValue: PLANS });

  protected readonly plan = computed(() => this.plans().find((item) => item.id === this.id()));
  protected readonly allFeatures = ALL_FEATURES;

  private readonly subscribingManagers = computed(() =>
    MANAGERS.filter((manager) => manager.planId === this.id()),
  );

  protected readonly subscribers = computed(() => {
    const names = this.subscribingManagers().map((manager) => manager.name);
    if (!names.length) return 'Aucun gestionnaire sur cette formule';
    return `${names.length} gestionnaire${names.length > 1 ? 's' : ''} abonné${names.length > 1 ? 's' : ''} : ${names.join(', ')}`;
  });

  protected readonly limitRows = computed(() => {
    const plan = this.plan();
    if (!plan) return [];
    const usage = (key: 'owners' | 'properties' | 'users' | 'storageGb') =>
      this.subscribingManagers().map((manager) => `${manager.name.split(' ')[0]} ${manager.usage[key]}`).join(' · ') || '—';

    return [
      { label: 'Propriétaires', value: plan.limits.owners, usage: usage('owners') },
      { label: 'Biens', value: plan.limits.properties, usage: usage('properties') },
      { label: "Utilisateurs de l'agence", value: plan.limits.users, usage: usage('users') },
      { label: 'Stockage des documents (Go)', value: plan.limits.storageGb, usage: usage('storageGb') },
    ];
  });

  constructor() {
    effect(() => {
      this.breadcrumbs.set(
        { label: "Plans d'abonnement", link: ['/plans'] },
        { label: this.plan()?.name ?? 'Formule' },
      );
    });
  }

  protected includes(feature: string): boolean {
    const plan = this.plan();
    if (!plan) return false;
    return plan.features.includes(feature) || (INHERITED[plan.id] ?? []).includes(feature);
  }

  protected save(name: string): void {
    this.sheets.open('planSave', { row: name });
  }
}
