import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUI2Page } from './add-ui2.page';

describe('AddUI2Page', () => {
  let component: AddUI2Page;
  let fixture: ComponentFixture<AddUI2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUI2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUI2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
