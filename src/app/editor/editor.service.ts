import { Injectable } from '@angular/core';
import { ProjectsService } from '../projects/projects.service'
import { WebSocketRPC } from '../websockets/webSocketRPC.service';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';


@Injectable()
export class EditorService {

  public currentFile: ReplaySubject<any> = new ReplaySubject(1);
  // current filename
  
  public filename:string = null;
  // precedent filename t-1
  public p_filename:string = null;

  constructor(private project: ProjectsService, private ws: WebSocketRPC) { 

    this.project.currentSelectedFile.subscribe( filenameA => {
        
        this.ws.client.send('getFile', [filenameA], (error, reply) => {
          // change something if you get the answer
          this.p_filename = this.filename;
          this.filename = filenameA;
 
          let f = JSON.parse(reply);
          this.currentFile.next(f);
        
      }, this);

      });
      
  }

  saveFile(file:string, data:string ) {
    
      this.ws.client.send('saveFile', [file, data], (error, reply) => {
          console.log(reply);
      }, this);

     

  }

}
