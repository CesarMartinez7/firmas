import { Component, inject } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {
  CargasFilesService,
  
  ResponseComandoExecLs,
  ResponseComandoExecMkdir,
  ResponseComandos,
  ResponseConfirmados,
  ResponseFilesPrevisualizar,
} from '../../services/files/cargas-files.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../core/global-components/navbar/navbar.component';
import { FooterComponent } from '../../core/global-components/footer/footer.component';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { HostListener } from '@angular/core';

// Icons ✅
import { heroArrowUpTray, heroCommandLine, heroDocument, heroCloudArrowDown, heroCloudArrowUp } from '@ng-icons/heroicons/outline';
import { heroDocumentMinus } from '@ng-icons/heroicons/outline';
import { heroEye } from '@ng-icons/heroicons/outline';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { heroCodeBracket } from '@ng-icons/heroicons/outline';
import { heroDocumentChartBar } from '@ng-icons/heroicons/outline';
import { heroFolderOpen } from '@ng-icons/heroicons/outline';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    NgIcon,
    CommonModule,
    FooterComponent,
    FormsModule,
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
      heroCodeBracket,
      heroTrash,
      heroFolderOpen,
      heroDocument,
      heroCommandLine,
      heroDocumentChartBar
    }),
  ],
})
export class HomeComponent {

  @HostListener("window:scroll",[])
  onWindowScroll(){
    if(window.scrollY === 0) {
      this.isBlurNavbar = false
    }else{
      this.isBlurNavbar = true
    }
  }
  
  private notyf = new Notyf();
  isBlurNavbar = false
  isLoading: boolean = false;
  CargasFilesServices = inject(CargasFilesService);

  formData: FormData = new FormData();
  form!: FormGroup;

  isDisableBtnPreview: boolean = true;

  ResponseComandosList!: ResponseComandos;
  FilesConfirmResponse!: ResponseConfirmados;
  FilesResponse!: ResponseFilesPrevisualizar | null;

  isLs!: boolean

  ResponseComandosLs!: ResponseComandoExecLs
  ResponseComandosMkdir!: ResponseComandoExecMkdir

  sub = new Subscription()

  baseUrl!: string 

  loadFileName : string = ""

  
  isLoadingResponseConfirm: boolean =   false
  isLoadingResponsePreview: boolean =   false
  isLoadingResponseComand: boolean =    false

  rutaSave: string = ""

  datoCurioso!: string
  datosCuriososComputadoras : string[] = [
    "La primera computadora electrónica, ENIAC, pesaba más de 27 toneladas.",
    "El primer ratón de computadora fue hecho de madera en 1964 por Douglas Engelbart.",
    "Las computadoras modernas pueden realizar más de mil millones de instrucciones por segundo.",
    "La Ley de Moore predice que el número de transistores en un chip se duplica cada dos años.",
    "El primer virus informático para PC fue 'Brain', creado en 1986.",
    "QWERTY es el teclado más usado, aunque no es el más eficiente.",
    "La primera contraseña usada en una computadora fue en los años 60 en el MIT.",
    "CAPTCHA fue creado para diferenciar humanos de bots en la web.",
    "Las supercomputadoras actuales pueden simular el clima global y realizar cálculos cuánticos.",
    "Apple, Microsoft y HP comenzaron en garajes.",
    "El primer videojuego de computadora fue 'Spacewar!', creado en 1962.",
    "En promedio, las personas parpadean menos cuando usan una computadora.",
    "El término 'bug' (error) se originó por una polilla encontrada en una computadora en 1947.",
    "El primer email fue enviado por Ray Tomlinson en 1971.",
    "El primer disco duro de IBM, en 1956, tenía una capacidad de 5 MB y pesaba más de una tonelada."
  ];
  
  
  
  constructor(private fb: FormBuilder) {}


  getRandomNumber(): number {
    return Math.floor(Math.random() * 10)
  }

