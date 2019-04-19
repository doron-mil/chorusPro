import {async, inject, TestBed} from '@angular/core/testing';

import {TranscriptService} from './transcript.service';
import {HttpClientModule} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Transcript} from '../model/transcript';
import {TranscriptSnippet} from '../model/transcriptSnippet';

describe('TranscriptService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [TranscriptService]
  }));

  it('should be created', inject([TranscriptService], (service: TranscriptService) => {
    expect(service).toBeTruthy();
  }));

  it('Transcript retrieve and handling', async(inject([TranscriptService], (service: TranscriptService) => {
    const meetingId = '4d79041e-f25f-421d-9e5f-3462459b9934';
    const transcriptObservable = service.getTranscript(meetingId);
    transcriptObservable
      .pipe(catchError(err => {
        return throwError(err);
      }))
      .subscribe((aTranscript: Transcript) => {
        expect(aTranscript.transcriptSnippetsArray).toBeTruthy();
        expect(aTranscript.transcriptSnippetsArray.length).toBeGreaterThan(0);

        let lastSpeaker = null;
        let lastTime = -1.0;
        aTranscript.transcriptSnippetsArray.forEach((aTranscriptSnippetArray: Array<TranscriptSnippet>) => {
          expect(aTranscriptSnippetArray).toBeTruthy();
          expect(aTranscriptSnippetArray.length).toBeGreaterThan(0);
          expect(aTranscriptSnippetArray[0].speaker).not.toEqual(lastSpeaker);
          lastSpeaker = aTranscriptSnippetArray[0].speaker;
          aTranscriptSnippetArray.forEach((aTranscriptSnippet: TranscriptSnippet) => {
            expect(aTranscriptSnippet.speaker).toEqual(lastSpeaker);
            expect(aTranscriptSnippet.time).toBeGreaterThan(lastTime);
            lastTime = aTranscriptSnippet.time;
          });
        });
        expect(aTranscript.transcriptSnippetsArray.length).toEqual(7);
      });
  })));


});
