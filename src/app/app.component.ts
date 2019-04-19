import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranscriptService} from './services/transcript.service';
import {Transcript} from './model/transcript';
import {ActivatedRoute} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'chorusPro';

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  meetingId = '4d79041e-f25f-421d-9e5f-3462459b9934';
  apiBaseUrl = 'https://static.chorus.ai/api/';
  videoSource: string;
  isPalaying = false;
  errorString = 'Loading...';
  videoErrorMsg: string;

  transcript: Transcript;

  constructor(private route: ActivatedRoute,
              private transcriptService: TranscriptService) {
  }

  ngOnInit(): void {
    this.initializePage();

  }

  private initializePage() {
    this.route.queryParams.subscribe(params => {
      const idKey = 'id';
      const idParam = params[idKey];
      if (idParam == null) {
        this.errorString = 'Must have id in url \n(i.e:http://.../?id=<transcript id>)';
        return;
      }
      if ((idParam as string).trim() === '') {
        this.errorString = 'Id param in the url \nmust point to a valid transcript id \n(i.e:http://.../?id=<transcript id>)';
        return;
      }
      this.meetingId = (idParam as string).trim();
      this.transcriptService.getTranscript(this.meetingId)
        .pipe(catchError(err => {
          this.errorString = 'Not a valid transcript id';
          return throwError(err);
        }))
        .subscribe(aTranscript => {
          this.transcript = aTranscript;
          this.setVideoSource();
          this.errorString = null;
        });
    });

  }

  onVideoError() {
    this.videoErrorMsg = 'Video not found';
  }

  toggleVideo() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    if (this.isPalaying) {
      video.pause();
    } else {
      video.play();
    }
    this.isPalaying = !this.isPalaying;
  }


  private setVideoSource() {
    this.videoSource = `${this.apiBaseUrl}${this.meetingId}.mp4`;
  }
}
