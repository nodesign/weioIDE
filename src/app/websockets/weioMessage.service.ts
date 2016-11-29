import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebSocketService } from './websocket.service';

const WS_URL = 'ws://localhost:8000';

export interface Message {
	jsonrpc: string,
	error: string,
	result: any,
	id: string
}

@Injectable()
export class WeioMessage {
	public messages: Subject<Message>;
	
	constructor(wsService: WebSocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(WS_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				console.log(data);
				return {
					jsonrpc: data.jsonrpc,
					result: data.result,
					error: data.error,
					id : data.id
				}
			});
	}

	// helper function to make writing rpc messages simpler, 
	// it only needs name of the method and it's parameters
	// other RPC arguments will be automaticaly filled in here
     getMsg(method:string, params:any, id:string) {
	    var msgOut = {
			"jsonrpc":"2.0",
			"method": method,
			"params": params,
			"id": id
	 };
		return msgOut;	
	}

} // end class WeioMessage
