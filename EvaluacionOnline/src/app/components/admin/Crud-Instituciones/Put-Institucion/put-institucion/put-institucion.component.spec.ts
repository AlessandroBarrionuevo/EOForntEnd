import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutInstitucionComponent } from './put-institucion.component';

describe('PutInstitucionComponent', () => {
  let component: PutInstitucionComponent;
  let fixture: ComponentFixture<PutInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutInstitucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
