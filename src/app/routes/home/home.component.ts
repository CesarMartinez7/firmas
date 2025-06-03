import { Component, inject } from '@angular/core';
import { CargasFilesService, ResponseConfirmados } from '../../services/files/cargas-files.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../core/global-components/navbar/navbar.component';
import { Data } from '../../services/files/cargas-files.service';

@Component({
  selector: 'app-home',
  imports: [ NavbarComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoading: boolean = false;
  CargasFilesServices = inject(CargasFilesService);
  formData: FormData = new FormData();


  FilesConfirmResponse! : ResponseConfirmados
  FilesResponse! : Data

  ngOnInit(): void {}


  handleSubmitConfirmFiles() {

    if(sessionStorage.getItem("zip_id")){
      this.CargasFilesServices.confirmFile(sessionStorage.getItem("zip_id") || "").subscribe({
        next: (resp) => {
          this.FilesConfirmResponse = resp
        },error: (err) => {
          console.log(`Error ${err}`)
        }
      })

    }
  }

  handleSubmitFile(): void {
    const fileInput = document.getElementById(
      'dropzone-file'
    ) as HTMLInputElement;
  
    if (fileInput?.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append('archivo', file); 
  
      this.CargasFilesServices.getPrevisualizar(formData).subscribe({
        next: (resp) => {
          this.FilesResponse = resp.data
          sessionStorage.setItem("zip_id", resp.data.zip_id)
        },
        error: (err) => {
          console.error('❌ Error al subir archivo:', err);
        }
      });
    } else {
      console.log('❌ No hay archivo seleccionado');
    }
  }
  
}
