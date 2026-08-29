# Authentication — sign in, OTP, account switching

Source: https://ui.barua.tz/docs/authentication.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Sign In

The flagship flow. .b-auth-card is a glass panel that stacks a gradient __logo , __title and __subtitle , a .b-btn--provider social button, a .b-divider--label , standard .b-field rows and a block primary action. The card is shown alone here — in an app, place it inside the .b-auth page wrapper, which centers it over a full-height, aurora-tinted background. Wrap the controls in a real <form> so Enter submits.

- Documentation: https://ui.barua.tz/docs/authentication.html#sign-in
- Classes: `b-auth-card` `b-auth-card__footer` `b-auth-card__logo` `b-auth-card__subtitle` `b-auth-card__title` `b-btn` `b-btn--block` `b-btn--primary` `b-btn--provider` `b-divider--label` `b-field` `b-hstack` `b-input` `b-label` `b-link` `b-stack--between`

```html
<div class="b-auth-card" style="max-width: 24rem; margin-inline: auto">
  <div class="b-auth-card__logo" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2.75" y="4.75" width="18.5" height="14.5" rx="3.25" stroke="currentColor" stroke-width="1.7"/><path d="m4.75 8.25 7.25 5.25 7.25-5.25" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
  <h2 class="b-auth-card__title">Welcome back</h2>
  <p class="b-auth-card__subtitle">Sign in to your Neurotech workspace.</p>
  <button class="b-btn b-btn--provider b-btn--block" type="button">
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.53 5.53 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81Z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.1A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.28 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4.01-3.1Z"/><path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z"/></svg>
    Continue with Google
  </button>
  <div class="b-divider--label">or</div>
  <div class="b-field">
    <label class="b-label" for="signin-email">E
```

```tsx
import { AuthCard, Button, Field, Label } from "barua-ui";

<AuthCard style={{ maxWidth: "24rem", marginInline: "auto" }}>
  <div className="b-auth-card__logo" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="3.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4.75 8.25 7.25 5.25 7.25-5.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
  <h2 className="b-auth-card__title">Welcome back</h2>
  <p className="b-auth-card__subtitle">Sign in to your Neurotech workspace.</p>
  <Button variant="provider" block type="button">
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.53 5.53 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.28 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4.01-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z" />
    </svg>
    Continue with Google
  </Button>
  <div className="b-divider--label">or</div>
  <Field>
    <Label htmlFor="signin-email">E</Label>
  </Field>
</AuthCard>
```

## Sign Up

Same card, different fields. Keep it to the essentials — name, email, password, terms via .b-checkbox — and defer everything else to onboarding.

- Documentation: https://ui.barua.tz/docs/authentication.html#sign-up
- Classes: `b-auth-card` `b-auth-card__footer` `b-auth-card__subtitle` `b-auth-card__title` `b-btn` `b-btn--block` `b-btn--primary` `b-checkbox` `b-field` `b-input` `b-label`

```html
<div class="b-auth-card" style="max-width: 24rem; margin-inline: auto">
  <h2 class="b-auth-card__title">Create your account</h2>
  <p class="b-auth-card__subtitle">Start your 14-day Neurotech trial.</p>
  <div class="b-field">
    <label class="b-label" for="signup-name">Full name</label>
    <input class="b-input" id="signup-name" name="name" type="text" autocomplete="name" placeholder="Amina Hassan">
  </div>
  <div class="b-field">
    <label class="b-label" for="signup-email">Work email</label>
    <input class="b-input" id="signup-email" name="email" type="email" autocomplete="email" placeholder="amina@neurotech.africa">
  </div>
  <div class="b-field">
    <label class="b-label" for="signup-password">Password</label>
    <input class="b-input" id="signup-password" name="new-password" type="password" autocomplete="new-password" placeholder="8+ characters">
  </div>
  <label class="b-checkbox">
    <input type="checkbox" name="terms">
    <span>I agree to the <a href="#sign-up">Terms of Service</a> and <a href="#sign-up">Privacy Policy</a></span>
  </label>
  <button class="b-btn b-btn--primary b-btn--block" type="button">Create account</button>
  <p class="b-auth-card__footer">Already have an account? <a href="#sign-in">Sign in</a></p>
</div>
```

