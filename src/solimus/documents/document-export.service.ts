import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/**
 * Isolates how a document leaves the application. Version one prints through
 * the browser with `print.css`, which already lays the page out as A4; a
 * server-side renderer can be swapped in here without touching a template.
 */
@Injectable({ providedIn: 'root' })
export class DocumentExportService {
  private readonly document = inject(DOCUMENT);

  /**
   * Prints the page. The caller is expected to have the document on screen:
   * `print.css` hides the application chrome and keeps only `.dpage`.
   */
  print(): void {
    this.document.defaultView?.print();
  }

  /** Filename a download would use, kept here so every screen agrees on it. */
  fileName(title: string, reference: string): string {
    const slug = title
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
    return `${slug}-${reference}.pdf`;
  }
}
