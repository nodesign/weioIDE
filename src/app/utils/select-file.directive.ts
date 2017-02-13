import { Directive, Input, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appSelectFile]'
})
export class SelectFileDirective {
  @Input('appSelectFile') appSelectFile: string;
  @Output('fileContent') fileContent: string;

  @HostListener('change') onChange() {
    let f = new FileReader();
    f.onload = (e: any) => {
      console.log('file', e.target.result);
    };
    f.readAsText(this.el.nativeElement.files[0]);
    console.log('changed');
  }
  constructor(private el: ElementRef) {
    console.log();
  }

}
