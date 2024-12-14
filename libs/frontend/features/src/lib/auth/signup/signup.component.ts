import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserIdentity } from '@comp-gym/shared/api';
import { UserService } from '../../user/user-service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../feedback/notifications/notification.service';

@Component({
	selector: 'lib-signup',
	templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit, OnDestroy {
	signupForm!: FormGroup;
	subscription: Subscription = new Subscription();

	constructor(
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.signupForm = new FormGroup({
			firstName: new FormControl(null, [Validators.required]),
			lastName: new FormControl(null, [Validators.required]),
			email: new FormControl(null, [Validators.required, this.validEmail.bind(this)]),
			password: new FormControl(null, [Validators.required, this.validPassword.bind(this)]),
			birthdate: new FormControl(null, [Validators.required]),
			height: new FormControl(null, [Validators.required]),
			weight: new FormControl(null, [Validators.required]),
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	onSubmit(): void {
		if (this.signupForm.valid) {
			const userValues = {
				firstName: String(this.signupForm.value.firstName),
				lastName: String(this.signupForm.value.lastName),
				email: String(this.signupForm.value.email),
				password: String(this.signupForm.value.password),
				birthdate: new Date(String(this.signupForm.value.birthdate)),
				height: Number(this.signupForm.value.height),
				weight: Number(this.signupForm.value.weight),
			};
			this.subscription = this.authService.register(userValues).subscribe({
				next: () => {
					this.router.navigate(['../login'], {
						relativeTo: this.route,
					});
					this.notificationService.success('Your account was successfully created!', 3000);
				},
				error: (err: any) => {
					this.notificationService.error(err.error.message, 6000);
				},
			});
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
