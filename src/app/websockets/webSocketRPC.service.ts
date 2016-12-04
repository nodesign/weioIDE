import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
import * as RPC from 'json-rpc-ws/browser';

const WS_URL = 'ws://localhost:8080';


@Injectable()
export class WebSocketRPC {
	client: any;
	public connected: ReplaySubject<any> = new ReplaySubject(1);

	constructor() {
		let c = this.connected;
		this.client = RPC.createClient();
		this.client.connect(WS_URL, function connected() {
			c.next(true);
			console.log('connected to ' + WS_URL);
		});
	}

	getConnectionStatus(): Observable<any> {
		return Observable.create(o => {
			this.connected;
		});
	}

	/* EXAMPLE :
			this.client.send('mirror', ['a param', 'another param'], function mirrorReply (error, reply) {
				console.log('mirror reply', reply);
				});
	*/
} // end class WebSocketRPC