import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';


@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, HomeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'comp-gym';
}
