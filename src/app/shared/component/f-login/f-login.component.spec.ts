import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FLoginComponent } from './f-login.component';

describe('FLoginComponent', () => {
  let component: FLoginComponent;
  let fixture: ComponentFixture<FLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
