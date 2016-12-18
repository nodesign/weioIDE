import { Component, OnInit } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';

@Component({
  selector: 'app-output-console',
  templateUrl: './output-console.component.html',
  styleUrls: ['./output-console.component.css']
})
export class OutputConsoleComponent implements OnInit {

  constructor(private ws: WebSocketRPC) { 
    ws.client.expose("pushToConsole", (params, reply) => {
      console.log(params);
    });
  }

  ngOnInit() {
  }

}
