import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Transcript} from '../model/transcript';
import {TranscriptSnippet} from '../model/transcriptSnippet';
import {Observable, throwError} from 'rxjs';

const headers = new HttpHeaders()
  .set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  constructor(private http: HttpClient) {
  }


  getTranscript(aMeetingId: string): Observable<Transcript> {
    return this.http
      .get(`https://static.chorus.ai/api/${aMeetingId}.json`, {headers}).pipe(
        map((aSnippetsJsonArray: Array<any>) => {
          const snippetsArray = new Array<TranscriptSnippet>();
          aSnippetsJsonArray.forEach(aSnippetJson => {
            const newTranscriptSnippet = Object.assign(new TranscriptSnippet(), aSnippetJson) as TranscriptSnippet;
            this.testMultiplySnippet(newTranscriptSnippet);
            snippetsArray.push(newTranscriptSnippet);
          });
          return snippetsArray;
        }),
        map(aSnippetsArray => aSnippetsArray.sort(this.timeSortFunc)),
        map(aSortedSnippetsArray => this.convertSnippetsArrayToTranscript(aSortedSnippetsArray))
       );
  }

  private timeSortFunc(aTS: TranscriptSnippet, bTS: TranscriptSnippet): number {
    return aTS.time - bTS.time;
  }

  private convertSnippetsArrayToTranscript(aSortedSnippetsArray: Array<TranscriptSnippet>): Transcript {
    const newTranscript = new Transcript();

    let lastTranscriptSnippetArray: Array<TranscriptSnippet>;
    aSortedSnippetsArray.forEach((aTranscriptSnippet: TranscriptSnippet) => {
      if (!lastTranscriptSnippetArray || lastTranscriptSnippetArray[0].speaker !== aTranscriptSnippet.speaker) {
        lastTranscriptSnippetArray = new Array<TranscriptSnippet>();
        newTranscript.addTranscriptSnippetArray(lastTranscriptSnippetArray);
      }
      lastTranscriptSnippetArray.push(aTranscriptSnippet);
    });
    return newTranscript;
  }

  private testMultiplySnippet(aTranscriptSnippet: TranscriptSnippet) {
    aTranscriptSnippet.snippet = aTranscriptSnippet.snippet.repeat(10);
  }
}
