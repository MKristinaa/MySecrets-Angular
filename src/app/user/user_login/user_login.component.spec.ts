/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { User_loginComponent } from './user_login.component';

describe('User_loginComponent', () => {
  let component: User_loginComponent;
  let fixture: ComponentFixture<User_loginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_loginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_loginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
