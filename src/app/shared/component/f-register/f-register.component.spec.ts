import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRegisterComponent } from './f-register.component';

describe('FRegisterComponent', () => {
  let component: FRegisterComponent;
  let fixture: ComponentFixture<FRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
