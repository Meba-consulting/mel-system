import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationUnitComponent } from './create-organisation-unit.component';

describe('CreateOrganisationUnitComponent', () => {
  let component: CreateOrganisationUnitComponent;
  let fixture: ComponentFixture<CreateOrganisationUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganisationUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganisationUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
