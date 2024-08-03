import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearTablaComponent } from './modal-crear-tabla.component';

describe('ModalCrearTablaComponent', () => {
  let component: ModalCrearTablaComponent;
  let fixture: ComponentFixture<ModalCrearTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCrearTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCrearTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
