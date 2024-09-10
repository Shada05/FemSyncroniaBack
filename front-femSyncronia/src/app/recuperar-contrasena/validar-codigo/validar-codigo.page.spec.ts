import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarCodigoPage } from './validar-codigo.page';

describe('ValidarCodigoPage', () => {
  let component: ValidarCodigoPage;
  let fixture: ComponentFixture<ValidarCodigoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarCodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
