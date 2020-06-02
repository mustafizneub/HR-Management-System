
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { DesignationService } from 'src/app/services/designation/designation.service';
import { DepartmentService } from 'src/app/services/department/department.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as FormValidators from '../form-validation'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id: string;
  name: string;
  date: string;
  gender: string;
  avatar: string;
  designation: string;

  data: any;
  department: any;
  departments: any;
  designations: any;
  filteredDesignation: any;

  des_null: boolean = false;
  updating: boolean = false;

  edit_employee: FormGroup;
  @Output() routeChanged = new EventEmitter();
  empId: any;
  errorMessage: string = '';
  updatingEmployee: boolean = false;
  employeeUpdated: boolean = false;

  constructor(
    private db: AngularFirestore,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private aRoute: ActivatedRoute,
    private route: Router) {

  }

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(param => {
      this.empId = param.emp;
    })
    this.aRoute.params.subscribe(param => {

      this.id = param.id;
      this.employeeService.getEmployee(this.id, this.empId).get().subscribe((e: { data: () => any; }) => {
        this.data = e.data();

        // DECRYPT BANK DATA //
        this.data.bankDetails = JSON.parse(window.atob(this.data.bankDetails));

        // console.log(JSON.parse(window.atob("eyJiYW5rbmFtZSI6IlN0YW5kYXJkIEJhbmsiLCJicmFuY2giOiJKYWlsIFJvYWQiLCJob2xkZXIiOiJKYXNvbiBNb21vYSIsImFjY19ubyI6IjA5ODc2NTQzMjEyMzQifQ==")))
        this.edit_employee = new FormGroup({
          basic: new FormGroup({
            firstname: FormValidators.validateField(this.data.basic.firstname, 3, 20),
            lastname: FormValidators.validateField(this.data.basic.lastname, 3, 20),
            username: FormValidators.validateField(this.data.basic.username, 3, 20),
            employee_id: new FormControl(this.data.basic.employee_id),

            gender: FormValidators.validateRequire(this.data.basic.gender),
            nid: FormValidators.validateNumbers(this.data.basic.nid, 10, 10),
            avatar: new FormControl(this.data.basic.avatar),
            prev_avatar: new FormControl(this.data.basic.avatar),

            company: FormValidators.validateField(this.data.basic.company, 3, 50),
            department: new FormControl(this.data.basic.department, [
              Validators.required
            ]),

            designation: new FormControl(this.data.basic.designation, [
              Validators.required
            ]),

            joining_date: new FormControl(this.data.basic.joining_date, [
              Validators.required
            ]),

            password: new FormControl(this.data.basic.password, [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(32),
              Validators.pattern(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))
            ]),
          }),

          bankDetails: new FormGroup({
            bankname: FormValidators.validateField(this.data.bankDetails.bankname, 5, 30),
            branch: FormValidators.validateField(this.data.bankDetails.branch, 5, 30),
            holder: FormValidators.validateField(this.data.bankDetails.holder, 3, 20),
            acc_no: FormValidators.validateNumbers(this.data.bankDetails.acc_no, 13, 13)
          }),

          address: new FormGroup({
            street: FormValidators.validateAddress(this.data.address.street, 3, 30),
            city: FormValidators.validateAddress(this.data.address.city, 3, 30),
            state: FormValidators.validateAddress(this.data.address.state, 3, 30),
            zip: new FormControl(this.data.address.zip, [
              Validators.required,
              Validators.pattern('[0-9]+')
            ])
          }),
          contact: new FormGroup({
            email: new FormControl(this.data.contact.email, [
              Validators.required,
              Validators.email
            ]),
            phone_number: new FormControl(this.data.contact.phone_number, [
              Validators.required
            ])
          })
        })

        this.gender = this.data.basic.gender;
        this.designation = this.data.basic['designation'];
        this.department = this.data.basic['department'];
        this.avatar = this.data.basic['avatar'];
        this.departmentService.getDepartments().get().subscribe((e: { docs: any[]; }) => {
          this.departments = e.docs.map(e => {
            return e.data();
          })
        })
        this.designationService.getdesignations().get().subscribe((e: { docs: any[]; }) => {
          this.designations = e.docs.map(e => {
            return e.data();
          })
          this.filteredDesignation = this.designations.filter((e: { dname: any; }) => e.dname === this.department)
        })
      });

    })
  }

  uploadImage(event: { target: { files: any[]; }; }) {
    this.edit_employee.controls.basic.value.avatar = event.target.files[0];
  }

  async updateEmployee() {
    try {
      this.updatingEmployee = true;
      if (!this.edit_employee.controls.basic.value.designation) {
        this.edit_employee.controls.basic.value.designation = this.designation
      }

      // ENCRYPT BANK


      this.edit_employee.value.bankDetails = btoa(JSON.stringify(this.edit_employee.value.bankDetails));

      let updatedEmployee = this.edit_employee.value;
      if (updatedEmployee.basic.avatar != updatedEmployee.basic.prev_avatar) {
        let uploadImage = await this.employeeService.uploadImage(updatedEmployee).toPromise();
        updatedEmployee.basic.avatar = uploadImage['secure_url'];
        await this.employeeService.updateEmployee(updatedEmployee, this.id)

      } else {
        await this.employeeService.updateEmployee(updatedEmployee, this.id)
      }

      this.updatingEmployee = false;
      this.employeeUpdated = true;

      setTimeout(() => {
        this.employeeUpdated = false;
      }, 2000)

    } catch (err) {
      if (err['error']) {
        this.errorMessage = 'Please Provide valid image'
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000)
        this.updatingEmployee = false;
      } else {
        this.errorMessage = 'Problem arise while updating employee!'
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000)
        this.updatingEmployee = false;
      }
    }

  }



  filterDesignation(event: { target: { value: any; }; }) {
    if (event.target.value != this.department) {
      this.edit_employee.controls.basic.get('designation').setErrors({ required: true })
    }
    else {
      this.edit_employee.controls.basic.get('designation').reset(this.designation)
    }
    this.filteredDesignation = this.designations.filter(e => {
      return e.dname === event.target.value
    })
    this.des_null = true;
  }

}
