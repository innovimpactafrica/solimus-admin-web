import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  BreadcrumbService, DateFrPipe, FcfaPipe, IconName, SheetService, SolAvatar, SolBarChart, SolIcon, SolKpiCard, SolPill } from '@solimus/ui';
import { PLATFORM_REPOSITORY, planUsageStatus } from '@solimus/domain';
import { PlanId } from '@solimus/domain/models/subscription.model';
import { BLOCKED_PAYOUT, COLLECTIONS, MANAGERS, PLANS, PLATFORM_CASHFLOW, PLATFORM_SUMMARY } from '@solimus/mocks';

type Period = 'september' | 'october';

@Component({
  selector: 'app-overview',
  imports: [RouterLink, SolIcon, SolPill, SolAvatar, SolKpiCard, SolBarChart, FcfaPipe, DateFrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overview.html',
  styles: `
    .balance { font-size: 26px; font-weight: 600; letter-spacing: -.01em; }
    .balance span { font-size: 14px; font-weight: 400; color: var(--muted); }
    a.alert { cursor: pointer; }
  ` })
export default class Overview implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);

  private readonly platform = inject(PLATFORM_REPOSITORY);
  protected readonly summary = toSignal(this.platform.summary(), { initialValue: PLATFORM_SUMMARY });
  private readonly requests = toSignal(this.platform.allPayoutRequests(), { initialValue: [] });

  protected readonly period = signal<Period>('october');
  protected readonly blocked = { ...BLOCKED_PAYOUT, managerName: 'Diourbel Habitat' };
  protected readonly lastCollections = COLLECTIONS.slice(0, 4);

  protected readonly cashflow = PLATFORM_CASHFLOW.map((point) => ({
    label: point.month, value: point.paidOut, reference: point.collected }));

  protected readonly periods: readonly { value: Period; label: string }[] = [
    { value: 'september', label: 'Septembre' },
    { value: 'october', label: 'Octobre' },
  ];

  protected readonly periodLabel = computed(() =>
    this.period() === 'october'
      ? 'Vendredi 16 octobre 2026'
      : 'Septembre 2026 · mois clôturé',
  );

  /** September closed with everything paid out; October still owes the managers. */
  protected readonly figures = computed(() => {
    if (this.period() === 'september') {
      return {
        collected: 70_300_000, collectedNote: '266 paiements · 6 gestionnaires',
        owed: 0, paidOut: 70_300_000, paidOutNote: '81 versements en septembre' };
    }
    const summary = this.summary();
    return {
      collected: summary.collected,
      collectedNote: `${summary.paymentCount} paiements · ${summary.managerCount} gestionnaires`,
      owed: summary.owedToManagers,
      paidOut: summary.paidOut,
      paidOutNote: '83 versements en octobre' };
  });

  protected readonly pendingRequests = computed(() =>
    this.requests().filter((request) => request.status === 'processing')
      .reduce((total, request) => total + request.amount, 0),
  );

  /** Managers at or above 80% of any plan limit (RG-29). */
  protected readonly nearLimit = computed(() =>
    MANAGERS
      .map((manager) => {
        const plan = PLANS.find((item) => item.id === manager.planId)!;
        const limits = planUsageStatus(manager.usage, plan.limits).filter((limit) => limit.level !== 'ok');
        return { manager, limits };
      })
      .filter((entry) => entry.limits.length > 0)
      .slice(0, 2),
  );

  protected readonly todo = computed(() => {
    const items: { tone: string; icon: IconName; title: string; detail: string; link: string[] }[] = [];

    if (this.pendingRequests()) {
      items.push({
        tone: 'al-g', icon: 'inbox', title: 'Demande de paiement · Teranga',
        detail: `DP-2026-036 · ${this.pendingRequests().toLocaleString('fr-FR')} FCFA vers Wave · reçue à 10:20`,
        link: ['/demandes'] });
    }

    items.push(
      {
        tone: 'al-r', icon: 'alert', title: 'Versements bloqués · Diourbel Habitat',
        detail: `Compte de versement non vérifié · ${BLOCKED_PAYOUT.amount.toLocaleString('fr-FR')} FCFA retenus`,
        link: ['/versements'] },
      {
        tone: 'al-o', icon: 'receipt', title: 'Abonnement impayé · Ndiaye & Associés',
        detail: 'Compte suspendu depuis le 08/10 · 25 000 FCFA',
        link: ['/facturation'] },
      {
        tone: 'al-b', icon: 'layers', title: 'Limite atteinte · Keur Immo Services',
        detail: '3 propriétaires sur 3 · formule Pro proposée le 14/10',
        link: ['/gestionnaires'] },
    );

    return items;
  });

  protected readonly formatMillions = (value: number): string => value.toFixed(0);

  ngOnInit(): void {
    this.breadcrumbs.set({ label: "Vue d'ensemble" });
  }

  protected managerName(id: string): string {
    return MANAGERS.find((manager) => manager.id === id)?.name ?? id;
  }

  protected planName(id: PlanId): string {
    return PLANS.find((plan) => plan.id === id)?.name ?? id;
  }
}
