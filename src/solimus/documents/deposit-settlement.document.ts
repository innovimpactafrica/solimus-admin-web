import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { LedgerRow, SolDocLedger } from './parts/doc-ledger';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';

export interface DepositSettlementDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly subtitle: string;
  readonly rows: readonly LedgerRow[];
  readonly refunded: Amount;
  readonly payBefore: string;
  readonly delayLabel: string;
  readonly issuedOn: string;
}

/** Deposit settlement, drawn up after the exit condition report (RG-24). */
@Component({
  selector: 'sol-deposit-settlement-document',
  imports: [SolDocFooter, SolDocHeader, SolDocLedger, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />
    <sol-doc-title title="DÉCOMPTE DE RESTITUTION DU DÉPÔT DE GARANTIE" [subtitle]="doc.subtitle" />

    <sol-doc-ledger [rows]="doc.rows" />

    <p class="dp">
      Le montant de <b>{{ doc.refunded | fcfa }}</b> est viré sur le compte indiqué par le
      locataire au plus tard le {{ doc.payBefore }}, soit {{ doc.delayLabel }} après l’état des
      lieux de sortie, conformément au bail.
    </p>

    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolDepositSettlementDocument {
  readonly data = input.required<DepositSettlementDocument>();
}
