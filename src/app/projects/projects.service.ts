import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';

import 'rxjs/Rx';


@Injectable()
export class ProjectsService {

  public projectsTree: ReplaySubject<any> = new ReplaySubject(1);
  public projectItemsTree: ReplaySubject<any> = new ReplaySubject(1);
  public currentSelectedFile: ReplaySubject<any> = new ReplaySubject(1);
  public currentProjectPath: string = "";

  constructor(private ws: WebSocketRPC) {
      this.ws.connected.subscribe((o) => {
        this.getProjectsList();
        this.ws.connected.unsubscribe();
      });
    }

    getProjectsList() {  
      this.ws.client.send('getProjectsList', [null], (error, reply) => {
        console.log("LISTA PROJEKATA"+ reply);
        this.projectsTree.next(reply);
      }, this);
    }

    getProjectItemsList(projectPath) {
      this.currentProjectPath = projectPath;
      console.log("ASKING FOR", this.currentProjectPath);
      this.ws.client.send('getFileTree', [this.currentProjectPath], (error, reply) => {
        console.log("LISTA UNUTRA PROJEKTA"+ reply);
        this.projectItemsTree.next(reply);
      }, this);
    }

    selectFile(filename) {
      console.log("selected file", filename);

      this.ws.client.send('inspectFile', [this.currentProjectPath+filename], (error, reply) => {
       
        var inspected = JSON.parse(reply);
        console.log("INSPECTIOOON",inspected);
        if ((inspected.type=="file") && (inspected.supportedType==true)) this.currentSelectedFile.next(this.currentProjectPath+filename);
        if (inspected.type=="folder") console.log("I'm folder man!");

      }, this);


    }
}
