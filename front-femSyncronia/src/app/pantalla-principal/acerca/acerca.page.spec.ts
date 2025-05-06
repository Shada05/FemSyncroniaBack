import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcercaPage } from './acerca.page';

describe('AcercaPage', () => {
  let component: AcercaPage;
  let fixture: ComponentFixture<AcercaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
