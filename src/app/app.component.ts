import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAlignCenter } from '@ng-icons/lucide';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  viewProviders: [provideIcons({lucideAlignCenter})]
})
export class AppComponent {
  title = 'firmas';
}
