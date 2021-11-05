import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProfesoresComponent } from './menu-profesores.component';

describe('MenuProfesoresComponent', () => {
  let component: MenuProfesoresComponent;
  let fixture: ComponentFixture<MenuProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuProfesoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
