import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebSocketService } from './websocket.service';

const WS_URL = 'ws://localhost:8080';

export interface Message {
	message: string
}

@Injectable()
export class WeioMessage {
	public messages: Subject<Message>;

	constructor(wsService: WebSocketService) {
		console.log("connecting");
		this.messages = <Subject<Message>>wsService
			.connect(WS_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					/*
					author: data.author,
					message: data.message,
					newDate : data.newDate
					*/
					message:data
				}
			});

	}
} // end class WeioMessage