import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { DocumentField, SolDocKv } from './parts/doc-kv';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';

export interface SubscriptionInvoiceDocument {
  readonly platform: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly planLabel: string;
  readonly periodLabel: string;
  readonly yearly: boolean;
  readonly amountExclTax: Amount;
  readonly vat: Amount;
  readonly dueOn: string;
  readonly statusLabel: string;
}

/** Subscription invoice: Solimus' only revenue, no commission on rents (RG-28). */
@Component({
  selector: 'sol-subscription-invoice-document',
  imports: [SolDocFooter, SolDocHeader, SolDocKv, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subscription-invoice.document.html',
  styles: `
    :host { display: contents; }
    .left { text-align: left; }
  `,
})
export class SolSubscriptionInvoiceDocument {
  readonly data = input.required<SubscriptionInvoiceDocument>();

  protected readonly subtitle = computed(() => {
    const doc = this.data();
    return `N° ${doc.reference} · abonnement ${doc.yearly ? 'annuel' : 'mensuel'}`;
  });

  protected readonly totalInclTax = computed(() => this.data().amountExclTax + this.data().vat);

  protected readonly fields = computed<readonly DocumentField[]>(() => {
    const doc = this.data();
    return [
      { label: 'Échéance', value: doc.dueOn },
      { label: 'Statut', value: doc.statusLabel },
      { label: 'Commission sur les loyers', value: 'Aucune' },
    ];
  });
}
