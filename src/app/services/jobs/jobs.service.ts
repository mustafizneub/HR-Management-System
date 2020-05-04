import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  data = []
  allJob: any;
  constructor(private db: AngularFirestore) {
    this.allJob = this.db.collection('all-job');
  }

  getJobs() {
    return this.allJob
  }
  getJob(id: string) {
    return this.allJob.doc(id)
  }
  createJob(job) {
    this.allJob.doc(job.job_id).set(job);
  }
  updateJob(job: any, id: string) {
    this.allJob.doc(id).set(job, { merge: true })
  }
  deleteJob(id: string) {
    this.allJob.doc(id).delete();
  }
}
