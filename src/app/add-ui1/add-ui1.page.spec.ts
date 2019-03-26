import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUI1Page } from './add-ui1.page';

describe('AddUI1Page', () => {
  let component: AddUI1Page;
  let fixture: ComponentFixture<AddUI1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUI1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUI1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
