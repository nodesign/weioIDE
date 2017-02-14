import {
  Component, OnInit, Input, Output, EventEmitter, ComponentRef,
  ViewContainerRef, ComponentFactoryResolver, ViewChild,
  HostBinding
} from '@angular/core';

import { ModalService } from './modal.service';
import { ModalAnimation } from './modal.animations';

@Component({
  selector: 'app-modal',
  template: `<div class="modal-container" [@showModal]="visible">
  <a class="close-btn" (click)="closeMe($event)">X</a>
  <div class="header">
    {{title}}
  </div>
  <div class="body">
    {{text}}
    <div #target></div>
    <input type="file" [appSelectFile] />
  </div>
  <div class="footer">
    <div class="buttons">
      <a class="btn save">Save</a>
      <a class="btn cancel">Cancel</a>
    </div>
  </div>
</div>`,
  styleUrls: ['./modal.component.scss'],
  animations: ModalAnimation
})
export class ModalComponent implements OnInit {

  @Input('title') title: String = '';
  @Input('value') value: string;

  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
  public componentRef: ComponentRef<any>;
  public serviceListener: EventEmitter<any>;
  public _CONTEXT_: string;
  @Output('modalDisplay') modalDisplay: string = 'block';

  @HostBinding('class.hidden') hiddenClass = true;

  public visible: string = 'hidden';

  constructor(private compiler: ComponentFactoryResolver,
  private modalService: ModalService) {

  }

  renderComponent(data) {
    this._CONTEXT_ = data.context;
    let childComponent = data.component;
    let ComponentFactory = this.compiler.resolveComponentFactory(childComponent);
    this.componentRef = this.target.createComponent(ComponentFactory);

    if (this.componentRef) {
      this.componentRef.instance.value = this.value;
      // Subscribe to component callback
      this.componentRef.instance.callback.subscribe(callbackData => {
        this.sendCallBackToService(callbackData);
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
  }

  closeMe(event) {
    this.closeModal();
    this.modalService.notifyComponent({ context: this._CONTEXT_, data: false });
  }
}
