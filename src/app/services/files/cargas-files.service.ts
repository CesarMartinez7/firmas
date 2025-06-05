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

export interface ResponseComandoExecLs {
  data: {ruta: string; Directorios: {dir: string; nombre: string}[]};
  error: boolean;
  message: string;
  status: number
}


export interface ResponseComandoExecMkdir {
  data: {ruta: string; salida:string[]};
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

  confirmFile(zip_id: string, ruta_save: string) {
    return this.HTTP.post<ResponseConfirmados>(`${environment.url}/confirmar`, { zip_id: zip_id, c_ruta: ruta_save });
  }

  getComandosFiles(){
    return this.HTTP.get<ResponseComandos>(`${environment.url}/lista`)
  }

  executeComandoLs(body: {accion: string; nombre_carpeta: string; ruta?: string } ) {
      return this.HTTP.post<ResponseComandoExecLs>(`${environment.url}/comando`, body)
  }

  execueteComandoMkdir(body: {accion: string; nombre_carpeta: string; ruta?: string }) {
    return this.HTTP.post<ResponseComandoExecMkdir>(`${environment.url}/comando`, body)
  }

}
