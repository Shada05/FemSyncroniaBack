import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioCompletadoPage } from './formulario-completado.page';

describe('FormularioCompletadoPage', () => {
  let component: FormularioCompletadoPage;
  let fixture: ComponentFixture<FormularioCompletadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCompletadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
