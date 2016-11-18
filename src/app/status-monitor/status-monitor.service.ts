import { Injectable } from '@angular/core';
import { WeioMessage, Message  } from '../websockets/weioMessage.service';

@Injectable()
export class StatusMonitorService {

  constructor(private msg: WeioMessage) {
		msg.messages.subscribe(msg => {			
			console.log(msg);
      //this.messages.push(msg);
		});
  }
  
  getIp() {

  }

  getEnergyStatus() {
    
  }

  getNetworkStatus() {

  }

}
