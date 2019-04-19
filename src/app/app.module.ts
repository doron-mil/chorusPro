import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranscriptDisplayComponent} from './components/transcript-display/transcript-display.component';
import {SnippetsArrayDisplayComponent} from './components/snippets-array-display/snippets-array-display.component';
import {RouterModule} from '@angular/router';

const routes = [  {path: ':id', component: AppComponent} ];

@NgModule({
  declarations: [
    AppComponent,
    TranscriptDisplayComponent,
    SnippetsArrayDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
