import { Component, OnInit } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  playColor:string = "gray";
  stopColor:string = "gray";
  
  constructor(private ws: WebSocketRPC, private player: PlayerService) {
      this.ws.connected.subscribe((o) => {
        
      //this.ws.connected.unsubscribe();
    });
  }

  ngOnInit() {
  }

  play() {
    console.log("will play now");
    
     this.ws.client.send('readUserConfiguration', [null], (error, reply) => {
       if (error != null) {
          alert(error);
       } else {
          console.log("CONFIG OK READY TO PLAY",reply);
          this.ws.client.send('play', [null], (error, reply) => {
              console.log("PLAY ANSWERED",reply);
              this.playColor = "#3cddf7";
            });
       }
      }, this);

  }

  stop() {
     this.ws.client.send('stop', [null], (error, reply) => {
        console.log(reply);
        this.playColor = "gray";
      }, this);
  }

}
