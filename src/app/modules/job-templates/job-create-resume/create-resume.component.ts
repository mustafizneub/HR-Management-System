import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {

  title = 'resume-creator';



  constructor(private router: Router, private route: ActivatedRoute) {


  }
  ngOnInit(): void {

  }




  GoSecond() {
    this.router.navigate(['/templates/template1-create']);
  }

  GoThird() {
    this.router.navigate(['/templates/template2-create']);
  }
  GoFourth() {
    this.router.navigate(['/templates/template3-create']);
  }

  GoFifth() {
    this.router.navigate(['/templates/template4-create']);
  }

  GoSixth() {
    this.router.navigate(['/templates/template5-create']);
  }

  GoSeven() {
    this.router.navigate(['/templates/template6-create']);
  }


}
