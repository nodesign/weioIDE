// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AceEditorComponent } from 'ng2-ace-editor';
import { ProjectsService } from './projects/projects.service';

// components
import { AppComponent } from './app.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectsPipe } from './projects/projects.pipe';
import { TreeComponent } from './utils/tree/tree.component';
import { TreePipe } from './utils/tree/tree.pipe';
import { StatusMonitorComponent } from './status-monitor/status-monitor.component';
import { EditorComponent } from './editor/editor.component';
import { PlayerComponent } from './player/player.component';
import { ModalComponent } from './utils/modal/modal.component';
import { SelectFileDirective } from './utils/select-file.directive';
import { DialogComponent } from './dialog/dialog.component';

// services
import { WebSocketRPC } from './websockets/webSocketRPC.service';
import { OutputConsoleComponent } from './output-console/output-console.component';
import { PlayerService } from './player/player.service';
import { ModalService } from './utils/modal/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectsPipe,
    TreeComponent,
    TreePipe,
    StatusMonitorComponent,
    EditorComponent,
    AceEditorComponent,
    PlayerComponent,
    OutputConsoleComponent,
    ModalComponent,
    SelectFileDirective,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WebSocketRPC, ProjectsService, PlayerService, ModalService],
  bootstrap: [AppComponent],
  exports: [
    ProjectsPipe
  ]
})
export class AppModule { }
