import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Round initials avatar. The palette index keeps a person's colour stable. */
@Component({
  selector: 'sol-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="av" [class]="classes()">{{ initials() }}</span>`,
  styles: `:host { display: inline-flex; flex: none; }`,
})
export class SolAvatar {
  readonly name = input.required<string>();
  /** 1 to 6, matching the .a1 … .a6 palette. Derived from the name when omitted. */
  readonly palette = input<number | null>(null);
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase(),
  );

  protected classes(): string {
    const index = this.palette() ?? this.hashedPalette();
    const size = this.size();
    return `a${index}${size === 'md' ? '' : ` ${size}`}`;
  }

  private hashedPalette(): number {
    const name = this.name();
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash * 31 + name.charCodeAt(i)) % 997;
    }
    return (hash % 6) + 1;
  }
}
