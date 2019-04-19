import {TranscriptSnippet} from './transcriptSnippet';

export class Transcript {
  transcriptSnippetsArray: Array<Array<TranscriptSnippet>> = [];

  addTranscriptSnippetArray(aTranscriptSnippetArray: Array<TranscriptSnippet>) {
    this.transcriptSnippetsArray.push(aTranscriptSnippetArray);
  }
}
