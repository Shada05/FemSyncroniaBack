import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosPersonalesPage } from './datos-personales.page';

describe('DatosPersonalesPage', () => {
  let component: DatosPersonalesPage;
  let fixture: ComponentFixture<DatosPersonalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPersonalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
