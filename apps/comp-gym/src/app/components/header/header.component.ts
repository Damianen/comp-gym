import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@comp-gym/frontend/features';
import { IUserIdentity } from '@comp-gym/shared/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
	constructor(private authService: AuthService) {}

	user?: IUserIdentity;
	subscription?: Subscription;

	ngOnInit(): void {
		this.subscription = this.authService.currentUser$.subscribe((currentUser?: IUserIdentity) => {
			if (currentUser) {
				this.user = currentUser;
			}
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	logout(): void {
		this.authService.logout();
		this.user = undefined;
	}
}
