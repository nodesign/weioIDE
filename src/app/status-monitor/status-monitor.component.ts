import { Component, OnInit } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';
import { ModalService } from '../utils/modal/modal.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-status-monitor',
  templateUrl: './status-monitor.component.html',
  styleUrls: ['./status-monitor.component.css']
})

export class StatusMonitorComponent implements OnInit {

  public ip: string;
  public battery: number;
  public wifi: number;

  id: string = "monitorStatus";

  private _CONTEXT_ = 'STATUS_MONITOR';

  constructor(private ws: WebSocketRPC, private ModalService: ModalService) {

  }

  ngOnInit() {
    this.ModalService.fromModalComponent.subscribe((data) => {
      if (data.context === this._CONTEXT_) {
        console.log('from modal', data);
      } else {
        console.log('bad context', data);
      }
    });
    setTimeout(() => {
      this.ModalService.loadComponent({
        context: this._CONTEXT_,
        component: DialogComponent,
        data: { title: 'Dialog' }
      });
    }, 3000);
  }

  requestStatus() {
    this.ws.client.send('getProjectsList', ['./projects'], (error, reply) => {
      console.log('reply', reply);
    });
    // this.msg.messages.next(this.msg.getMsg("getStatus", "", this.id ));
  }

}
