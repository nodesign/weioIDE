import { Injectable } from '@angular/core';
import { WeioMessage } from '../websockets/weioMessage.service'
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class StatusMonitorService {

  public ip: string;
  public battery: number;
  public wifi: number;

  id:string = "monitorStatus";

  constructor(private msg: WeioMessage ) {
		msg.messages.subscribe(msg => {			

			if (msg.id == this.id) {
				this.ip = msg.result.ip;
				this.battery = msg.result.battery;
				this.wifi = msg.result.wifi;
//				console.log("hhhhh",msg.result);
			}
		});
  }
  
  getStatus() {
	  this.msg.messages.next(this.msg.getMsg("getStatus", "", this.id ));
  }


}