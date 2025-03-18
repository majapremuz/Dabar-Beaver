import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZastitaPage } from './zastita.page';

describe('ZastitaPage', () => {
  let component: ZastitaPage;
  let fixture: ComponentFixture<ZastitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ZastitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
