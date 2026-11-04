import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Legal footer repeated at the bottom of every generated document. */
@Component({
  selector: 'sol-doc-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="df">
      <span>{{ label() }} {{ date() }}</span>
      <span>{{ issuer() }}</span>
      <span>Page {{ page() }}</span>
    </div>
  `,
  styles: `:host { display: contents; }`,
})
export class SolDocFooter {
  readonly date = input.required<string>();
  readonly page = input('1 / 1');
  readonly label = input('Émis le');
  readonly issuer = input('Document généré par Solimus Gestion');
}
