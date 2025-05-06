import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TyCPage } from './ty-c.page';

describe('TyCPage', () => {
  let component: TyCPage;
  let fixture: ComponentFixture<TyCPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TyCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
