import { Injectable } from '@angular/core';
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

let projectRoot = './sandbox';

@Injectable()
export class ProjectsService {

  public projectsTree: ReplaySubject<any> = new ReplaySubject(1);
  public projectItemsTree: ReplaySubject<any> = new ReplaySubject(1);
  public currentSelectedFile: ReplaySubject<any> = new ReplaySubject(1);

  constructor(private ws: WebSocketRPC) {
      this.ws.connected.subscribe((o) => {
        this.getProjectsList();
        this.ws.connected.unsubscribe();
      });
    }

    getProjectsList() {  
      this.ws.client.send('getProjectsList', ['./projects'], (error, reply) => {
        console.log("LISTA PROJEKATA"+ reply);
        this.projectsTree.next(reply);
      }, this);
    }

    getProjectItemsList(projectPath) {
      console.log("ASKING FOR", './projects'+projectPath);
      this.ws.client.send('getFileTree', ['./projects'+projectPath], (error, reply) => {
        console.log("LISTA UNUTRA PROJEKTA"+ reply);
        this.projectItemsTree.next(reply);
      }, this);
    }

    selectFile(filename) {
      this.currentSelectedFile.next(projectRoot+filename);
    }
}
