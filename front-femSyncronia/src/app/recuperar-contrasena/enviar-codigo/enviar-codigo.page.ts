import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-enviar-codigo',
  templateUrl: './enviar-codigo.page.html',
  styleUrls: ['./enviar-codigo.page.scss'],
})
export class EnviarCodigoPage implements OnInit {
  formulario: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }



  ngOnInit() {
  }

}
