import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreePipe } from './tree.pipe';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  @Input('items') items: Array<any> = [];
  @Input('path') path: string = '';
  @Output() notify = new EventEmitter();

  constructor() { }
  ngOnInit() { }

  selectMe(fullPath) {
    this.notify.emit(fullPath);
  }

  getPath(item) {
    return this.path + "/" + new TreePipe().transform(item);
  }
}
