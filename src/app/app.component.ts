import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/global-components/navbar/navbar.component';
import { FooterComponent } from './core/global-components/footer/footer.component';
import { ReactiveFormsModule} from '@angular/forms'



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  viewProviders: []
})
export class AppComponent {
  title = 'firmas';
}
