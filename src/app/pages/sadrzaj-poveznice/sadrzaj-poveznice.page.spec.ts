import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SadrzajPoveznicePage } from './sadrzaj-poveznice.page';

describe('SadrzajPoveznicePage', () => {
  let component: SadrzajPoveznicePage;
  let fixture: ComponentFixture<SadrzajPoveznicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SadrzajPoveznicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
