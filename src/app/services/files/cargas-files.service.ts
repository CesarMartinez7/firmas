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
  archivos: {nombre: string; peso_kb: string}[];
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
  mensaje?:     string;
  ruta_remota?: string;
  error: string
  estado: number
}

export interface ResponseComandos {
  data:  DataComand[];
  error:   boolean;
  message: string;
  status:  number;
}

export interface DataComand {
  Comando: string;
  Label:   string;
  Numero:  number;
}

export interface ResponseComandoExec {
  data: {ruta: string; salida: string[]};
  error: boolean;
  message: string;
  status: number
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

  getComandosFiles(){
    return this.HTTP.get<ResponseComandos>(`${environment.url}/lista`)
  }

  executeComandoFiles(body: {accion: string; nombre_carpeta: string; ruta?: string }) {
    console.log(body)
    return this.HTTP.post<ResponseComandoExec>(`${environment.url}/comando`, body)
  }

}
