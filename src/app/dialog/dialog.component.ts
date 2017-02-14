import { Component, Output, EventEmitter } from '@angular/core';
import { DialogBaseComponent } from './dialog-base.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Output('callback') callback = new EventEmitter();

  constructor() {
    console.log('app dialog');
  }

  clicked() {
    console.log('clicked', this.callback);
    this.callback.emit({ cliked: 'clicked' });
  }
}
