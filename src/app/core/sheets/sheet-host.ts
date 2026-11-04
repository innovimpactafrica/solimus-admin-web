import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SheetService } from '@solimus/ui';
import {
  AdminDocumentSheet, AdminExportSheet, AdminReminderSheet, AdminShareSheet, ChangePlanSheet, EditManagerSheet,
  LimitsSheet, PlanSaveSheet, SuspendSheet,
} from './admin-sheets';

/**
 * Renders the open action sheet of the administration, with the sheet keys
 * of the reference mockup. Sheets are downloaded the first time one opens.
 */
@Component({
  selector: 'app-sheet-host',
  imports: [
    AdminDocumentSheet, AdminExportSheet, AdminReminderSheet, AdminShareSheet, ChangePlanSheet, EditManagerSheet,
    LimitsSheet, PlanSaveSheet, SuspendSheet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (sheets.key()) {
      @defer {
        @switch (sheets.key()) {
          @case ('export') { <app-admin-export-sheet /> }
          @case ('relance') { <app-admin-reminder-sheet /> }
          @case ('doc') { <app-admin-document-sheet /> }
          @case ('share') { <app-admin-share-sheet /> }
          @case ('limits') { <app-limits-sheet /> }
          @case ('suspend') { <app-suspend-sheet /> }
          @case ('editGest') { <app-edit-manager-sheet /> }
          @case ('plans') { <app-change-plan-sheet /> }
          @case ('planSave') { <app-plan-save-sheet /> }
        }
      }
    }
  `,
})
export class SheetHost {
  protected readonly sheets = inject(SheetService);
}
