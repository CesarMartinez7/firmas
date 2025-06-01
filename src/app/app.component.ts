import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/global-components/navbar/navbar.component';
import { FooterComponent } from './core/global-components/footer/footer.component';
// import { NgIcon, provideIcons } from '@ng-icons/core';
// import { lucideAlignCenter } from '@ng-icons/lucide';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  viewProviders: []
})
export class AppComponent {
  title = 'firmas';
}
