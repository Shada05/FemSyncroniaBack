import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGuardadosPage } from './datos-guardados.page';

describe('DatosGuardadosPage', () => {
  let component: DatosGuardadosPage;
  let fixture: ComponentFixture<DatosGuardadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGuardadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
