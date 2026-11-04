import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, model } from '@angular/core';
import { SolIcon } from '../components/icon';
import { IconName } from '../components/icon-paths';

/**
 * Inputs used inside action sheets. They hold their own state: a sheet is a
 * confirmation step, its values are prefilled from the reference data and
 * only the final button commits anything.
 */

/** Text input, or a closed select when `select` is set. */
@Component({
  selector: 'sol-sheet-field',
  imports: [SolIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'input', '[class.sp3]': 'wide()' },
  template: `
    <label>{{ label() }}@if (required()) { <i class="req">*</i> }</label>
    @if (select() || locked()) {
      <div class="f" [class.sel]="select()" [class.ro]="locked()">
        <span class="v">{{ value() }}</span>
        @if (suffix()) { <span class="suf">{{ suffix() }}</span> }
        @if (select()) { <sol-icon name="chevd" [size]="16" /> }
        @if (locked()) { <sol-icon name="lock" [size]="14" style="color:#a3a8ad" /> }
      </div>
    } @else {
      <div class="f">
        <input [value]="value()" [attr.aria-label]="label()" />
        @if (suffix()) { <span class="suf">{{ suffix() }}</span> }
      </div>
    }
    @if (hint()) { <span class="hint">{{ hint() }}</span> }
  `,
})
export class SolSheetField {
  readonly label = input.required<string>();
  readonly value = input('');
  readonly suffix = input('');
  readonly hint = input('');
  readonly select = input(false);
  readonly locked = input(false);
  readonly required = input(false);
  readonly wide = input(false);
}

/** Multi-line text, prefilled with the message the platform proposes. */
@Component({
  selector: 'sol-sheet-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'input sp3' },
  template: `
    <label>{{ label() }}</label>
    <div class="f ta"><textarea rows="3" [value]="value()" [attr.aria-label]="label()"></textarea></div>
  `,
  styles: `textarea { resize: vertical; font: inherit; line-height: 1.55; min-height: 64px; }`,
})
export class SolSheetTextarea {
  readonly label = input.required<string>();
  readonly value = input('');
}

export interface SheetChoice {
  readonly label: string;
  readonly hint?: string;
  readonly icon?: IconName;
}

/** Radio cards: one option among a few, with an optional hint each. */
@Component({
  selector: 'sol-sheet-choices',
  imports: [SolIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'input sp3' },
  template: `
    @if (label()) { <label>{{ label() }}</label> }
    <div class="rc" [style.grid-template-columns]="columnsTemplate()">
      @for (option of options(); track option.label) {
        <button type="button" class="rc-i" [class.on]="selected() === option.label" (click)="selected.set(option.label)">
          @if (option.icon) { <sol-icon [name]="option.icon" /> }
          <span>
            <b>{{ option.label }}</b>
            @if (option.hint) { <small>{{ option.hint }}</small> }
          </span>
          <i class="rd"></i>
        </button>
      }
    </div>
  `,
})
export class SolSheetChoices {
  readonly label = input('');
  readonly options = input.required<readonly SheetChoice[]>();
  readonly columns = input<number | null>(null);
  readonly selected = model('');

  protected readonly columnsTemplate = computed(
    () => `repeat(${this.columns() ?? this.options().length}, minmax(0, 1fr))`,
  );
}

/** Chips that switch on and off independently: channels, columns, audiences. */
@Component({
  selector: 'sol-sheet-chips',
  imports: [SolIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'input sp3' },
  template: `
    <label>{{ label() }}</label>
    <div class="cs">
      @for (chip of chips(); track chip.label; let index = $index) {
        <button type="button" class="cs-i" [class.on]="on()[index]" (click)="flip(index)">
          <sol-icon [name]="on()[index] ? 'check' : 'plus'" strokeWidth="2.6" />{{ chip.label }}
        </button>
      }
    </div>
    @if (hint()) { <span class="hint">{{ hint() }}</span> }
  `,
})
export class SolSheetChips {
  readonly label = input.required<string>();
  readonly chips = input.required<readonly { readonly label: string; readonly on?: boolean }[]>();
  readonly hint = input('');

