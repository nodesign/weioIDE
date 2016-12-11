import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectsList: Array<Object> = [];
  projectItemsList: Array<Object> = [];

  choosingProject: boolean = false;


  constructor(private projects: ProjectsService) {
    this.subscribeToVars();
  };

  ngOnInit() {
  }

  // We subscribe to any variable change, so we can update as soon as something has changed
  subscribeToVars() {
    this.subscribeToProjectsChange();
    this.subscribeToProjectItemsChange();
  }

  // GET PROJECTS
  subscribeToProjectsChange() {
    this.projects.projectsTree.subscribe(
      data => {
        this.projectsList = JSON.parse(data);
        console.log("PROJECTS", this.projectsList);
        

      },
      err => { console.log('error receiving projects', err); }
    );
  }
  
  // PROJECT SELECTION
  projectItemSelected(item) {
    console.log("PROJECT SELECTED ", item);
    this.projects.getProjectItemsList(item);
    
  }


  // GET PROJECT FILES
  subscribeToProjectItemsChange() {
    this.projects.projectItemsTree.subscribe(
      data => {
        var out = [];
        this.projectItemsList = JSON.parse(data);
        console.log("GOT FILE LIST", this.projectItemsList);
      },
      err => { console.log('error receiving project items', err); }
    );
  }

 // INSIDE PROJECT SELECTION
 projectFileItemSelected(item) {
    this.projects.selectFile(item);
    console.log(item);
  }


}
