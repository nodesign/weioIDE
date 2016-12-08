import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  template: `<div class="projects-p">
  <app-tree [items]="projectsList" [path]="''" (notify)="itemSelected($event)"></app-tree>
</div>`,
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectsList: Array<Object> = [];
  projectItemsList: Array<Object> = [];

  choosingProject: boolean = false;

  constructor(private projects: ProjectsService) {

  };

  ngOnInit() {
  }

  // We subscribe to any variable change, so we can update as soon as something has changed
  subscribeToVars() {
    this.subscribeToProjectsChange();
    this.subscribeToProjectItemsChange();
  }

  // Subscribe to project change
  subscribeToProjectsChange() {
    this.projects.projectsTree.subscribe(
      data => {
        this.projectsList = JSON.parse(data);
      },
      err => { console.log('error receiving projects', err); }
    );
  }

  // Subscribe to project item change
  subscribeToProjectItemsChange() {
    /*this.projects.fileTree.subscribe(
      data => {
        this.projectItemsList = JSON.parse(data);
      },
      err => { console.log('error receiving project items', err); }
    );*/
  }

  /**
   * Get list of projects
   */
  getProjects() {
      
  }

  /**
   * Get files from projects list
   */
  getProjectItems() {

  }

  itemSelected(item) {
    this.projects.selectFile(item);
    console.log(item);
  }


}
