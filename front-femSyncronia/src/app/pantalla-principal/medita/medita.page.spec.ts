import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeditaPage } from './medita.page';

describe('MeditaPage', () => {
  let component: MeditaPage;
  let fixture: ComponentFixture<MeditaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
