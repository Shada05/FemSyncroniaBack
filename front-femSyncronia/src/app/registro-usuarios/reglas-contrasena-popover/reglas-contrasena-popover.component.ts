import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-reglas-contrasena-popover',
  templateUrl: './reglas-contrasena-popover.component.html',
  styleUrls: ['./reglas-contrasena-popover.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ReglasContrasenaPopoverComponent  implements OnInit {
  @Input() hasMinLength = false;
  @Input() hasNumber = false;
  @Input() hasSpecialChar = false;
  @Input() hasUppercase = false;
  constructor() { }

  ngOnInit() {}

}
