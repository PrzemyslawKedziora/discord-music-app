import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorSnackBarComponent } from './author-snack-bar.component';

describe('SnackBarComponent', () => {
  let component: AuthorSnackBarComponent;
  let fixture: ComponentFixture<AuthorSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorSnackBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
