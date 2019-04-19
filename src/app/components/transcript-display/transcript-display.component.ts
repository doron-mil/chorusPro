import {Component, Input, OnInit} from '@angular/core';
import {Transcript} from '../../model/transcript';

@Component({
  selector: 'app-transcript-display',
  templateUrl: './transcript-display.component.html',
  styleUrls: ['./transcript-display.component.css']
})
export class TranscriptDisplayComponent implements OnInit {

  private _transcript: Transcript;

  @Input('transcript')
  set transcript(aTranscript: Transcript) {
    this._transcript = aTranscript;
  }

  get transcript(): Transcript {
    return this._transcript;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
