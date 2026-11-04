import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { DocumentField, SolDocKv } from './parts/doc-kv';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocSignatures } from './parts/doc-signatures';
import { SolDocTitle } from './parts/doc-title';
import { Signatory } from './parts/doc-signature';

export interface ConditionReportRoomLine {
  readonly name: string;
  readonly condition: 'Bon' | 'Usé' | 'Dégradé';
  readonly observation: string;
  readonly photoCount: number;
}

export interface ConditionReportDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly kind: 'entry' | 'exit';
  readonly reference: string;
  readonly subtitle: string;
  readonly takenAtLabel: string;
  readonly agent: string;
  readonly propertyLine: string;
  readonly metersLabel: string;
  readonly keysLabel: string;
  /** Exit reports name the entry report they are compared against. */
  readonly comparedWithLabel?: string;
  readonly rooms: readonly ConditionReportRoomLine[];
  readonly signatories: readonly [Signatory, Signatory];
  readonly issuedOn: string;
}

/** Condition report, produced the moment the on-site entry is finished (RG-14). */
@Component({
  selector: 'sol-condition-report-document',
  imports: [SolDocFooter, SolDocHeader, SolDocKv, SolDocSignatures, SolDocTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './condition-report.document.html',
  styles: `
    :host { display: contents; }
    .rooms { margin-top: 12px; }
    .left { text-align: left; }
  `,
})
export class SolConditionReportDocument {
  readonly data = input.required<ConditionReportDocument>();

  protected readonly title = computed(
    () => `ÉTAT DES LIEUX D’${this.data().kind === 'entry' ? 'ENTRÉE' : 'SORTIE'}`,
  );

  protected readonly fields = computed<readonly DocumentField[]>(() => {
    const doc = this.data();
    const fields: DocumentField[] = [
      { label: 'Date', value: doc.takenAtLabel },
      { label: 'Réalisé par', value: doc.agent },
      { label: 'Logement', value: doc.propertyLine },
      { label: 'Compteurs', value: doc.metersLabel },
      { label: 'Clés', value: doc.keysLabel },
    ];
    if (doc.comparedWithLabel) {
      fields.push({ label: 'Référence', value: doc.comparedWithLabel });
    }
    return fields;
  });

  protected readonly photoCount = computed(() =>
    this.data().rooms.reduce((total, room) => total + room.photoCount, 0),
  );

  protected readonly remarkCount = computed(
    () => this.data().rooms.filter((room) => room.condition !== 'Bon').length,
  );
}
