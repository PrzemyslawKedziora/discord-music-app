import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSnackBarComponent } from './register-snack-bar.component';

describe('RegisterSnackBarComponent', () => {
  let component: RegisterSnackBarComponent;
  let fixture: ComponentFixture<RegisterSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSnackBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
