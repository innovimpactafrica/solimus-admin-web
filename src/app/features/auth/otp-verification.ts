import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { SolIcon } from '@solimus/ui';
import { AuthLayout } from './auth-layout';

const OTP_LENGTH = 6;
const RESEND_DELAY = 30;

/**
 * Second sign-in step: the member types the code received by e-mail.
 * Once verified, they land on the dashboard (overview).
 */
@Component({
  selector: 'app-otp-verification',
  imports: [ReactiveFormsModule, RouterLink, SolIcon, NgOtpInputComponent, AuthLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './otp-verification.html',
  styleUrls: ['./auth-form.css', './otp-verification.css'],
})
export default class OtpVerification {
  private readonly router = inject(Router);

  /** Login typed on the previous screen, passed through navigation state. */
  protected readonly login: string = history.state?.login ?? 'khadija.sarr@solimus.sn';

  protected readonly code = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(OTP_LENGTH)],
  });

  protected readonly config: NgOtpInputConfig = {
    length: OTP_LENGTH,
    allowNumbersOnly: true,
    inputClass: 'otp-box',
    containerClass: 'otp',
  };

  protected readonly verifying = signal(false);
  protected readonly countdown = signal(RESEND_DELAY);
  protected readonly resent = signal(false);

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    this.startCountdown();
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  protected verify(): void {
    if (this.code.invalid || this.verifying()) return;
    this.verifying.set(true);
    // Mock verification: any 6-digit code is accepted.
    setTimeout(() => void this.router.navigate(['/']), 600);
  }

  protected resend(): void {
    this.code.reset();
    this.resent.set(true);
    this.startCountdown();
  }

  private startCountdown(): void {
    clearInterval(this.timer);
    this.countdown.set(RESEND_DELAY);
    this.timer = setInterval(() => {
      this.countdown.update((s) => s - 1);
      if (this.countdown() <= 0) clearInterval(this.timer);
    }, 1000);
  }
}
