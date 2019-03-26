import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPage } from './ui.page';

describe('UIPage', () => {
  let component: UIPage;
  let fixture: ComponentFixture<UIPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
