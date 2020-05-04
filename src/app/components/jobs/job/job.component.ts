import { Location } from '@angular/common';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  id: any;
  job: any;
  router; boolean;
  constructor(private location: Location, private aRoute: ActivatedRoute, private jobService: JobsService) {
    console.log(this.location.path().includes('/apply'))
    if (this.location.path().includes('/apply')) {
      this.router = true;
    } else {
      this.router = false;
    }
    this.aRoute.params.subscribe(param => {
      this.id = param.id;
    })
  }

  ngOnInit(): void {
    this.jobService.getJob(this.id).get().subscribe((e: { data: () => any }) => {
      this.job = e.data();
      console.log(this.job, "SINGLE")
    })
  }

}
