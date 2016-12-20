import { Component, OnInit } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';

@Component({
  selector: 'app-output-console',
  templateUrl: './output-console.component.html',
  styleUrls: ['./output-console.component.scss']
})
export class OutputConsoleComponent implements OnInit {

  consoleOutput:string = "";
  messageType:string = "stdout";
  consoleLines:Array<Object> = [];;

  constructor(private ws: WebSocketRPC) { 
    ws.client.expose("pushToConsole", (params, reply) => {
      console.log(params);
      this.consoleLines.push(params[0]);
    });
  }

  ngOnInit() {
  }

  touchConsole(e) {
    this.consoleLines = [];
  }

}
