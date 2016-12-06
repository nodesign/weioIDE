import { Component, OnInit } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';


@Component({
  selector: 'app-status-monitor',
  templateUrl: './status-monitor.component.html',
  styleUrls: ['./status-monitor.component.css']
})

export class StatusMonitorComponent implements OnInit {
  //status: string = "please wait";

  public ip: string;
  public battery: number;
  public wifi: number;

  id:string = "monitorStatus";

  constructor(private ws:WebSocketRPC) {}

  ngOnInit() {
  
  }

  requestStatus() {
    this.ws.client.send('mirror', ['a param', 'another param'], function mirrorReply (error, reply) 
    {
        	console.log('mirror reply', reply);
    });
   // this.msg.messages.next(this.msg.getMsg("getStatus", "", this.id ));
  }

  

}
