import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiAnteriorCicloPage } from './mi-anterior-ciclo.page';

describe('MiAnteriorCicloPage', () => {
  let component: MiAnteriorCicloPage;
  let fixture: ComponentFixture<MiAnteriorCicloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiAnteriorCicloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
