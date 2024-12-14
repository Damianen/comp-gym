import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FeaturesModule, NotificationComponent } from '@comp-gym/frontend/features';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AboutComponent,
		FooterComponent,
		HeaderComponent,
		NotificationComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes, {
			initialNavigation: 'enabledBlocking',
		}),
		FeaturesModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
