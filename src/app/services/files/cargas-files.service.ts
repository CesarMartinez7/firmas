import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export interface ResponseFilesPrevisualizar {
  data: Data;
  error: boolean;
  message: string;
  status: number;
}

export interface Data {
  archivos: string[];
  comando: string;
  nombre_zip: string;
  ruta_remota: string;
  zip_id: string;
}


export interface ResponseConfirmados {
  data:    Datum[];
  error:   boolean;
  message: string;
  status:  number;
}

export interface Datum {
  archivo:   string;
  respuesta: Respuesta;
}

export interface Respuesta {
  mensaje:     string;
  ruta_remota: string;
}


@Injectable({
  providedIn: 'root',
})
export class CargasFilesService {
  constructor() {}

  HTTP = inject(HttpClient);

  getPrevisualizar(form: FormData) {
    return this.HTTP.post<ResponseFilesPrevisualizar>(
      `${environment.url}/previsualizar`,
      form
    );
  }

  confirmFile(zip_id: string) {
    return this.HTTP.post<ResponseConfirmados>(`${environment.url}/confirmar`, { zip_id });
  }
}
