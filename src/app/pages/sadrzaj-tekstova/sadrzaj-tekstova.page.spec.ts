import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SadrzajTekstovaPage } from './sadrzaj-tekstova.page';

describe('SadrzajTekstovaPage', () => {
  let component: SadrzajTekstovaPage;
  let fixture: ComponentFixture<SadrzajTekstovaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SadrzajTekstovaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
