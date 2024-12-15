import { Component, OnDestroy, OnInit } from '@angular/core';
import { INotification, NotificationService, NotificationType } from '../notification.service';
import { takeWhile } from 'rxjs';

@Component({
	selector: 'lib-notifications',
	templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit, OnDestroy {
	private _subscribed = true;
	private classMap?: Map<NotificationType, string>;
	notifications!: INotification[];

	constructor(private service: NotificationService) {
		this.notifications = [];
	}

	ngOnInit(): void {
		this.classMap = new Map<NotificationType, string>();
		this.classMap.set(NotificationType.Success, 'success');
		this.classMap.set(NotificationType.Error, 'error');

		this.service.notification.pipe(takeWhile(() => this._subscribed)).subscribe((notification) => {
			if (notification) this.open(notification as INotification);
		});
	}

	ngOnDestroy() {
		this._subscribed = false;
	}

	private open(notification: INotification) {
		this.notifications.push(notification);
		setTimeout(() => {
			this.close(notification);
		}, notification.duration as number);
	}

	close(notification: INotification) {
		this.notifications.splice(this.notifications.indexOf(notification), 1);
	}
}
