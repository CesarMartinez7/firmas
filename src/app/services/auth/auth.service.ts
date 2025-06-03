import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';


interface RegistrerUser {
  username: string;
  password: string;
  email:    string;
  role:     string
}

interface LoginUser {
  username:  string
  password:  string
}


interface ResponseLogin {
  data: {
    token:  string
  },
  error:    boolean;
  message:  string;
  status:   number
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  HTTP = inject(HttpClient)

  authValidacion() {

  }

  authGetToken(data: LoginUser){
    const body = {
      username: data.username,
      password: data.password
    }

    return this.HTTP.post<ResponseLogin>( `${environment.url}/login`, body)
  }

  authGetTokenSessionStorage(){

  }

  constructor() { } 
}
