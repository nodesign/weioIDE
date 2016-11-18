import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsPipe } from './projects/projects.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ProjectsPipe
  ]
})
export class AppModule { }