  private initForm() {

    

    this.form = this.fb.group({
      accion: ['2', [Validators.required]],
      nombre_carpeta: ["", []],
      ruta: ['/', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    this.initForm();
    this.datoCurioso = this.datosCuriososComputadoras[this.getRandomNumber()]
    this.form.get("accion")?.value === 1 ?  this.form.get("nombre_carpeta")?.disable() : this.form.get("nombre_carpeta")?.disable()
    this.form.get("accion")?.valueChanges.subscribe({
      next: (resp) => {
        if(resp === "2") {
          this.form.get("nombre_carpeta")?.disable()
        }
        if(resp === "1"){
          this.form.get("nombre_carpeta")?.enable()
        }
      }
    })
  
    this.sub.add(
      this.CargasFilesServices.getComandosFiles().subscribe({
        next: (resp) => {
          this.ResponseComandosList = resp;        
        },
      })
    )
  }
  

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  
  handleClickCopy(event: Event) {
    
    let el = event.target as HTMLDivElement
    navigator.clipboard.writeText(el.textContent || "")
    this.notyf.success("Texto copiado con exito")
  }

  handleSubmitComando(event: SubmitEvent) {
    event.preventDefault();

    const body = {
      accion: this.form.get('accion')?.value,
      nombre_carpeta: `${this.form.get('nombre_carpeta')?.value}`    ,
      ruta: `/${this.form.get('ruta')?.value}`,
    };
    
    if(this.form.invalid){
      this.notyf.error("Campos Invalidos")
    }else{
      this.isLs = this.form.get("accion")?.value === 1 ? false : true
      console.log(this.isLs)
      this.isLoadingResponseComand = true

      if(this.isLs){
        this.CargasFilesServices.executeComandoLs(body).subscribe({
          next: (resp) => {
            this.ResponseComandosLs = resp
          },error: (err) => {
            this.notyf.error(`Error ${err}`)
          }
        })
      }else{
        this.CargasFilesServices.execueteComandoMkdir(body).subscribe({
          next: (resp) => {
            this.ResponseComandosMkdir = resp
          },error: (err) => {
            this.notyf.error(`Error ${err}`)
          }
        })
      } 
    }
  }


  invalidControlsChange(control: string) {
    return this.form.get(control)?.invalid ? true : false
  }


  handleSubmitConfirmFiles(event: Event) {
    event.preventDefault()
    this.isLoadingResponseConfirm = true
    if (sessionStorage.getItem('zip_id')) {
      this.CargasFilesServices.confirmFile(
        sessionStorage.getItem('zip_id') || '', `/${this.rutaSave}`
      ).subscribe({
        next: (resp) => {
          this.isLoadingResponseConfirm = false
          this.FilesConfirmResponse = resp;
          this.notyf.success(`${resp.message}`)
        },
        error: (err) => {
          this.notyf.error(`Error ${err}`)
        },
      });
    }
  }


  handleClickCancelFlujo(): void {
    
    this.isLoadingResponseComand = false
    this.isDisableBtnPreview = false
    this.isLoadingResponsePreview = false
    this.isLoadingResponseComand = false
    this.rutaSave = ""
    this.loadFileName = ""
    this.FilesResponse = null


    // isLoadingResponseConfirm: boolean =   false
    // isLoadingResponsePreview: boolean =   false
    // isLoadingResponseComand: b
  }

  onChangeFile(target: Event) {
    let element = target.target as HTMLInputElement;
    if (element?.files && element.files.length > 0) {
      this.isDisableBtnPreview = false;
      this.loadFileName = element.files[0].name
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
      this.loadFileName = fileInput.files[0].name
      const formData = new FormData();
      formData.append('archivo', file);
      this.CargasFilesServices.getPrevisualizar(formData).subscribe({
        next: (resp) => {
          this.FilesResponse = resp;
          this.baseUrl = resp.data.ruta_remota
          this.notyf.success(`${resp.message}`)
          sessionStorage.setItem('zip_id', resp.data.zip_id);
        },
        error: (err) => {
          this.notyf.error(`${err}`)
          console.error('❌ Error al subir archivo:', err);
        },
      });
    } else {
      this.notyf.error("❌ No hay archivo seleccionado")
    }
  }
}
