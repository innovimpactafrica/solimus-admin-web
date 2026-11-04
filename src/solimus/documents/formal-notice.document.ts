import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { LedgerRow, SolDocLedger } from './parts/doc-ledger';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocSignature } from './parts/doc-signature';
import { SolDocTitle } from './parts/doc-title';

export interface FormalNoticeDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly subtitle: string;
  readonly salutation: string;
  readonly reminderDates: readonly string[];
  readonly periodLabel: string;
  readonly leaseId: string;
  readonly propertyLine: string;
  readonly rows: readonly LedgerRow[];
  readonly total: Amount;
  readonly graceDays: number;
  readonly signatory: string;
  readonly issuedOn: string;
  readonly footerLabel: string;
}

/** Formal notice, prepared 15 days after the due date and validated by the manager (RG-21). */
@Component({
  selector: 'sol-formal-notice-document',
  imports: [SolDocFooter, SolDocHeader, SolDocLedger, SolDocSignature, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />
    <sol-doc-title title="MISE EN DEMEURE DE PAYER" [subtitle]="doc.subtitle" />

    <p class="dp">{{ doc.salutation }},</p>
    <p class="dp">
      Malgré nos relances du {{ doc.reminderDates.join(' et du ') }}, le loyer de
      {{ doc.periodLabel.toLowerCase() }} dû au titre du bail {{ doc.leaseId }} pour
      {{ doc.propertyLine }} reste impayé.
    </p>

    <sol-doc-ledger [rows]="doc.rows" />

    <p class="dp">
      Par la présente, nous vous mettons en demeure de régler la somme de
      <b>{{ doc.total | fcfa }}</b> dans un délai de <b>{{ graceInWords() }}</b> à compter de la
      réception de ce courrier. À défaut, nous serons contraints d’engager les procédures prévues
      au bail, sans autre avis.
    </p>

    <sol-doc-signature [role]="'Pour ' + doc.agency.name" [name]="doc.signatory" />
    <sol-doc-footer [date]="doc.issuedOn" [label]="doc.footerLabel" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolFormalNoticeDocument {
  readonly data = input.required<FormalNoticeDocument>();

  /** Legal notices spell the delay out, with the figure in brackets. */
  protected graceInWords(): string {
    const WORDS: Record<number, string> = { 8: 'huit', 15: 'quinze', 30: 'trente' };
    const days = this.data().graceDays;
    return `${WORDS[days] ?? days} (${days}) jours`;
  }
}
