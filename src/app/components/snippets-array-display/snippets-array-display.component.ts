import {Component, Input, OnInit} from '@angular/core';
import {TranscriptSnippet} from '../../model/transcriptSnippet';

@Component({
  selector: 'app-snippets-array-display',
  templateUrl: './snippets-array-display.component.html',
  styleUrls: ['./snippets-array-display.component.css']
})
export class SnippetsArrayDisplayComponent implements OnInit {

  private _transcriptSnippetsArray: Array<TranscriptSnippet>;

  speaker: string;
  snippetsArray: string[] = [];
  snippetClass: string;

  @Input('transcriptSnippetsArray')
  set transcriptSnippetsArray(aTranscriptSnippetsArray: Array<TranscriptSnippet>) {
    // console.log('11111', this.speaker, this.snippetsArray);
    this._transcriptSnippetsArray = aTranscriptSnippetsArray;
    this.transcriptSnippetsArrayUpdated();
  }

  constructor() {
  }

  ngOnInit() {
  }

  private transcriptSnippetsArrayUpdated() {
    if (this._transcriptSnippetsArray && this._transcriptSnippetsArray.length > 0) {
      this.speaker = this._transcriptSnippetsArray[0].speaker;
      this.snippetsArray = this._transcriptSnippetsArray.map(aTranscriptSnippet => aTranscriptSnippet.snippet);
      this.snippetClass = `snippet speaker-${this.speaker.toLowerCase()}`;
    } else {
      this.speaker = '';
      this.snippetsArray = [];
    }
  }
}
