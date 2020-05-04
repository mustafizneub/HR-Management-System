import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LeaveRequestsService } from 'src/app/services/leave-requests/leave-requests.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-leave-requests-home',
  templateUrl: './leave-requests-home.component.html',
  styleUrls: ['./leave-requests-home.component.css']
})
export class LeaveRequestsHomeComponent implements OnInit {
  closeResult = '';
  data: any;
  p: number = 1;
  collection: any[];
  modalOpen:boolean=false;
  constructor(private leaveReqService: LeaveRequestsService, private employeeService: EmployeeService, private db: AngularFirestore) {

  }

  ngOnInit(): void {

    this.leaveReqService.getLeaveRequests().get().subscribe(e => {
      this.data = e.docs.map(e => {
        return e.data()
      })
      console.log(this.data);
    });
  }

  filteredData($event) {

  }
  action(id) {
    this.modalOpen=true;
  }
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

  


}
