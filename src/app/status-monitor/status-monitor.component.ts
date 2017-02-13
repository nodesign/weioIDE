import { Component, OnInit, HostListener } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';
import { ModalService } from '../utils/modal/modal.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-status-monitor',
  templateUrl: './status-monitor.component.html',
  styleUrls: ['./status-monitor.component.css']
})

export class StatusMonitorComponent implements OnInit {

  @HostListener('click') onClick() {
    console.log('click');
  }

  //status: string = "please wait";

  public ip: string;
  public battery: number;
  public wifi: number;

  id: string = "monitorStatus";

  constructor(private ws: WebSocketRPC, private ModalService: ModalService) {

  }

  ngOnInit() {
    setTimeout(() => { this.ModalService.loadComponent('STATUS_MONITOR', DialogComponent, {}); }, 3000);
  }

  requestStatus() {
    this.ws.client.send('getProjectsList', ['./projects'], (error, reply) => {
      console.log('reply', reply);
    });
    // this.msg.messages.next(this.msg.getMsg("getStatus", "", this.id ));
  }

}
