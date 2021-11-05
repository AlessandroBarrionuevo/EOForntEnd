import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInstitucionesComponent } from './tabla-instituciones.component';

describe('TablaInstitucionesComponent', () => {
  let component: TablaInstitucionesComponent;
  let fixture: ComponentFixture<TablaInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInstitucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
