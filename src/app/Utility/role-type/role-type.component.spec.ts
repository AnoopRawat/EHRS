import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTypeComponent } from './role-type.component';

describe('RoleTypeComponent', () => {
  let component: RoleTypeComponent;
  let fixture: ComponentFixture<RoleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
