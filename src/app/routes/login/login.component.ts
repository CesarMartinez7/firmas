import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ROUTER = inject(Router)
  AuthService = inject(AuthService)

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
      }
    })
  }

  handleClickCreateAccount(): void {
    window.alert("No se integra esta funcionalidad. ")
  }

}
