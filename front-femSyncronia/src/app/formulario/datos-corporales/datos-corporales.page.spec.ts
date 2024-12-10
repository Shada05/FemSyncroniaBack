import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCorporalesPage } from './datos-corporales.page';

describe('DatosCorporalesPage', () => {
  let component: DatosCorporalesPage;
  let fixture: ComponentFixture<DatosCorporalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosCorporalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
