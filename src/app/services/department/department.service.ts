import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  data = [];
  allDep: any;

  constructor(private db: AngularFirestore) {
    this.allDep = this.db.collection('departments');
  }

  getDepartments() {
    return this.allDep;
  }


  getDepartment(id: string) {
    return this.allDep.doc(id);
  }

  addDepartment(department: { id: string; dep_name: string; }) {
    this.db.collection('departments').doc(department.id).set(department);
  }

  updateDepartment(department: string, id: string) {
    this.db.collection('departments').doc(id).set(department, { merge: true });
  }

  deleteDepartment(id: string) {
    this.db.collection('departments').doc(id).delete()
  }

}
