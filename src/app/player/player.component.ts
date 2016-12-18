import { Component, OnInit } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private ws: WebSocketRPC) {
      this.ws.connected.subscribe((o) => {
        
      //this.ws.connected.unsubscribe();
    });
  }

  ngOnInit() {
  }

  play() {
    
     this.ws.client.send('play', ["python", "-u", "./sandbox/counter.py"], (error, reply) => {
        console.log(reply);
      }, this);
  }

  stop() {
     this.ws.client.send('stop', [], (error, reply) => {
        
      }, this);
  }

}