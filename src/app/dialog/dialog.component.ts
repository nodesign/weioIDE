import { Component, FactoryProvider } from '@angular/core';

import { DialogBaseComponent } from './dialog-base.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor() {
    console.log('app dialog');
  }

}
