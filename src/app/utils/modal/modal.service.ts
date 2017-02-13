import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {

  public toModalComponent: EventEmitter<any> = new EventEmitter();
  public fromModalComponent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  loadComponent(context, component, opts) {
    let cmp = { context: context, component: component, opts: opts };
    this.toModalComponent.emit(cmp);
    return cmp;
  }

  notifyComponent(context, data) {
    this.fromModalComponent.emit({ context, data });
  }

}
