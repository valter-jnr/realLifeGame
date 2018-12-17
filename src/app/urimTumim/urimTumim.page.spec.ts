import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrimTumim } from './urimTumim.page';

describe('AboutPage', () => {
  let component: UrimTumim;
  let fixture: ComponentFixture<UrimTumim>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UrimTumim],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrimTumim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
