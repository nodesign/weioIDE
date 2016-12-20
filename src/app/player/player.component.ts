import { Component, OnInit } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  isActive = false;
  
  constructor(private ws: WebSocketRPC, private player: PlayerService) {
      this.ws.connected.subscribe((o) => {
        
      //this.ws.connected.unsubscribe();
    });
  }

  ngOnInit() {
  }

  play() {
    console.log('will play now');
    
     this.ws.client.send('readUserConfiguration', [null], (error, reply) => {
       if (error != null) {
          alert(error);
       } else {
          this.isActive = true;
          this.ws.client.send('play', [null]);
       }
      }, this);

  }

  stop() {
     this.ws.client.send('stop', [null], (error, reply) => {
        console.log(reply);
        this.isActive = false;
      }, this);
  }

}
