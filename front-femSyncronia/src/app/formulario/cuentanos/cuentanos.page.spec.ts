import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuentanosPage } from './cuentanos.page';

describe('CuentanosPage', () => {
  let component: CuentanosPage;
  let fixture: ComponentFixture<CuentanosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentanosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