```tsx
import { AuthCard, Button, Checkbox, Field, Input, Label } from "barua-ui";

<AuthCard style={{ maxWidth: "24rem", marginInline: "auto" }}>
  <h2 className="b-auth-card__title">Create your account</h2>
  <p className="b-auth-card__subtitle">Start your 14-day Neurotech trial.</p>
  <Field>
    <Label htmlFor="signup-name">Full name</Label>
    <Input id="signup-name" name="name" type="text" autoComplete="name" placeholder="Amina Hassan" />
  </Field>
  <Field>
    <Label htmlFor="signup-email">Work email</Label>
    <Input id="signup-email" name="email" type="email" autoComplete="email" placeholder="amina@neurotech.africa" />
  </Field>
  <Field>
    <Label htmlFor="signup-password">Password</Label>
    <Input id="signup-password" name="new-password" type="password" autoComplete="new-password" placeholder="8+ characters" />
  </Field>
  <Checkbox>
    <input type="checkbox" name="terms" />
    <span>
      I agree to the
      <a href="#sign-up">Terms of Service</a>
      and
      <a href="#sign-up">Privacy Policy</a>
    </span>
  </Checkbox>
  <Button variant="primary" block type="button">Create account</Button>
  <p className="b-auth-card__footer">
    Already have an account?
    <a href="#sign-in">Sign in</a>
  </p>
</AuthCard>
```

## Forgot Password

One field, one action, one way back. Confirm the send generically (“If an account exists for that address…”) so the flow never leaks which emails are registered.

- Documentation: https://ui.barua.tz/docs/authentication.html#forgot-password
- Classes: `b-auth-card` `b-auth-card__footer` `b-auth-card__subtitle` `b-auth-card__title` `b-btn` `b-btn--block` `b-btn--primary` `b-field` `b-input` `b-label` `b-link` `b-link--muted`

```html
<div class="b-auth-card" style="max-width: 24rem; margin-inline: auto">
  <h2 class="b-auth-card__title">Reset your password</h2>
  <p class="b-auth-card__subtitle">We&rsquo;ll email you a secure reset link.</p>
  <div class="b-field">
    <label class="b-label" for="forgot-email">Email</label>
    <input class="b-input" id="forgot-email" name="email" type="email" autocomplete="email" placeholder="amina@neurotech.africa">
  </div>
  <button class="b-btn b-btn--primary b-btn--block" type="button">Send reset link</button>
  <p class="b-auth-card__footer"><a class="b-link b-link--muted" href="#sign-in">← Back to sign in</a></p>
</div>
```

```tsx
import { AuthCard, Button, Field, Input, Label, Link } from "barua-ui";

<AuthCard style={{ maxWidth: "24rem", marginInline: "auto" }}>
  <h2 className="b-auth-card__title">Reset your password</h2>
  <p className="b-auth-card__subtitle">We’ll email you a secure reset link.</p>
  <Field>
    <Label htmlFor="forgot-email">Email</Label>
    <Input id="forgot-email" name="email" type="email" autoComplete="email" placeholder="amina@neurotech.africa" />
  </Field>
  <Button variant="primary" block type="button">Send reset link</Button>
  <p className="b-auth-card__footer">
    <Link className="b-link--muted" href="#sign-in">← Back to sign in</Link>
  </p>
</AuthCard>
```

## Reset Password

Two password fields plus a .b-help hint about strength. Both inputs use autocomplete="new-password" , which is the cue for password managers to offer a generated password.

- Documentation: https://ui.barua.tz/docs/authentication.html#reset-password
- Classes: `b-auth-card` `b-auth-card__subtitle` `b-auth-card__title` `b-btn` `b-btn--block` `b-btn--primary` `b-field` `b-help` `b-input` `b-label`

```html
<div class="b-auth-card" style="max-width: 24rem; margin-inline: auto">
  <h2 class="b-auth-card__title">Choose a new password</h2>
  <p class="b-auth-card__subtitle">for amina@neurotech.africa</p>
  <div class="b-field">
    <label class="b-label" for="reset-new">New password</label>
    <input class="b-input" id="reset-new" name="new-password" type="password" autocomplete="new-password">
    <p class="b-help">At least 8 characters with a number and a symbol — a long passphrase is even stronger.</p>
  </div>
  <div class="b-field">
    <label class="b-label" for="reset-confirm">Confirm new password</label>
    <input class="b-input" id="reset-confirm" name="confirm-password" type="password" autocomplete="new-password">
  </div>
  <button class="b-btn b-btn--primary b-btn--block" type="button">Reset password</button>
</div>
```

