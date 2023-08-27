import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCardComponent } from './author-card.component';

describe('AuthorCardComponent', () => {
  let component: AuthorCardComponent;
  let fixture: ComponentFixture<AuthorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
