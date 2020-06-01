import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewSignupComponent } from './crew-signup.component';

describe('CrewSignupComponent', () => {
  let component: CrewSignupComponent;
  let fixture: ComponentFixture<CrewSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
