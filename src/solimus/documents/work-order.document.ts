import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { DocumentField, SolDocKv } from './parts/doc-kv';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';

export interface WorkOrderDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly incidentId: string;
  readonly work: string;
  readonly place: string;
  readonly occupant: string;
  readonly quoteReference: string;
  readonly quoteAmount: Amount;
  readonly depositAmount: Amount;
  readonly depositRatePercent: number;
  readonly depositPaidOn: string;
  readonly scheduledLabel: string;
  readonly settlementDays: number;
  readonly issuedOn: string;
}

/** Work order, issued to the contractor once the quote is accepted (RG-26). */
@Component({
  selector: 'sol-work-order-document',
  imports: [SolDocFooter, SolDocHeader, SolDocKv, SolDocTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />
    <sol-doc-title
      title="ORDRE DE SERVICE"
      [subtitle]="'N° ' + doc.reference + ' · dossier ' + doc.incidentId" />

    <sol-doc-kv [fields]="fields()" />

    <p class="dp">
      Merci d’ajouter les photos avant et après travaux dans l’application et de clôturer
      l’intervention avec votre facture. Le solde est réglé sous {{ doc.settlementDays }} jours
      après validation.
    </p>

    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolWorkOrderDocument {
  private readonly fcfa = new FcfaPipe();

  readonly data = input.required<WorkOrderDocument>();

  protected readonly fields = computed<readonly DocumentField[]>(() => {
    const doc = this.data();
    return [
      { label: 'Intervention', value: doc.work },
      { label: 'Lieu', value: doc.place },
      { label: 'Occupant', value: doc.occupant },
      { label: 'Devis accepté', value: `${doc.quoteReference} · ${this.fcfa.transform(doc.quoteAmount)} TTC` },
      {
        label: 'Acompte',
        value: `${this.fcfa.transform(doc.depositAmount)} (${doc.depositRatePercent} %) versé le ${doc.depositPaidOn}`,
      },
      { label: 'Date d’intervention', value: doc.scheduledLabel },
    ];
  });
}
