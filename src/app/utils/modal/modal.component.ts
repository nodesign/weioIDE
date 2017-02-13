import {
  Component, OnInit, Input, Output, EventEmitter, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ViewChild
} from '@angular/core';

import { ModalService } from './modal.service';
import { DialogComponent } from '../../dialog/dialog.component';

const _MODAL_ = ModalComponent;

@Component({
  selector: 'app-modal',
  template: `<div class="modal">
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
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input('title') title: String = '';
  @Input('buttons') buttons: boolean = false;
  @Input('text') text: String = '';
  @Input('value') value: string;
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
  public componentRef: ComponentRef<any>;
  public serviceListener: EventEmitter<any>;
  public _CONTEXT_: string;

  constructor(private compiler: ComponentFactoryResolver, private modalService: ModalService) {

  }

  // On receive order
  orderReceived(data) {
    console.log('order received', data, this, parent);
    //this.renderComponent(data.component);
  }

  renderComponent(data) {
    this._CONTEXT_ = data.context;
    let childComponent = data.component;
    let ComponentFactory = this.compiler.resolveComponentFactory(childComponent);
    this.componentRef = this.target.createComponent(ComponentFactory);
    if (this.componentRef) {
      this.componentRef.instance.value = this.value;
    }
  }

  ngOnInit() {
    let _self = this;

    // subscribe
    this.modalService.toModalComponent.subscribe((data) => {
      console.log('FROM SUBSCRIBE!!!!!!!!!!!!', );
      this.renderComponent(data);
    });
  }

  show() {
    console.log('SHOW ME');
  }
}
