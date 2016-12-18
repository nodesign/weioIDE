//add "AceEditorComponent" to your modules list
import {Component, ViewChild} from '@angular/core';
import { EditorService } from './editor.service'
import { ProjectsService } from '../projects/projects.service'
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';


//to use theme eclipse
//with angular-cli add "../node_modules/ace-builds/src-min/ace.js" 
//and "../node_modules/ace-builds/src-min/theme-eclipse.js" to "scripts" var into the file angular-cli.json

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [EditorService]
})
export class EditorComponent {
    @ViewChild('editor') editor;
    // use getter and setter functions to set content
    text: string = "";
    filename: string = "unsaved";


    constructor(private ed:EditorService) {
        this.ed.currentFile.subscribe( file => {
            // save current file before replace it
            console.log("save to",this.ed.p_filename);
            this.ed.saveFile(this.ed.p_filename, this.editor.getEditor().getValue());
            
            // this is a good way to update content of ace editor
            this.filename = file.label;
            this.editor.getEditor().setValue(file.data);
            this.editor.setMode(file.language);
        })
    }

    ngAfterViewInit() {
        // you have to import all you will need in angular-cli.json
        // language support, themes, ... etc...
        this.editor.setTheme("xcode");
        

        this.editor.getEditor().setOptions({
            enableBasicAutocompletion: true,
        });


        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {
                
            }
        })
    }
}