import { Component, Input} from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-sintoma-popover',
  templateUrl: './sintoma-popover.component.html',
  styleUrls: ['./sintoma-popover.component.scss'],
})
export class SintomaPopoverComponent {
  @Input() description: string = '';
  constructor(private popoverCtrl: PopoverController) {}

  close() {
    this.popoverCtrl.dismiss();
  }

}
