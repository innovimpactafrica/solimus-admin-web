import { Directive, output } from '@angular/core';

/**
 * Makes a non-interactive element — a table row, a card — behave like a
 * button for the keyboard: focusable, announced as such, and activated by
 * Enter or Space.
 *
 * `<tr solActivatable (activate)="open(ref)">` replaces `<tr (click)="…">`.
 * Prefer a real `<button>` or `<a>` wherever the markup allows one; this is
 * for the cases where it does not, such as a whole row of a table.
 */
@Directive({
  selector: '[solActivatable]',
  host: {
    'tabindex': '0',
    'role': 'button',
    '(click)': 'activate.emit()',
    '(keydown.enter)': 'onKey($event)',
    '(keydown.space)': 'onKey($event)',
  },
})
export class SolActivatable {
  readonly activate = output<void>();

  /** Space scrolls the page unless the default is prevented. */
  protected onKey(event: Event): void {
    event.preventDefault();
    this.activate.emit();
  }
}
