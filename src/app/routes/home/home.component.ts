import { Component, inject } from '@angular/core';
import {
  CargasFilesService,
  ResponseComandoExec,
  ResponseComandos,
  ResponseConfirmados,
  ResponseFilesPrevisualizar,
} from '../../services/files/cargas-files.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../core/global-components/navbar/navbar.component';
import { FooterComponent } from '../../core/global-components/footer/footer.component';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

// Icons ✅
import { heroArrowUpTray } from '@ng-icons/heroicons/outline';
import { heroCloudArrowDown } from '@ng-icons/heroicons/outline';
import { heroCloudArrowUp } from '@ng-icons/heroicons/outline';
import { heroDocumentMinus } from '@ng-icons/heroicons/outline';
import { heroEye } from '@ng-icons/heroicons/outline';
import { heroCodeBracket } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    NgIcon,
    CommonModule,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  viewProviders: [
    provideIcons({
      heroArrowUpTray,
      heroDocumentMinus,
      heroCloudArrowDown,
      heroCloudArrowUp,
      heroEye,
      heroCodeBracket
    }),
  ],
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoading: boolean = false;
  CargasFilesServices = inject(CargasFilesService);

  formData: FormData = new FormData();
  form!: FormGroup;

  isDisableBtnPreview: boolean = true;

  ResponseComandosList!: ResponseComandos;
  FilesConfirmResponse!: ResponseConfirmados;
  FilesResponse!: ResponseFilesPrevisualizar;
  ResponseComandosExec!: ResponseComandoExec;


  baseUrl!: string 


  handleClickCopy(event: Event) {
    console.log(event.target)
    let el = event.target as HTMLDivElement
    navigator.clipboard.writeText(el.textContent || "")
  }


  constructor(private fb: FormBuilder) {}

  private initForm() {
    this.form = this.fb.group({
      accion: ['2', [Validators.required]],
      nombre_carpeta: ['', [Validators.required,]],
      ruta: ['', []],
    });
  }

  ngOnInit(): void {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });

    this.initForm();

    

    this.CargasFilesServices.getComandosFiles().subscribe({
      next: (resp) => {
        this.ResponseComandosList = resp;
      },
    });
  }

  handleSubmitComando(event: SubmitEvent) {
    event.preventDefault();
    const body = {
      accion: this.form.get('accion')?.value,
      nombre_carpeta: `/${this.form.get('nombre_carpeta')?.value}`,
      ruta: this.form.get('ruta')?.value,
    };

    console.log(`Aqui esta el body ${body}`);
    this.CargasFilesServices.executeComandoFiles(body).subscribe({
      next: (resp) => {
        this.ResponseComandosExec = resp;
      },
      error: (err) => {
        console.error(`Error ${err}`);
      },
    })
  }

  handleSubmitConfirmFiles() {
    if (sessionStorage.getItem('zip_id')) {
      this.CargasFilesServices.confirmFile(
        sessionStorage.getItem('zip_id') || ''
      ).subscribe({
        next: (resp) => {
          this.FilesConfirmResponse = resp;
        },
        error: (err) => {
          console.log(`Error ${err}`);
        },
      });
    }
  }

  onChangeFile(target: Event) {
    let element = target.target as HTMLInputElement;
    console.log(element);

    if (element?.files && element.files.length > 0) {
      console.log(element.files);
      this.isDisableBtnPreview = false;
    } else {
      this.isDisableBtnPreview = true;
    }
  }

  handleSubmitFile(): void {
    const fileInput = document.getElementById(
      'dropzone-file'
    ) as HTMLInputElement;

    if (fileInput?.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.isDisableBtnPreview = false;

      const formData = new FormData();
      formData.append('archivo', file);

      this.CargasFilesServices.getPrevisualizar(formData).subscribe({
        next: (resp) => {
          this.FilesResponse = resp;
          this.baseUrl = resp.data.ruta_remota
          sessionStorage.setItem('zip_id', resp.data.zip_id);
        },
        error: (err) => {
          console.error('❌ Error al subir archivo:', err);
        },
      });
    } else {
      console.log('❌ No hay archivo seleccionado');
    }
  }
}
