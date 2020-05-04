import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference } from '@angular/fire/storage'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  post: any;
  uploadPercentage: String;
  fileRef: AngularFireStorageReference;
  data;
  allEmployeeDb;
  employees: number;

  async deleteImage() {
    // await this.aFireStorage.storage
    //   .refFromURL(url)
    //   .delete().then(() => {
    //    true;
    //   })
    // return false;
  }

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private aFAuth: AngularFireAuth
  ) {
    this.db.collection('registered-table').doc('total-employees').get().subscribe(e => {
      this.employees = e.data().total_employee;
      console.log(this.employees)
    })
    this.allEmployeeDb = this.db.collection('all-employee', ref => ref.where('basic.employee_status', '==', 'active'))
  }

  getTotalEmployees() {
    return this.employees
  }

  getEmployees() {
    // return this.db.collection('registered-table')
    return this.db.collection('registered-table', ref => ref.where('basic.employee_status', '==', 'active'));
  }

  getEmployee(id: string) {
    return this.db.collection('registered-table').doc(id)
  }

  getEmployeeById(id: string) {
    console.log(id)
    return this.db.collection('registered-table', ref => ref.where('basic.employee_id', '==', id));
  }

  create(employee: any) {

    let formData = new FormData();
    formData.append('file', employee.basic.avatar);
    formData.append('upload_preset', 'wjwrg6om');
    return this.http.post('https://api.cloudinary.com/v1_1/mihrab-miah/upload/', formData).subscribe(res => {
      if (res['secure_url']) {
        employee.basic.avatar = res['secure_url'];
        this.aFAuth.createUserWithEmailAndPassword(employee.contact.email.trim(), employee.basic.password.trim())
          .then(() => {
            // this.db.collection('all-employee').doc(employee.basic.employee_id).set(employee);
            this.db.collection('registered-table').add(employee);
            this.db.collection('registered-table').doc('total-employees').set({ total_employee: this.employees + 1 }, { merge: true })
          }).then(() => {
            this.db.collection('registered-table', ref => ref.where('contact.email', '==', employee.contact.email)).snapshotChanges().subscribe(e => {
              let data = e.map(dt => {
                return ({
                  id: dt.payload.doc.id,
                  data: dt.payload.doc.data()
                })
              })
              this.db.collection('registered-table').doc(data[0].id).set({ fStoreId: data[0].id }, { merge: true }).then(() => {
                console.log('Updated');
              }).catch(err => {
                console.log(err, 'ERROR')
              })
            })
          })
      }
    });


  }

  updateEmployee(employee: any, id: string) {
    if (employee.basic.avatar != employee.basic.prev_avatar) {
      let formData = new FormData();
      formData.append('file', employee.basic.avatar);
      formData.append('upload_preset', 'wjwrg6om');

      this.http.post('https://api.cloudinary.com/v1_1/mihrab-miah/upload/', formData).subscribe(res => {
        if (res['secure_url']) {
          employee.basic.avatar = res['secure_url'];
          this.db.collection('registered-table').doc(id).set(employee, { merge: true })
        } else {
          console.log("Unsuccessfull");
        }
      })
    }
    else {
      this.db.collection('registered-table').doc(id).set(employee, { merge: true });
    }
  }

  deleteEmployee(id: string) {
    return this.db.collection('registered-table').doc(id).set({ basic: { employee_status: 'inactive' } }, { merge: true });
  }

}
