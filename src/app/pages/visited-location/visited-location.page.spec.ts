import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitedLocationPage } from './visited-location.page';

describe('VisitedLocationPage', () => {
  let component: VisitedLocationPage;
  let fixture: ComponentFixture<VisitedLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitedLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
