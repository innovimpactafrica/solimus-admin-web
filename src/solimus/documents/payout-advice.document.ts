import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { DocumentField, SolDocKv } from './parts/doc-kv';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';

export interface PayoutAdviceDocument {
  /** Solimus is the issuer; the manager's agency is the addressee. */
  readonly platform: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly originLabel: string;
  /** True when the origin is a payout request rather than an automatic batch. */
  readonly fromRequest: boolean;
  readonly amount: Amount;
  readonly accountLabel: string;
  readonly managerName: string;
  readonly executionLabel: string;
  readonly transferReference: string;
  readonly balanceAfter: Amount;
  readonly issuedOn: string;
}

/** Payout advice, issued when Solimus marks a payout as done (RG-13). */
@Component({
  selector: 'sol-payout-advice-document',
  imports: [SolDocFooter, SolDocHeader, SolDocKv, SolDocTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.platform" [addressee]="doc.addressee" />
    <sol-doc-title title="AVIS DE VERSEMENT" [subtitle]="'N° ' + doc.reference" />

    <sol-doc-kv [fields]="fields()" />

    <p class="dnote">
      Les loyers sont reversés en totalité, sans commission ; le détail figure dans le relevé,
      rubrique Finances.
    </p>

    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolPayoutAdviceDocument {
  private readonly fcfa = new FcfaPipe();

  readonly data = input.required<PayoutAdviceDocument>();

  protected readonly fields = computed<readonly DocumentField[]>(() => {
    const doc = this.data();
    return [
      { label: doc.fromRequest ? 'Demande' : 'Origine', value: doc.originLabel },
      { label: 'Montant versé', value: this.fcfa.transform(doc.amount), strong: true },
      { label: 'Compte crédité', value: `${doc.accountLabel} · ${doc.managerName}` },
      { label: 'Exécution', value: doc.executionLabel },
      { label: 'Référence du virement', value: doc.transferReference },
      {
        label: 'Solde disponible après versement',
        value: `${this.fcfa.transform(doc.balanceAfter, false, 2)} FCFA`,
      },
    ];
  });
}
