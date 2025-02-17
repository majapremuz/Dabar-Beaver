import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPicturePage } from './add-picture.page';

describe('AddPicturePage', () => {
  let component: AddPicturePage;
  let fixture: ComponentFixture<AddPicturePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
