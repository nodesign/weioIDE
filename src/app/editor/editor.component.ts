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
  styleUrls: ['./editor.component.css'],
  providers: [EditorService]
})
export class EditorComponent {
    @ViewChild('editor') editor;
    text: string = "";


    constructor(private ed:EditorService) {
        this.ed.currentFile.subscribe( file => {
            this.text = file.data;
            this.editor.setMode(file.language);
            console.log("FILE TYPE",file.type);
            //this.editor.getSession().setMode("ace/mode/javascript");
            //console.log(this.editor.getSession);
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