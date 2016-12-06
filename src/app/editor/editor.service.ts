import { Injectable } from '@angular/core';
import { ProjectsService } from '../projects/projects.service'
import { WebSocketRPC } from '../websockets/webSocketRPC.service';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';


@Injectable()
export class EditorService {

  public currentFile: ReplaySubject<any> = new ReplaySubject(1);

  constructor(private project: ProjectsService, private ws: WebSocketRPC) { 

    this.project.currentSelectedFile.subscribe( filename => {
        this.ws.client.send('getFile', [filename], (error, reply) => {
          let f = JSON.parse(reply);
          this.currentFile.next(f);
        
      }, this);

      });
      
  }

}
