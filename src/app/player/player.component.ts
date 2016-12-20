import { Component, OnInit } from '@angular/core';
import { WebSocketRPC } from '../websockets/webSocketRPC.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
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
    console.log("will play now");
    

     this.ws.client.send('readUserConfiguration', [null], (error, reply) => {
       if (error != null) {
          alert(error);
       } else {
          console.log("CONFIG OK READY TO PLAY",reply);
          this.ws.client.send('play', [null], (error, reply) => {
              console.log("PLAY ANSWERED",reply);
            }, this);
       }
      }, this);


  }

  stop() {
     this.ws.client.send('stop', [null], (error, reply) => {
        console.log(reply);
      }, this);
  }

}
