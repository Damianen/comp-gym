import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserIdentity } from '@comp-gym/shared/api';
import { delay } from 'rxjs/operators';
import { NotificationService } from '../../feedback/notifications/notification.service';

@Component({
	selector: 'lib-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm!: FormGroup;
	subs?: Subscription;
	submitted = false;

	constructor(
		private authService: AuthService,
		private router: Router,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl(null, [Validators.required, this.validEmail.bind(this)]),
			password: new FormControl(null, [Validators.required, this.validPassword.bind(this)]),
		});

		this.subs = this.authService.getUserFromLocalStorage().subscribe({
			next: (user: IUserIdentity) => {
				if (user) {
					this.router.navigate(['/']);
				}
			},
			error: (err: any) => {
				this.notificationService.error(err.error.message, 6000);
			},
		});
	}

	ngOnDestroy(): void {
		if (this.subs) {
			this.subs.unsubscribe();
		}
	}

	onSubmit(): void {
		if (this.loginForm.valid) {
			this.submitted = true;
			const email = this.loginForm.value.email;
			const password = this.loginForm.value.password;
			this.authService.login(email, password).subscribe({
				next: (user) => {
					if (user) {
						this.router.navigate(['/']);
						this.notificationService.success('Login was successful!', 3000);
					} else {
						this.notificationService.error('Email or Password was not correct!', 4000);
					}
					this.submitted = false;
				},
				error: (err: any) => {
					this.notificationService.error(err.error.message, 6000);
				},
			});
		} else {
			this.submitted = false;
		}
	}

	validEmail(control: FormControl): { [s: string]: boolean } | null {
		const email = control.value;
		const regexp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
		if (regexp.test(email) !== true) {
			return { email: false };
		} else {
			return null;
		}
	}

	validPassword(control: FormControl): { [s: string]: boolean } | null {
		const password = control.value;
		const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
		const test = regexp.test(password);
		if (regexp.test(password) !== true) {
			return { password: false };
		} else {
			return null;
		}
	}
}
