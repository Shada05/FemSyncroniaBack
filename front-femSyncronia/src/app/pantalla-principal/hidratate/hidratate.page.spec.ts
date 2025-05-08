import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HidratatePage } from './hidratate.page';

describe('HidratatePage', () => {
  let component: HidratatePage;
  let fixture: ComponentFixture<HidratatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HidratatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
