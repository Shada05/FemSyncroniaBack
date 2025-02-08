import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReglasContrasenaPopoverComponent } from './reglas-contrasena-popover.component';

describe('ReglasContrasenaPopoverComponent', () => {
  let component: ReglasContrasenaPopoverComponent;
  let fixture: ComponentFixture<ReglasContrasenaPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglasContrasenaPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReglasContrasenaPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
