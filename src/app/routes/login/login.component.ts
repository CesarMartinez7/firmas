import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ROUTER = inject(Router)
  AuthService = inject(AuthService)

  notify = new Notyf()
  form!: FormGroup


  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["droides", Validators.required],
      password: ["17111711", Validators.required ]
    })
  }

  constructor(private fb: FormBuilder) { }

  handleSubmit(): void {
    const body = {
      username: this.form.get("username")?.value,
      password: this.form.get("password")?.value
    }
    this.AuthService.authGetToken(body).subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          sessionStorage.setItem("jwt", resp.data.token)
          this.ROUTER.navigateByUrl("home")
          sessionStorage.setItem("username", this.form.get("username")?.value)
          sessionStorage.setItem("password", this.form.get("password")?.value)
        }
        this.notify.success(resp.message)
        console.log(resp.status)
      },error: (err) => {
        console.log(err)
        this.notify.error(err.error?.message)
      }
    })
  }

  handleClickCreateAccount(): void {
    window.alert("No se integra esta funcionalidad. ")
  }

}
