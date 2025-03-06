import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroSintomasPage } from './registro-sintomas.page';

describe('RegistroSintomasPage', () => {
  let component: RegistroSintomasPage;
  let fixture: ComponentFixture<RegistroSintomasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSintomasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
