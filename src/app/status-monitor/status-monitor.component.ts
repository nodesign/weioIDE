import { Component, OnInit } from '@angular/core';
import { StatusMonitorService } from './status-monitor.service'

@Component({
  selector: 'app-status-monitor',
  templateUrl: './status-monitor.component.html',
  styleUrls: ['./status-monitor.component.css'],
  providers: [StatusMonitorService]
})
export class StatusMonitorComponent implements OnInit {
  status: string = "please wait";
  
  constructor(monitor: StatusMonitorService) { 
    monitor.getIp();
    monitor.getEnergyStatus();
    monitor.getNetworkStatus();
  }

  ngOnInit() {
  }

}
