import { Injectable, EventEmitter } from '@angular/core';

export interface ModalReply {
  context: string;
  data: { };
}

@Injectable()
export class ModalService {

  public toModalComponent: EventEmitter<any> = new EventEmitter();
  public fromModalComponent: EventEmitter<ModalReply> = new EventEmitter<ModalReply>();

  constructor() { }

  loadComponent(context, component, opts) {
    let cmp = { context: context, component: component, opts: opts };
    this.toModalComponent.emit(cmp);
    return cmp;
  }

  notifyComponent(ModalReply: ModalReply) {
    this.fromModalComponent.emit(ModalReply);
  }

}


