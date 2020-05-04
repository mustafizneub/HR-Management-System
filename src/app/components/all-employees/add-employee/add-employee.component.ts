import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DesignationService } from 'src/app/services/designation/designation.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import * as FormValidators from '../form-validation';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  departments: any;
  designations: any;
  des: any;
  response: string;
  add_employee: FormGroup;
  file: any;
  creating: boolean = false;
  basic: boolean = true;
  bank: boolean = false;
  address: boolean = false;
  contact: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private route: Router
  ) { }

  ngOnInit(): void {
    let randmonID = this.employeeService.getTotalEmployees() + 1;
    let id;
    if (randmonID <= 9) {
      id = 'YT-10' + randmonID.toString()
      console.log(id)
    } else if (randmonID <= 99) {
      id = 'YT-1' + randmonID.toString()
    } else {
      id = 'YT-' + (randmonID + 100).toString()
    }

    this.add_employee = new FormGroup({
      basic: new FormGroup({
        firstname: FormValidators.validateField('', 3, 20),
        lastname: FormValidators.validateField('', 3, 20),
        username: FormValidators.validateField('', 3, 20),
        employee_id: new FormControl(id),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))
        ]),
        joining_date: new FormControl('', [
          Validators.required
        ]),
        company: FormValidators.validateField('', 3, 50),
        department: FormValidators.validateRequire(''),
        designation: FormValidators.validateRequire(''),
        gender: FormValidators.validateRequire(''),
        nid: FormValidators.validateNumbers('', 10, 10),
        avatar: new FormControl(''),
        employee_status: new FormControl('active')
      }),
      bankDetails: new FormGroup({
        bankname: FormValidators.validateField('', 5, 30),
        branch: FormValidators.validateField('', 5, 30),
        holder: FormValidators.validateField('', 3, 20),
        acc_no: FormValidators.validateNumbers('', 13, 13)
      }),
      address: new FormGroup({
        street: FormValidators.validateAddress('', 3, 30),
        city: FormValidators.validateAddress('', 3, 30),
        state: FormValidators.validateAddress('', 3, 30),
        zip: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]+')
        ])
      }),
      contact: new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        phone_number: new FormControl('', [
          Validators.required
        ])
      }),
      employee_status: new FormControl('active')
    })

    this.departmentService.getDepartments().get().subscribe((dep: { docs: { data: () => any; }[]; }) => {
      this.departments = dep.docs.map((e: { data: () => any; }) => e.data())
    })
    this.designationService.getdesignations().get().subscribe((des: { docs: { data: () => any; }[]; }) => {
      this.designations = des.docs.map(e => {
        return e.data();
      })
    })
  }

  uploadImage(event: { target: { files: any[]; }; }) {
    this.file = event.target.files[0]
  }
  addEmployee() {
    this.add_employee.value.basic.avatar = this.file
    this.employeeService.create(this.add_employee.value);
    setTimeout(() => {
      this.creating = true;
    }, 0)

    setTimeout(() => {
      document.querySelector('#addedText').innerHTML = "Employee Added"
    }, 3000)
    setTimeout(() => {
      this.creating = false;
    }, 3500)
    setTimeout(() => {
      this.route.navigate(['employees/all-employee'])
    }, 4000)

  }
  fiterDesignation(event: { target: { value: any } }) {
    this.des = this.designations.filter((e: { dname: string; }) => e.dname.toLowerCase() === event.target.value.toLowerCase())
  }

  basicToggle() {
    this.basic = !this.basic
    this.bank = !this.bank;
  }
  bankNext() {
    this.bank = !this.bank;
    this.address = !this.address
  }
  bankPrev() {
    this.basic = !this.basic;
    this.bank = !this.bank;
  }
  addressPrev() {
    this.bank = !this.bank;
    this.address = !this.address
  }
  addressNext() {
    this.address = !this.address
    this.contact = !this.contact
  }
  contactToggle() {
    this.address = !this.address
    this.contact = !this.contact
  }
}
