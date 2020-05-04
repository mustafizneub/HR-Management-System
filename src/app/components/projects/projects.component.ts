import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectList: any;
  p: number = 1;
  collection: any[];
  searchproject: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFirestore,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {

    this.db.collection('projects').valueChanges().subscribe(object => {
      this.projectList = object;
      console.log(this.projectList);
    });
  }

  delProject(id) {


    var str = id.toString();
    this.db.collection('projects').doc(str).delete();
    console.log(str);
  }

  editProject(id) {
    this.router.navigate(['/edit-projects', id]);
  }

}
