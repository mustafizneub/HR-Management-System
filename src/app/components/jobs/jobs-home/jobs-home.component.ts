import { Location } from '@angular/common';
import { JobsService } from 'src/app//services/jobs/jobs.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-home',
  templateUrl: './jobs-home.component.html',
  styleUrls: ['./jobs-home.component.css']
})
export class JobsHomeComponent implements OnInit {

  @Output() jobs = new EventEmitter();
  router: boolean;

  constructor(private location: Location, private route: Router, private jobService: JobsService) {
    this.route.events.subscribe(() => {
      if (this.location.path() === '/all-jobs') {
        this.router = false;
      }
      else {
        this.router = true;
      }
    })
  }

  ngOnInit(): void {
    this.jobService.getJobs().get().subscribe((e) => {
      this.jobs = e.docs.map((job) => {
        return job.data();
      })

    })
  }

}
