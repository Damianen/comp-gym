import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

export interface INotification {
	msg: string;
	type: NotificationType;
	duration: number | null;
}

export enum NotificationType {
	Success = 0,
	Error = 1,
}

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	private notification$: Subject<object> = new ReplaySubject<object>(1);

	success(message: string, duration: number | null) {
		this.notify(message, NotificationType.Success, duration);
	}

	error(message: string, duration: number | null) {
		this.notify(message, NotificationType.Error, duration);
	}

	private notify(message: string, type: NotificationType, duration: number | null) {
		duration = !duration ? 3000 : duration;
		this.notification$.next({
			msg: message,
			type: type,
			duration: duration,
		} as INotification);
	}
	get notification() {
		return this.notification$.asObservable();
	}
}
