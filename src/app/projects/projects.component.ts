import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {

  projectsList: Array<Object>;

  constructor(projects: ProjectsService) {
    projects.getProjectsList().subscribe(
      data => { this.projectsList = JSON.parse(data._body); console.log(this.projectsList); },
      err => { console.log('error receiving projects', err); }
    );
  };

  ngOnInit() {
  }

  checkItem(item) {
    console.log(typeof item.children);
    return false;
  }

}
