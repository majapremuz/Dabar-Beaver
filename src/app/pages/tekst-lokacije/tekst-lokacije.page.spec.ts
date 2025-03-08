import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TekstLokacijePage } from './tekst-lokacije.page';

describe('TekstLokacijePage', () => {
  let component: TekstLokacijePage;
  let fixture: ComponentFixture<TekstLokacijePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TekstLokacijePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
