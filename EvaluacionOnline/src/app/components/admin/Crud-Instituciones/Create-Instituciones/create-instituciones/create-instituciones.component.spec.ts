import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstitucionesComponent } from './create-instituciones.component';

describe('CreateInstitucionesComponent', () => {
  let component: CreateInstitucionesComponent;
  let fixture: ComponentFixture<CreateInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInstitucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
