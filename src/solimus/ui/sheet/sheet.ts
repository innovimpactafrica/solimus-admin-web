import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SolIcon } from '../components/icon';
import { SheetService } from './sheet.service';

/**
 * Frame of an action sheet: title, scrolling body and an action bar.
 * Buttons go in the projected `[sheet-actions]` slot; without one, a single
 * "Fermer" button is shown. Once the sheet is finished, the frame shows the
 * success state instead of its body.
 */
@Component({
  selector: 'sol-sheet',
  imports: [SolIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'sheets.close()' },
  template: `
    <div class="ovl" (click)="sheets.close()">
      @if (sheets.outcome(); as outcome) {
        <div class="modal sheet" style="width:460px" role="dialog" aria-modal="true" (click)="$event.stopPropagation()">
          <div class="mh">
            <div></div>
            <button type="button" class="icon-btn" aria-label="Fermer" (click)="sheets.close()"><sol-icon name="x" /></button>
          </div>
          <div class="mb sheet-b">
            <div class="sdone">
              <span class="tint t-g"><sol-icon name="check" [size]="28" strokeWidth="2.4" /></span>
              <b>{{ outcome.title }}</b>
              @if (outcome.detail) { <p>{{ outcome.detail }}</p> }
            </div>
          </div>
          <div class="mf">
            <button type="button" class="btn btn-p" (click)="sheets.close()">Fermer</button>
          </div>
        </div>
      } @else {
        <div class="modal sheet" [style.width.px]="width()" role="dialog" aria-modal="true"
             [attr.aria-label]="title()" (click)="$event.stopPropagation()">
          <div class="mh">
            <div>
              <h4>{{ title() }}</h4>
              @if (subtitle()) { <p>{{ subtitle() }}</p> }
            </div>
            <button type="button" class="icon-btn" aria-label="Fermer" (click)="sheets.close()"><sol-icon name="x" /></button>
          </div>
          <div class="mb sheet-b"><ng-content /></div>
          @if (actions()) {
            <div class="mf">
              <ng-content select="[sheet-actions]" />
              @if (closeOnly()) {
                <button type="button" class="btn btn-s" (click)="sheets.close()">Fermer</button>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class SolSheet {
  protected readonly sheets = inject(SheetService);

  readonly title = input('');
  readonly subtitle = input('');
  readonly width = input(640);
  /** `false` hides the action bar, for menus whose rows are the actions. */
  readonly actions = input(true);
  /** Adds the default "Fermer" button, for read-only sheets. */
  readonly closeOnly = input(false);
}
