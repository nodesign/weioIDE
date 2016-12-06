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
          var re = /(?:\.([^.]+))?$/;
          var ext = re.exec(filename)[1];
          
          var lang = "";
          if (ext == "py") lang = "python";
          if (ext == "json") lang = "json";
          if (ext == "js") lang = "javascript";
          if ((ext == "htm") || (ext == "html")) lang = "html";
        
          let f = { path:filename,
                    type:ext,
                    language:lang,
                    data:JSON.parse(reply)
                  }
          this.currentFile.next(f);
        
      }, this);

      });
      
  }

}
