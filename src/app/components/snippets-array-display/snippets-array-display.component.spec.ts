import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetsArrayDisplayComponent } from './snippets-array-display.component';

describe('SnippetsArrayDisplayComponent', () => {
  let component: SnippetsArrayDisplayComponent;
  let fixture: ComponentFixture<SnippetsArrayDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetsArrayDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetsArrayDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
