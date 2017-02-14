import { Injectable, EventEmitter } from '@angular/core';
import { ModalReceive } from './modal.receive';

export interface ModalReply {
  context: string;
  data: { };
}

@Injectable()
export class ModalService {

  public toModalComponent: EventEmitter<any> = new EventEmitter();
  public fromModalComponent: EventEmitter<ModalReply> = new EventEmitter<ModalReply>();

  constructor() { }

  loadComponent(modalReceive: ModalReceive) {
    this.toModalComponent.emit(modalReceive);
  }

  notifyComponent(ModalReply: ModalReply) {
    this.fromModalComponent.emit(ModalReply);
  }

}


