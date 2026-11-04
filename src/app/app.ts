import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SheetHost } from './core/sheets/sheet-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SheetHost],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
