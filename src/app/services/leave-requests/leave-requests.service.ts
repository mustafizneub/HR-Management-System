import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestsService {

  allReq: any;

  constructor(private db: AngularFirestore) {
    this.allReq = this.db.collection('leave-request');
  }

  getLeaveRequests() {
    return this.allReq;
  }
  updateStatatus(status: string, id: string) {
    this.allReq.doc(id).set({ status: status }, { merge: true });
  }
}
