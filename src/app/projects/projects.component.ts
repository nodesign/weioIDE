import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
//import { TreeComponent } from '../utils/tree/tree.component';

@Component({
  selector: 'app-projects',
  template: `<div class="projects-p">
  <app-tree [items]="projectsList" [path]="''" (notify)="itemSelected($event)"></app-tree>
</div>`,
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {

  projectsList: Array<Object> = [];

 constructor(projects: ProjectsService) {
    projects.fileTree.subscribe(
      data => {
        console.log(data);
        this.projectsList = JSON.parse(data); console.log(this.projectsList); 
      },
      err => { console.log('error receiving projects', err); }
    );
  };
  

  ngOnInit() {
  }

  itemSelected(item){
    console.log(item);
  }


}
