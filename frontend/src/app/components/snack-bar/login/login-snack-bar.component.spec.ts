import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSnackBarComponent } from './login-snack-bar.component';

describe('LoginComponent', () => {
  let component: LoginSnackBarComponent;
  let fixture: ComponentFixture<LoginSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSnackBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
