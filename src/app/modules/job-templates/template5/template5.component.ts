import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TemplateServiceService } from '../../../services/job-services/template-service.service';

@Component({
  selector: 'app-template5',
  templateUrl: './template5.component.html',
  styleUrls: ['./template5.component.css']
})
export class Template5Component implements OnInit {

  information;
  x;

  constructor(private route: ActivatedRoute,
    private db: AngularFirestore,
    private service: TemplateServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.x = param.id;
      this.db.collection('/profile').doc(param.id).valueChanges().subscribe(e => {
        this.information = e;
        console.log(this.information)
      })

    })

  }

  view() {
    this.router.navigate(['/admin/admin-view']);
  }

  download() {
    let content = document.getElementById('cv');
    this.service.convertToPDF(content, this.information.basicInfo.name)
  }



}
