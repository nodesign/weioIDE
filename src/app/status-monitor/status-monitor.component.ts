import { Component, OnInit } from '@angular/core';
import { WeioMessage } from '../websockets/weioMessage.service'

@Component({
  selector: 'app-status-monitor',
  templateUrl: './status-monitor.component.html',
  styleUrls: ['./status-monitor.component.css'],
  providers: [WeioMessage]
})

export class StatusMonitorComponent implements OnInit {
  //status: string = "please wait";

  public ip: string;
  public battery: number;
  public wifi: number;

  id:string = "monitorStatus";

  constructor(private msg: WeioMessage) { 
    	msg.messages.subscribe(msg => {			

			if (msg.id == this.id) {
				this.ip = msg.result.ip;
				this.battery = msg.result.battery;
				this.wifi = msg.result.wifi;
//				console.log("hhhhh",msg.result);
			}
		});

  }

  ngOnInit() {
  }

  requestStatus() {
    this.msg.messages.next(this.msg.getMsg("getStatus", "", this.id ));
  }

}
