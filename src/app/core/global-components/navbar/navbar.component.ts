import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  ROUTER = inject(Router)

  handleClickLogout(){
    console.log("jdsjfsfsf")
    sessionStorage.clear()
    this.ROUTER.navigate(["/login"])

  }


}
