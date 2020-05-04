import { DepartmentService } from 'src/app/services/department/department.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-managed-jobs-home',
  templateUrl: './managed-jobs-home.component.html',
  styleUrls: ['./managed-jobs-home.component.css']
})
export class ManagedJobsHomeComponent implements OnInit {

  addJob = new FormGroup({
    job_id: new FormControl(),
    job_title: new FormControl(''),
    job_department: new FormControl(''),
    job_location: new FormControl(''),
    vaccencies: new FormControl(''),
    experience: new FormControl(''),
    age: new FormControl(''),
    salary_from: new FormControl(''),
    salary_to: new FormControl(''),
    job_type: new FormControl(''),
    job_status: new FormControl(''),
    start_date: new FormControl(''),
    expiry_date: new FormControl(''),
    description: new FormControl(''),
    applicants: new FormControl('0 candidates')
  })
  data = []
  t_headers = [
    { key: 'job_id', label: "Job Id" },
    { key: 'job_title', label: "Job Title" },
    { key: 'job_department', label: "Department" },
    { key: 'job_type', label: "Job Type" },
    { key: 'job_status', label: 'Status' },
    { key: 'applicants', label: 'Applicants' },
    { key: 'actions', label: 'Actions' }
  ]
  modalOpen: boolean = false;
  router: boolean = false;
  departments: any;
  constructor(
    private jobService: JobsService,
    private departmentService: DepartmentService,
    private location: Location,
    private route: Router) {
    this.route.events.subscribe(() => {
      if (this.location.path() === '/jobs/managed-jobs') {
        this.router = false;
      } else {
        this.router = true;
      }
    })
  }

  ngOnInit(): void {
    this.jobService.getJobs().valueChanges().subscribe(e => {
      this.data = e
    })
    this.departmentService.getDepartments().get().subscribe((e: { docs: any[]; }) => {
      this.departments = e.docs.map(e => {
        return e.data();
      })
    })
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  createJob() {
    this.addJob.value.job_id = Date.now().toString();
    this.jobService.createJob(this.addJob.value)
  }
  deleteJob(id: string) {
    this.jobService.deleteJob(id)
  }
}