  protected readonly on = linkedSignal(() => this.chips().map((chip) => !!chip.on));

  protected flip(index: number): void {
    this.on.update((values) => values.map((value, i) => (i === index ? !value : value)));
  }
}

/** Labelled switch row. */
@Component({
  selector: 'sol-sheet-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'tg sp3' },
  template: `
    <div>
      <b>{{ label() }}</b>
      @if (hint()) { <small>{{ hint() }}</small> }
    </div>
    <button type="button" class="toggle" [class.on]="checked()" role="switch"
            [attr.aria-checked]="checked()" [attr.aria-label]="label()" (click)="checked.set(!checked())"></button>
  `,
})
export class SolSheetToggle {
  readonly label = input.required<string>();
  readonly hint = input('');
  readonly checked = model(true);
}

export interface SheetFile {
  readonly kind: 'pdf' | 'img' | 'doc';
  readonly name: string;
  readonly meta: string;
}

/** Attached files with a drop zone, as in the mockup's upload blocks. */
@Component({
  selector: 'sol-sheet-files',
  imports: [SolIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'input sp3' },
  template: `
    <label>{{ label() }}</label>
    <div class="upl">
      <div class="upl-f">
        @for (file of files(); track file.name) {
          <span class="upl-file">
            <span class="file" [class]="'f-' + file.kind" style="width:26px;height:32px;font-size:8px">{{ file.kind.toUpperCase() }}</span>
            <span><b>{{ file.name }}</b><small>{{ file.meta }}</small></span>
            <sol-icon name="x" [size]="14" style="color:#a3a8ad" />
          </span>
        }
        <span class="upl-drop">
          <sol-icon name="up" [size]="18" />
          <span><b>Déposer un fichier</b><small>PDF, JPG ou PNG · 10 Mo max.</small></span>
        </span>
      </div>
    </div>
  `,
})
export class SolSheetFiles {
  readonly label = input.required<string>();
  readonly files = input<readonly SheetFile[]>([]);
}

/** Two-column grid used to pair short fields. */
@Component({
  selector: 'sol-sheet-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styles: `:host { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }`,
})
export class SolSheetGrid {}

/** Preview bubble of a message about to be sent. */
@Component({
  selector: 'sol-sheet-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'msgprev' },
  template: `<span class="hint">Aperçu du message</span><div>{{ text() }}</div>`,
})
export class SolSheetMessage {
  readonly text = input.required<string>();
}

/** Bulleted list of consequences, each with a green check. */
@Component({
  selector: 'sol-sheet-checklist',
  imports: [SolIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'input' },
  template: `
    <label>{{ label() }}</label>
    @for (item of items(); track item) {
      <div class="ck"><sol-icon name="check" [size]="15" />{{ item }}</div>
    }
  `,
  styles: `
    .ck { display: flex; gap: 8px; font-size: 13px; color: #3f4348; padding: 3px 0; }
    .ck sol-icon { color: #2f8f46; margin-top: 2px; }
  `,
})
export class SolSheetChecklist {
  readonly label = input('Conséquences');
  readonly items = input.required<readonly string[]>();
}

/** Dated history lines: reminders already sent, past calls. */
@Component({
  selector: 'sol-sheet-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'input' },
  template: `
    <label>{{ label() }}</label>
    @for (entry of entries(); track $index) {
      <div class="list-r" style="padding:7px 0">
        <span class="hint" [style.width.px]="dateWidth()">{{ entry[0] }}</span>
        <div class="grow" style="font-size:13px">{{ entry[1] }}</div>
      </div>
    }
  `,
})
export class SolSheetHistory {
  readonly label = input.required<string>();
  readonly entries = input.required<readonly (readonly [string, string])[]>();
  readonly dateWidth = input(44);
}

/** Read-only key figures, two per row. */
@Component({
  selector: 'sol-sheet-facts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (fact of facts(); track fact[0]) {
      <div class="kvb"><span class="hint">{{ fact[0] }}</span><b>{{ fact[1] }}</b></div>
    }
  `,
  styles: `:host { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }`,
})
export class SolSheetFacts {
  readonly facts = input.required<readonly (readonly [string, string])[]>();
}
