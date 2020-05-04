import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../job-services/auth.service';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.css']
})
export class Template2Component implements OnInit {

  information;
  x;
 

  constructor(private db: AngularFirestore, 
    private route: ActivatedRoute, 
    private service:AuthenticateService,
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

   download() {
    let content = document.getElementById('cv');
    this.service.convetToPDF(content, this.information.basicInfo.name)
  }

}
