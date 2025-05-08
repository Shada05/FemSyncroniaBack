import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PielPage } from './piel.page';

describe('PielPage', () => {
  let component: PielPage;
  let fixture: ComponentFixture<PielPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PielPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
