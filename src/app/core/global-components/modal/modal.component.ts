import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() isVisible: boolean = false
  @Input() Text: string = "Default text"
  @Input() TextTitle: string = "Default title"


  handleShow(){
    m
  }
}