```tsx
import { AuthCard, Button, Field, Help, Input, Label } from "barua-ui";

<AuthCard style={{ maxWidth: "24rem", marginInline: "auto" }}>
  <h2 className="b-auth-card__title">Choose a new password</h2>
  <p className="b-auth-card__subtitle">for amina@neurotech.africa</p>
  <Field>
    <Label htmlFor="reset-new">New password</Label>
    <Input id="reset-new" name="new-password" type="password" autoComplete="new-password" />
    <Help>At least 8 characters with a number and a symbol — a long passphrase is even stronger.</Help>
  </Field>
  <Field>
    <Label htmlFor="reset-confirm">Confirm new password</Label>
    <Input id="reset-confirm" name="confirm-password" type="password" autoComplete="new-password" />
  </Field>
  <Button variant="primary" block type="button">Reset password</Button>
</AuthCard>
```

## OTP Input

.b-otp is a row of six single-character boxes. Add data-b-otp and barua.js wires the behavior: every box gets inputmode="numeric" and maxlength="1" , typing a digit auto-advances to the next box (toggling .is-filled ), Backspace on an empty box steps back, and pasting a copied code distributes the digits across the whole group.

- Documentation: https://ui.barua.tz/docs/authentication.html#otp-input
- Classes: `b-otp`

```html
<div class="b-otp" data-b-otp role="group" aria-label="One-time code">
  <input type="text" inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="Digit 1" value="7" class="is-filled">
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2">
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3">
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4">
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 5">
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 6">
</div>
```

```tsx
import { OtpInput } from "barua-ui";

<OtpInput data-b-otp="" role="group" aria-label="One-time code">
  <input type="text" inputMode="numeric" maxLength="1" autoComplete="one-time-code" aria-label="Digit 1" value="7" className="is-filled" />
  <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 2" />
  <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 3" />
  <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 4" />
  <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 5" />
  <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 6" />
</OtpInput>
```

## Verification

The screen after sign-up, built from the result states in Feedback : .b-result--confirm with a tinted resend action and an escape hatch to correct the address.

- Documentation: https://ui.barua.tz/docs/authentication.html#verification
- Classes: `b-btn` `b-btn--tinted` `b-link` `b-link--muted` `b-result` `b-result--confirm` `b-result__actions` `b-result__desc` `b-result__icon` `b-result__title`

```html
<div class="b-result b-result--confirm">
  <div class="b-result__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none"><rect x="2.75" y="4.75" width="18.5" height="14.5" rx="3.25" stroke="currentColor" stroke-width="1.7"/><path d="m4.75 8.25 7.25 5.25 7.25-5.25" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
  <h2 class="b-result__title">Check your inbox</h2>
  <p class="b-result__desc">We sent a verification link to <strong>amina@neurotech.africa</strong>. It expires in 24 hours.</p>
  <div class="b-result__actions">
    <button class="b-btn b-btn--tinted" type="button">Resend email</button>
    <a class="b-link b-link--muted" href="#sign-up">Change email address</a>
  </div>
</div>
```

```tsx
import { Button, Link, Result } from "barua-ui";

<Result tone="confirm">
  <div className="b-result__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="3.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4.75 8.25 7.25 5.25 7.25-5.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
  <h2 className="b-result__title">Check your inbox</h2>
  <p className="b-result__desc">
    We sent a verification link to
    <strong>amina@neurotech.africa</strong>
    . It expires in 24 hours.
  </p>
  <div className="b-result__actions">
    <Button variant="tinted" type="button">Resend email</Button>
    <Link className="b-link--muted" href="#sign-up">Change email address</Link>
  </div>
</Result>
```

## Passkey Prompt

.b-passkey is a focused prompt for WebAuthn sign-in: a soft accent __icon , a one-line pitch, a primary action and a ghost fallback to other methods.

