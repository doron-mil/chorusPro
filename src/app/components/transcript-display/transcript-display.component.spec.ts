import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptDisplayComponent } from './transcript-display.component';

describe('TranscriptDisplayComponent', () => {
  let component: TranscriptDisplayComponent;
  let fixture: ComponentFixture<TranscriptDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
