import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviarCodigoPage } from './enviar-codigo.page';

describe('EnviarCodigoPage', () => {
  let component: EnviarCodigoPage;
  let fixture: ComponentFixture<EnviarCodigoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarCodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