- Documentation: https://ui.barua.tz/docs/authentication.html#passkey-prompt
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-passkey` `b-passkey__desc` `b-passkey__icon` `b-passkey__title`

```html
<div class="b-passkey" style="max-width: 24rem">
  <div class="b-passkey__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M7.5 10.5a4.5 4.5 0 0 1 9 0v3a13.5 13.5 0 0 1-.56 3.85" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 10.5v3.25a9.75 9.75 0 0 1-1.4 5.05" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4.5 13.5v-3a7.5 7.5 0 0 1 11.87-6.1M19.5 10.2v3.3c0 1.7-.28 3.33-.8 4.85" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
  </div>
  <h3 class="b-passkey__title">Sign in with a passkey</h3>
  <p class="b-passkey__desc">Use Face ID, Touch ID or your device PIN. Nothing to remember, nothing to phish.</p>
  <button class="b-btn b-btn--primary" type="button">Use passkey</button>
  <button class="b-btn b-btn--ghost" type="button">Other options</button>
</div>
```

```tsx
import { Button } from "barua-ui";

<div className="b-passkey" style={{ maxWidth: "24rem" }}>
  <div className="b-passkey__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
      <path d="M7.5 10.5a4.5 4.5 0 0 1 9 0v3a13.5 13.5 0 0 1-.56 3.85" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 10.5v3.25a9.75 9.75 0 0 1-1.4 5.05" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4.5 13.5v-3a7.5 7.5 0 0 1 11.87-6.1M19.5 10.2v3.3c0 1.7-.28 3.33-.8 4.85" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </div>
  <h3 className="b-passkey__title">Sign in with a passkey</h3>
  <p className="b-passkey__desc">Use Face ID, Touch ID or your device PIN. Nothing to remember, nothing to phish.</p>
  <Button variant="primary" type="button">Use passkey</Button>
  <Button variant="ghost" type="button">Other options</Button>
</div>
```

## Two-Factor Authentication

Composed, not invented: a .b-auth-card carrying an OTP group, a remember-device .b-switch and a block verify action.

- Documentation: https://ui.barua.tz/docs/authentication.html#two-factor-authentication
- Classes: `b-auth-card` `b-auth-card__footer` `b-auth-card__subtitle` `b-auth-card__title` `b-btn` `b-btn--block` `b-btn--primary` `b-otp` `b-switch`

```html
<div class="b-auth-card" style="max-width: 24rem; margin-inline: auto">
  <h2 class="b-auth-card__title">Two-factor code</h2>
  <p class="b-auth-card__subtitle">Enter the 6-digit code from your authenticator app.</p>
  <div class="b-otp" data-b-otp role="group" aria-label="Two-factor code">
    <input type="text" inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="Digit 1">
    <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2">
    <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3">
    <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4">
    <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 5">
    <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 6">
  </div>
  <label class="b-switch">
    <input type="checkbox" checked>
    Remember this device for 30 days
  </label>
  <button class="b-btn b-btn--primary b-btn--block" type="button">Verify</button>
  <p class="b-auth-card__footer">Lost your device? <a href="#two-factor-authentication">Use a recovery code</a></p>
</div>
```

```tsx
import { AuthCard, Button, OtpInput, Switch } from "barua-ui";

<AuthCard style={{ maxWidth: "24rem", marginInline: "auto" }}>
  <h2 className="b-auth-card__title">Two-factor code</h2>
  <p className="b-auth-card__subtitle">Enter the 6-digit code from your authenticator app.</p>
  <OtpInput data-b-otp="" role="group" aria-label="Two-factor code">
    <input type="text" inputMode="numeric" maxLength="1" autoComplete="one-time-code" aria-label="Digit 1" />
    <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 2" />
    <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 3" />
    <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 4" />
    <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 5" />
    <input type="text" inputMode="numeric" maxLength="1" aria-label="Digit 6" />
  </OtpInput>
  <Switch>
    <input type="checkbox" checked />
    Remember this device for 30 days
  </Switch>
  <Button variant="primary" block type="button">Verify</Button>
  <p className="b-auth-card__footer">
    Lost your device?
    <a href="#two-factor-authentication">Use a recovery code</a>
  </p>
