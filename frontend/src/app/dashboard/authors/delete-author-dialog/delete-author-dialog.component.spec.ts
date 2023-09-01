import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAuthorDialogComponent } from './delete-author-dialog.component';

describe('DeleteAuthorDialogComponent', () => {
  let component: DeleteAuthorDialogComponent;
  let fixture: ComponentFixture<DeleteAuthorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAuthorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAuthorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
