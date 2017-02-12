import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreePipe } from './tree.pipe';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [ModalComponent]
})
export class TreeComponent implements OnInit {
  @Input('items') items: Array<any> = [];
  @Input('path') path: string = '';
  @Output() notify = new EventEmitter();

  constructor(public _modalComponent: ModalComponent) { 
    console.log('modal', this._modalComponent.show());
   }
  ngOnInit() {  }

  selectMe(fullPath) {
    this.notify.emit(fullPath);
  }

  getPath(item) {
    return this.path + "/" + new TreePipe().transform(item);
  }
}
