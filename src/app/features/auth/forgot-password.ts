import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SolIcon } from '@solimus/ui';
import { AuthLayout } from './auth-layout';

/** Forgotten-password screen: asks for the e-mail, then confirms the link was sent. */
@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink, SolIcon, AuthLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forgot-password.html',
  styleUrl: './auth-form.css',
})
export default class ForgotPassword {
  protected readonly sent = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Mock: no backend yet, the reset link is considered sent.
    this.sent.set(true);
  }
}
