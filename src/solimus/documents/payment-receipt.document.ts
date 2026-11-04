import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { DocumentField, SolDocKv } from './parts/doc-kv';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';

export interface PaymentReceiptDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly payerName: string;
  readonly purpose: string;
  readonly amount: Amount;
  readonly methodLabel: string;
  readonly paymentReference: string;
  readonly paidAtLabel: string;
  readonly remaining: Amount;
  readonly issuedOn: string;
}

/**
 * Payment receipt, issued for every payment — online or recorded by the
 * manager. The rent receipt only follows once the instalment is fully settled.
 */
@Component({
  selector: 'sol-payment-receipt-document',
  imports: [SolDocFooter, SolDocHeader, SolDocKv, SolDocTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />
    <sol-doc-title title="REÇU DE PAIEMENT" [subtitle]="'N° ' + doc.reference" />
    <sol-doc-kv [fields]="fields()" />
    <p class="dnote">
      Ce reçu atteste l’encaissement du montant indiqué. La quittance est délivrée lorsque
      l’échéance est entièrement réglée.
    </p>
    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolPaymentReceiptDocument {
  private readonly fcfa = new FcfaPipe();

  readonly data = input.required<PaymentReceiptDocument>();

  protected fields(): readonly DocumentField[] {
    const doc = this.data();
    return [
      { label: 'Reçu de', value: doc.payerName },
      { label: 'Pour', value: doc.purpose },
      { label: 'Montant reçu', value: this.fcfa.transform(doc.amount), strong: true },
      { label: 'Moyen de paiement', value: doc.methodLabel },
      { label: 'Référence de paiement', value: doc.paymentReference },
      { label: 'Date et heure', value: doc.paidAtLabel },
      { label: 'Reste à payer sur l’échéance', value: this.fcfa.transform(doc.remaining, false, 2) + ' FCFA' },
    ];
  }
}
