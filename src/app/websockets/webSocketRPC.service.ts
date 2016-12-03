//import { Injectable } from '@angular/core';
//import { Observable, Subject } from 'rxjs/Rx';
import { OnInit } from '@angular/core';
import * as RPC from 'json-rpc-ws/browser'

const WS_URL = 'ws://localhost:8080';


//@Injectable()
export class WebSocketRPC implements OnInit {

	client:any;
	
	constructor()  {
				this.client = RPC.createClient();
		this.client.connect(WS_URL, function connected () {
			console.log("connected to " + WS_URL);
		});	
	}

	ngOnInit() {

	}
/* EXAMPLE :
		this.client.send('mirror', ['a param', 'another param'], function mirrorReply (error, reply) {
        	console.log('mirror reply', reply);
    		});
*/


} // end class WebSocketRPC
