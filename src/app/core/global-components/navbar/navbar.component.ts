import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRightEndOnRectangle } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-navbar',
  imports: [NgIcon],
  templateUrl: './navbar.component.html',
  viewProviders: [provideIcons({heroArrowRightEndOnRectangle})]
})
export class NavbarComponent {

  userName = sessionStorage.getItem("username")
  ROUTER = inject(Router)

  date = new Date()

  handleClickLogout(){
    console.log("jdsjfsfsf")
    sessionStorage.clear()
    this.ROUTER.navigate(["/login"])

  }


}
