import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConstruccionPage } from './construccion.page';

describe('ConstruccionPage', () => {
  let component: ConstruccionPage;
  let fixture: ComponentFixture<ConstruccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstruccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
