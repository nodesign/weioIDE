import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';

import 'rxjs/Rx';

/**
 * 
 */
const projectDescriptionUrl = ".project.json";

/**
 * @todo Change path with real server path
 */
const projectsListUrl = "assets/tmp/projects.json";

@Injectable()
export class ProjectsService {

  constructor(private http: Http, private ws: WebSocketRPC) {
    this.ws.connected.subscribe((o) => {
      console.log('change', o);
      this.ws.client.send('getFileTree', ['../sandbox'], function mirrorReply(error, reply) {
        console.log('mirror reply', reply);
      });
    });
    /**/
  }

  getProjectsList(): Observable<any> {

    return this.http.get(projectsListUrl);
  }

  getProjectInfo(projectPath: string): Observable<any> {
    return this.http.get(projectDescriptionUrl).map((res: Response) => res.json());
  }

}
