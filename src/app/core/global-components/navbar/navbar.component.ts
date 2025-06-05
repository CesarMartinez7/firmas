import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRightEndOnRectangle } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-navbar',
  imports: [NgIcon, CommonModule],
  templateUrl: './navbar.component.html',
  viewProviders: [provideIcons({heroArrowRightEndOnRectangle})]
})
export class NavbarComponent {

  @Input() isBlur: boolean = false
  userName = sessionStorage.getItem("username")
  ROUTER = inject(Router)

  date = new Date().toDateString()

  handleClickLogout(){
    sessionStorage.clear()
    this.ROUTER.navigate(["/login"])

  }


}
