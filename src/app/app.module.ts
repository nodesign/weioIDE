// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectsPipe } from './projects/projects.pipe';
import { TreeComponent } from './utils/tree/tree.component';
import { TreePipe } from './utils/tree/tree.pipe';
import { StatusMonitorComponent } from './status-monitor/status-monitor.component'

// services
import { WebSocketRPC } from './websockets/webSocketRPC.service'

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectsPipe,
    TreeComponent,
    TreePipe,
    StatusMonitorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WebSocketRPC],
  bootstrap: [AppComponent],
  exports: [
    ProjectsPipe
  ]
})
export class AppModule { }