</AuthCard>
```

## Account Switcher

.b-account-switcher stacks .b-account rows — initials .b-avatar , __name and __email — inside a .b-menu -shaped glass surface. Mark the signed-in account with .is-active and a __check .

- Documentation: https://ui.barua.tz/docs/authentication.html#account-switcher
- Classes: `b-account` `b-account-switcher` `b-account__check` `b-account__email` `b-account__meta` `b-account__name` `b-avatar` `b-menu` `b-menu__separator`

```html
<div class="b-menu" style="width: 18rem">
  <div class="b-account-switcher">
    <button class="b-account is-active" type="button">
      <span class="b-avatar" aria-hidden="true">AH</span>
      <div class="b-account__meta">
        <div class="b-account__name">Amina Hassan</div>
        <div class="b-account__email">amina@neurotech.africa</div>
      </div>
      <span class="b-account__check" aria-hidden="true">✓</span>
    </button>
    <button class="b-account" type="button">
      <span class="b-avatar" aria-hidden="true">BO</span>
      <div class="b-account__meta">
        <div class="b-account__name">Baraka Otieno</div>
        <div class="b-account__email">baraka@neurotech.africa</div>
      </div>
    </button>
    <button class="b-account" type="button">
      <span class="b-avatar" aria-hidden="true">NS</span>
      <div class="b-account__meta">
        <div class="b-account__name">Neurotech Support</div>
        <div class="b-account__email">support@neurotech.africa</div>
      </div>
    </button>
    <hr class="b-menu__separator">
    <button class="b-account" type="button">
      <span class="b-avatar" aria-hidden="true">+</span>
      <div class="b-account__meta">
        <div class="b-account__name">Add account</div>
      </div>
    </button>
  </div>
</div>
```

```tsx
import { Account, AccountSwitcher, Avatar, Menu, MenuSeparator } from "barua-ui";

<Menu style={{ width: "18rem" }}>
  <AccountSwitcher>
    <Account active type="button">
      <Avatar aria-hidden="true">AH</Avatar>
      <div className="b-account__meta">
        <div className="b-account__name">Amina Hassan</div>
        <div className="b-account__email">amina@neurotech.africa</div>
      </div>
      <span className="b-account__check" aria-hidden="true">✓</span>
    </Account>
    <Account type="button">
      <Avatar aria-hidden="true">BO</Avatar>
      <div className="b-account__meta">
        <div className="b-account__name">Baraka Otieno</div>
        <div className="b-account__email">baraka@neurotech.africa</div>
      </div>
    </Account>
    <Account type="button">
      <Avatar aria-hidden="true">NS</Avatar>
      <div className="b-account__meta">
        <div className="b-account__name">Neurotech Support</div>
        <div className="b-account__email">support@neurotech.africa</div>
      </div>
    </Account>
    <MenuSeparator />
    <Account type="button">
      <Avatar aria-hidden="true">+</Avatar>
      <div className="b-account__meta">
        <div className="b-account__name">Add account</div>
      </div>
    </Account>
  </AccountSwitcher>
</Menu>
```

## Profile Menu

A zero-JS dropdown: details.b-dropdown whose summary is a .b-profile-trigger — avatar, name, chevron — opening a .b-menu . See Navigation for the full menu family.

- Documentation: https://ui.barua.tz/docs/authentication.html#profile-menu
- Classes: `b-avatar` `b-avatar--sm` `b-dropdown` `b-menu` `b-menu__item` `b-menu__item--danger` `b-menu__separator` `b-menu__shortcut` `b-profile-trigger`

```html
<details class="b-dropdown">
  <summary class="b-profile-trigger">
    <span class="b-avatar b-avatar--sm" aria-hidden="true">AH</span>
    Amina Hassan
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true"><path d="m5 8 5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </summary>
  <ul class="b-menu">
    <li><button class="b-menu__item">Profile</button></li>
    <li><button class="b-menu__item">Settings<span class="b-menu__shortcut">⌘,</span></button></li>
    <li><hr class="b-menu__separator"></li>
    <li><button class="b-menu__item b-menu__item--danger">Sign out</button></li>
  </ul>
</details>
```

```tsx
import { Avatar, Dropdown, Menu, MenuSeparator } from "barua-ui";

<Dropdown>
  <summary className="b-profile-trigger">
    <Avatar className="b-avatar--sm" aria-hidden="true">AH</Avatar>
    Amina Hassan
    <svg
      viewBox="0 0 20 20"
      fill="none"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </summary>
  <Menu>
    <li>
      <button className="b-menu__item">Profile</button>
    </li>
    <li>
      <button className="b-menu__item">
        Settings
        <span className="b-menu__shortcut">⌘,</span>
      </button>
    </li>
    <li>
      <MenuSeparator />
    </li>
    <li>
      <button className="b-menu__item b-menu__item--danger">Sign out</button>
    </li>
  </Menu>
</Dropdown>
```

