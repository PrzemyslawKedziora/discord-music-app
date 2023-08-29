import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSquareComponent } from './song-square.component';

describe('SongSquareComponent', () => {
  let component: SongSquareComponent;
  let fixture: ComponentFixture<SongSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongSquareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
