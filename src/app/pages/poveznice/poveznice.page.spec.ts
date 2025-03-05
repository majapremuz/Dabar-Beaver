import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoveznicePage } from './poveznice.page';

describe('PoveznicePage', () => {
  let component: PoveznicePage;
  let fixture: ComponentFixture<PoveznicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoveznicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
