import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodoPage } from './periodo.page';

describe('PeriodoPage', () => {
  let component: PeriodoPage;
  let fixture: ComponentFixture<PeriodoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
