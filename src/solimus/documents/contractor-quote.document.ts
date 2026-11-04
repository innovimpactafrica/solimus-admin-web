import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { DocumentField, SolDocKv } from './parts/doc-kv';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';

export interface QuoteItem {
  readonly label: string;
  readonly quantity: string;
  readonly unitPrice: Amount;
  readonly total: Amount;
}

export interface ContractorQuoteDocument {
  /** The contractor is the issuer here, the agency the addressee. */
  readonly contractor: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly incidentLine: string;
  readonly placeLine: string;
  readonly items: readonly QuoteItem[];
  readonly totalExclTax: Amount;
  readonly vat: Amount;
  readonly totalInclTax: Amount;
  readonly termsLabel: string;
  readonly validityLabel: string;
  readonly approvalLabel: string;
  readonly issuedOn: string;
}

/** Contractor quote, approved by the manager or, above the threshold, by the owner. */
@Component({
  selector: 'sol-contractor-quote-document',
  imports: [SolDocFooter, SolDocHeader, SolDocKv, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contractor-quote.document.html',
  styles: `
    :host { display: contents; }
    .left { text-align: left; }
  `,
})
export class SolContractorQuoteDocument {
  readonly data = input.required<ContractorQuoteDocument>();

  protected readonly fields = computed<readonly DocumentField[]>(() => {
    const doc = this.data();
    return [
      { label: 'Conditions', value: doc.termsLabel },
      { label: 'Validité', value: doc.validityLabel },
      { label: 'Validation', value: doc.approvalLabel },
    ];
  });
}
