import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: any;
  id: any;
  empId: any;
  constructor(private aRoute: ActivatedRoute, private employeeService: EmployeeService) {
    this.aRoute.params.subscribe(param => {
      this.id = param.id;
    })

    this.aRoute.queryParams.subscribe(param => {
      this.empId = param.emp;
    })
  }

  ngOnInit(): void {

    this.employeeService.getEmployee(this.id, this.empId).get().subscribe(e => {
      let bank = JSON.parse(atob(e.data().bankDetails))
      this.employee =
      {
        employee_id: e.data().basic.employee_id,
        first_name: e.data().basic.firstname,
        last_name: e.data().basic.lastname,
        username: e.data().basic.username,
        joining_date: e.data().basic.joining_date,
        gender: e.data().basic.gender,
        avatar: e.data().basic.avatar,
        company: e.data().basic.company,
        designation: e.data().basic.designation,
        department: e.data().basic.department,
        nid: e.data().basic.nid,
        bank: {
          name: bank.bankname,
          branch: bank.branch,
          holder: bank.holder,
          acc_no: bank.acc_no,
        },

        city: e.data().address.city,
        street: e.data().address.street,
        zip: e.data().address.zip,
        state: e.data().address.state,
        email: e.data().contact.email,
        phone_number: e.data().contact.phone_number
      }
    });
  }

}
