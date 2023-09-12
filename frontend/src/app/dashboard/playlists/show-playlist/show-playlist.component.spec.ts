import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlaylistComponent } from './show-playlist.component';

describe('ShowPlaylistComponent', () => {
  let component: ShowPlaylistComponent;
  let fixture: ComponentFixture<ShowPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
