import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SolIcon } from '@solimus/ui';
import { AuthLayout } from './auth-layout';

/** Sign-in screen. A valid submit sends the member to the OTP step. */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, SolIcon, AuthLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './auth-form.css',
})
export default class Login {
  private readonly router = inject(Router);

  protected readonly passwordVisible = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    login: ['khadija.sarr@solimus.sn', Validators.required],
    password: ['solimus2026', Validators.required],
    remember: true,
  });

  protected togglePassword(): void {
    this.passwordVisible.update((visible) => !visible);
  }

  protected signIn(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    void this.router.navigate(['/login/verification'], {
      state: { login: this.form.controls.login.value },
    });
  }
}
