import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
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

  public fileTree: ReplaySubject<any> = new ReplaySubject(1);

  constructor(private http: Http, private ws: WebSocketRPC) {
    this.ws.connected.subscribe((o) => {
      this.getProjectsList();
    });
  }

  getProjectsList() {
    this.ws.client.send('getFileTree', ['../sandbox'], (error, reply) => {
      this.fileTree.next(reply);
    }, this);
  }

  getProjectInfo(projectPath: string): Observable<any> {
    return this.http.get(projectDescriptionUrl).map((res: Response) => res.json());
  }

}
