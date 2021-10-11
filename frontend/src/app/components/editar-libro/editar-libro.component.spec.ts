import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLibroComponent } from './editar-libro.component';

describe('EditarLibroComponent', () => {
  let component: EditarLibroComponent;
  let fixture: ComponentFixture<EditarLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
