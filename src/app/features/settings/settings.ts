import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService, FcfaPipe, SolIcon, SolToggle } from '@solimus/ui';
import {
  DOUBLE_APPROVAL_THRESHOLD, MIN_PAYOUT_AMOUNT, SUBSCRIPTION_VAT_RATE, SUSPENSION_AFTER_DAYS,
} from '@solimus/domain';

@Component({
  selector: 'app-admin-settings',
  imports: [SolIcon, SolToggle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.html',
})
export default class AdminSettings implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);

  protected readonly minimum = MIN_PAYOUT_AMOUNT;
  protected readonly doubleApproval = DOUBLE_APPROVAL_THRESHOLD;
  protected readonly suspensionDays = SUSPENSION_AFTER_DAYS;
  protected readonly vatPercent = (SUBSCRIPTION_VAT_RATE * 100).toLocaleString('fr-FR');

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Paramètres' });
  }
}
