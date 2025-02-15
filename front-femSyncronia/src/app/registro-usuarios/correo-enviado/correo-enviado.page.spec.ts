import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorreoEnviadoPage } from './correo-enviado.page';

describe('CorreoEnviadoPage', () => {
  let component: CorreoEnviadoPage;
  let fixture: ComponentFixture<CorreoEnviadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoEnviadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
