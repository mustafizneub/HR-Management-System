import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-managed-job',
  templateUrl: './managed-job.component.html',
  styleUrls: ['./managed-job.component.css']
})
export class ManagedJobComponent implements OnInit {
  editJob: FormGroup;
  job: any;
  job_type: any;
  job_status: any;
  id: any;
  job_department: any;
  constructor(private jobService: JobsService, private aRoute: ActivatedRoute) {
    this.aRoute.params.subscribe(param => {
      this.id = param.id
    })
  }

  ngOnInit(): void {

    this.jobService.getJob(this.id).get().subscribe((e: { data: () => any; }) => {
      this.job = e.data();

      this.editJob = new FormGroup({
        job_id: new FormControl(this.job.job_id),
        job_title: new FormControl(this.job.job_title),
        job_department: new FormControl(this.job.job_department),
        job_location: new FormControl(this.job.job_location),
        vaccencies: new FormControl(this.job.vaccencies),
        experience: new FormControl(this.job.experience),
        age: new FormControl(this.job.age),
        salary_from: new FormControl(this.job.salary_from),
        salary_to: new FormControl(this.job.salary_to),
        job_type: new FormControl(this.job.job_type),
        job_status: new FormControl(this.job.job_status),
        start_date: new FormControl(this.job.start_date.split('-').reverse().join('-')),
        expiry_date: new FormControl(this.job.expiry_date.split('-').reverse().join('-')),
        description: new FormControl(this.job.description)
      })
      this.job_status = this.job.job_status;
      this.job_type = this.job.job_type;
      this.job_department = this.job.job_department;
    })
  }

  updateJob() {
    this.jobService.updateJob(this.editJob.value, this.id)
  }
}
