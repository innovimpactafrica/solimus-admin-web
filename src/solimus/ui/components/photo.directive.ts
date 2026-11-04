import { Directive, computed, input } from '@angular/core';

/** Framing variants of the reference photograph, so each property looks distinct. */
const POSITIONS = ['58% 0%', '74% 1%', '46% 0%', '86% 2%', '62% 0%', '40% 1%', '68% 2%', '92% 0%'];
const ZOOMS = ['330%', '380%', '310%', '400%', '300%', '360%', '420%', '340%'];

/**
 * Applies the shared property photograph with a stable framing.
 * `<div class="photo" solPhoto [seed]="property.photoSeed"></div>`
 */
@Directive({
  selector: '[solPhoto]',
  host: {
    '[style.--pos]': 'position()',
    '[style.--sz]': 'zoom()',
  },
})
export class SolPhoto {
  readonly seed = input(0, { alias: 'solPhoto' });

  protected readonly position = computed(() => POSITIONS[Math.abs(this.seed()) % POSITIONS.length]);
  protected readonly zoom = computed(() => ZOOMS[Math.abs(this.seed()) % ZOOMS.length]);
}
