import { Component,EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.scss'],
})
export class CiclosComponent  implements OnInit {
  @Output() cerrarComponente = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}
  cerrar() {
    this.cerrarComponente.emit();
  }
}
