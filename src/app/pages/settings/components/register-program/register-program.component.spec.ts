import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProgramComponent } from './register-program.component';

describe('RegisterProgramComponent', () => {
  let component: RegisterProgramComponent;
  let fixture: ComponentFixture<RegisterProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
