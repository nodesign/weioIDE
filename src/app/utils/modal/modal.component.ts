import {
  Component, OnInit, Input, EventEmitter, ComponentRef,
  ViewContainerRef, ComponentFactoryResolver, ViewChild,
  HostBinding
} from '@angular/core';

import { ModalService } from './modal.service';
import { ModalAnimation } from './modal.animations';
import { ModalReceive } from './modal.receive';

@Component({
  selector: 'app-modal',
  template: `<div class="modal-container" [@showModal]="visible">
    <a class="close-btn" (click)="closeMe($event)">X</a>
    <div class="header">
      {{title}}
    </div>
    <div class="body">
      <div #target></div>
    </div>
  </div>`,
  styleUrls: ['./modal.component.scss'],
  animations: ModalAnimation
})
export class ModalComponent implements OnInit {

  public componentRef: ComponentRef<any>;
  public serviceListener: EventEmitter<any>;
  public _CONTEXT_: string;

  @Input('title') title: String = '';
  @Input('value') value: string;
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
  @HostBinding('class.hidden') hiddenClass = true;

  public visible: string = 'visible';

  constructor(private compiler: ComponentFactoryResolver, private modalService: ModalService) { }

  renderComponent(modalReceive: ModalReceive) {
    this._CONTEXT_ = modalReceive.context;
    this.title = modalReceive.data.title;

    let childComponent = modalReceive.component;
    let ComponentFactory = this.compiler.resolveComponentFactory(childComponent);
    this.componentRef = this.target.createComponent(ComponentFactory);

    if (this.componentRef) {
      this.componentRef.instance.value = this.value;
      // Subscribe to component callback
      this.componentRef.instance.callback.subscribe(callbackData => {
        this.sendCallBackToService(callbackData);
        this.closeModal();
      });
      this.openModal();
    }
  }

  ngOnInit() {
    // subscribe
    this.modalService.toModalComponent.subscribe((data) => {
      this.renderComponent(data);
    });
  }

  // Send data to service 
  sendCallBackToService(data) {
    this.modalService.notifyComponent({ context: this._CONTEXT_, data: data });
  }

  openModal() {
    this.hiddenClass = false;
    this.visible = 'visible';
  }

  closeModal() {
    this.hiddenClass = true;
    this.visible = 'hidden';
  }

  closeMe(event) {
    this.closeModal();
    this.modalService.notifyComponent({ context: this._CONTEXT_, data: false });
  }
}
