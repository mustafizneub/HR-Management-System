import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
declare var $: any;


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectList: any;
  p: number = 1;
  collection: any[];
  searchproject: string;
  id;
  employeeId;
  employees;
  data;
  information;
  notification1:string;
  notification2:boolean;
  constructor(
    public router: Router,
    public ngZone: NgZone,
    private afs: AngularFirestore,


  ) { }

  ngOnInit() {
    $('.ui .dropdown').dropdown('show');

    this.afs.collection('projects').snapshotChanges().subscribe(object => {
      this.projectList = object.map(e => {
        return ({
          id: e.payload.doc.id,
          data: e.payload.doc.data()
        })
      })
    });
  }

  delProject(id) {
    this.id = id;
  }

  delete() {
    this.afs.collection('projects').doc(this.id).delete()
  }

  editProject(id) {
    this.router.navigate(['/edit-projects', id]);
  }

  assignEmployee(id) {
    this.id = id;
    let result = this.afs.collection('projects').doc(id).valueChanges()
      .subscribe(x => {
        this.information = x;
      })

    if (result) {
      this.afs.collection('registered-table', ref => ref.where('employee_status', '==', 'active'))
        .snapshotChanges().subscribe(x => {
          this.employees = x.map(e => {
            return ({
              id: e.payload.doc.id,
              data: e.payload.doc.data()
            })
          })

          if (this.information.assigned_employees && this.information.assigned_employees.length>0) {
            let newArray = []
            for (let i = 0; i < this.employees.length; i++) {
              let flag = 0;
              for (let j = 0; j < this.information.assigned_employees.length; j++) {
                if (this.employees[i].data.basic.employee_id == this.information.assigned_employees[j].empId) {
                  flag = 0;
                  break;
                }
                else {
                  flag = 1;
                }
              }
              if (flag == 1) { newArray.push(this.employees[i]) }
            }
            this.employees = newArray
          }
        })
    }

  }


  //************** */

  getUpdateArray() {
    let newArray = []
    for (let i = 0; i < this.employees.length; i++) {
      let flag = 0;
      for (let j = 0; j < this.information.assigned_employees.length; j++) {
        if (this.employees[i].data.basic.employee_id === this.information.assigned_employees[j].empId) {
          flag = 0;
          break;
        }
        else {
          flag = 1;
        }
      }
      if (flag == 1) { newArray.push(this.employees[i]) }
    }
    return newArray
  }

  save() {
    let id = this.employeeId
    this.afs.collection('registered-table').doc(id).valueChanges()
      .subscribe(x => {
        this.data = x;
        const info = {
          designation: this.data.basic.designation,
          empId: this.data.basic.employee_id,
          employee: this.data.basic.firstname + ' ' + this.data.basic.lastname,
          fStoreId:this.data.fStoreId
        }
        const data = []
        if (this.information.assigned_employees) {
          for (let i = 0; i < this.information.assigned_employees.length; i++) {
            data.push(this.information.assigned_employees[i])
          }
        }
        data.push(info)
        this.afs.collection('projects').doc(this.id).set({
          assigned_employees: data
        }, { merge: true }).then(x => {
          document.getElementById('save').setAttribute('disabled', 'true')
          this.employees = this.getUpdateArray();
          this.notification1 = 'Successfully Added.';
          this.notification2 = false;
          setTimeout(() => {
            this.notification1 = null;
          }, 2000);
        })
      })

  }

  remove(index, id) {
    let result = confirm('Are you want to remove?');
    if (result) {
      this.information.assigned_employees.splice(index, 1);
      this.notification2=true;
      this.notification1 = 'Successfully Deleted.'
          setTimeout(() => {
            this.notification1 = null;
          }, 2000);
      this.afs.collection('projects').doc(this.id).update({
        assigned_employees: this.information.assigned_employees
      }).then(x => {
        this.afs.collection('registered-table', ref => ref.where('basic.employee_id', '==', id))
          .snapshotChanges().subscribe(x => {
            x.map(e => {
              let data = {
                id: e.payload.doc.id,
                data: e.payload.doc.data()
              }
              this.employees.push(data)
            })

          })
      })
    }

  }

  getValue(event) {
    if(event.target.value){
      document.getElementById('save').removeAttribute('disabled');
    }
    
  }

  ///////////////////////

}
