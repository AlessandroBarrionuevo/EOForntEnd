import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutCursoComponent } from './put-curso.component';

describe('PutCursoComponent', () => {
  let component: PutCursoComponent;
  let fixture: ComponentFixture<PutCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
