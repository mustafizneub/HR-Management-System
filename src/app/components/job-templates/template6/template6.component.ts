import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../job-services/auth.service';

@Component({
  selector: 'app-template6',
  templateUrl: './template6.component.html',
  styleUrls: ['./template6.component.css']
})
export class Template6Component implements OnInit {

  information;
  x;

  constructor(private route:ActivatedRoute,
    private db:AngularFirestore, 
    private service: AuthenticateService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.x = param.id;
      this.db.collection('/profile').doc(param.id).valueChanges().subscribe(e => {
        this.information = e;
      })

    })
  }

  view(){
    this.router.navigate(['/admin-view']);
  }

  download(){
    let content = document.getElementById('cv');
    this.service.convetToPDF(content,this.information.basicInfo.name)
  }


}
