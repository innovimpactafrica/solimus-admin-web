import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BreadcrumbService, FcfaPipe, PillTone, SolIcon, SolPill, SolToggle, ToastService } from '@solimus/ui';
import { PLATFORM_REPOSITORY, SUSPENSION_AFTER_DAYS } from '@solimus/domain';
import { PlanId } from '@solimus/domain/models/subscription.model';
import { MANAGERS, PLANS } from '@solimus/mocks';

@Component({
  selector: 'app-plan-list',
  imports: [RouterLink, SolIcon, SolPill, SolToggle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './plan-list.html',
  styles: `
    .plan { padding: 20px 22px; display: grid; gap: 14px; align-content: start; }
    .plan.current { border-color: var(--g); box-shadow: 0 0 0 1px var(--g); }
    .plan header { display: flex; justify-content: space-between; align-items: center; }
    .plan h4 { margin: 0; font-size: 18px; font-weight: 600; }
    .amount { font-size: 26px; font-weight: 600; }
    .limits { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .limits > div { background: #faf9f6; border: 1px solid var(--line); border-radius: 10px; padding: 9px 12px; }
    .figure { font-weight: 600; font-size: 16px; }
    .plan ul { margin: 0; padding-left: 18px; display: grid; gap: 5px; font-size: 13px; color: #3f4348; }
  `,
})
export default class PlanList implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly toast = inject(ToastService);

  protected readonly plans = toSignal(inject(PLATFORM_REPOSITORY).plans(), { initialValue: PLANS });
  protected readonly yearly = signal(false);

  protected readonly limitRules: readonly { label: string; detail: string; tone: PillTone }[] = [
    { label: '80 %', tone: 'orange', detail: 'Le gestionnaire est alerté dans son espace et par e-mail.' },
    { label: '100 %', tone: 'red', detail: "L'ajout est bloqué pour cette limite. Consultation et modification restent possibles." },
    { label: 'Passage à la formule supérieure', tone: 'green', detail: 'Effet immédiat, montant calculé au prorata du mois.' },
    { label: 'Retour à une formule inférieure', tone: 'neutral', detail: "Possible seulement si l'utilisation tient dans les nouvelles limites." },
  ];

  protected readonly billingRules = [
    { label: 'Essai gratuit', detail: '30 jours, limites de la formule Essentiel' },
    { label: 'Paiement', detail: 'Facture mensuelle ou annuelle, payée en ligne' },
    { label: 'Relances', detail: 'le 1er, le 4 et le 7 du mois' },
    { label: 'Suspension', detail: `après ${SUSPENSION_AFTER_DAYS} jours d'impayé : espace en lecture seule` },
    { label: 'Pendant la suspension', detail: 'les locataires paient toujours, les versements continuent' },
  ];

  ngOnInit(): void {
    this.breadcrumbs.set({ label: "Plans d'abonnement" });
  }

  protected managerCount(id: PlanId): number {
    return MANAGERS.filter((manager) => manager.planId === id).length;
  }

  protected monthlyEquivalent(yearly: number): number {
    return Math.round(yearly / 12);
  }
}
