
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DesignationService } from 'src/app/services/designation/designation.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import * as FormValidators from '../form-validation';

import * as firebase from 'firebase/app';
import "firebase/firestore";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  departments: any;
  designations: any;
  des: string;
  add_employee: FormGroup;
  file: any;

  creating: boolean = false;
  basic: boolean = true;
  bank: boolean = false;
  address: boolean = false;
  contact: boolean = false;
  employeeCreated: boolean = false;
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private route: Router,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    let randmonID = this.employeeService.getTotalEmployees() + 1;
    let id;

    if (randmonID == NaN) {

      id = 'YT-101'
    }
    else if (randmonID <= 9) {
      id = 'YT-10' + randmonID.toString()
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

  async addEmployee() {
    this.add_employee.value.basic.avatar = this.file

    // ENCRYPT BANK DATA
    this.add_employee.value.bankDetails = window.btoa(JSON.stringify(this.add_employee.value.bankDetails))

    try {
      this.creating = true;
      let employee = this.add_employee.value;

      // FIRST UPLOAD USER IMAGE
      let imageUploaded = await this.employeeService.uploadImage(this.add_employee.value).toPromise();
      employee.basic.avatar = imageUploaded['secure_url'];

      // REGISTER USER
      let createUserWithCredentials = await this.employeeService.createUserWithEmailAndPass(employee);

      // CREATE USER DB
      let createEmployee = await this.employeeService.create(employee);

      // INC NO. OF EMPLOYEE
      let increment = await this.db
        .collection('registered-table')
        .doc('total-employees')
        .update({ 'total-employee': firebase.firestore.FieldValue.increment(1) })


      // UPDATE EMPLOYEE WITH FIREBASE ID
      employee.fStoreId = createEmployee.id;
      let updateEmployee = this.employeeService.updateEmployee(employee, createEmployee.id)
      this.creating = false;
      this.employeeCreated = true;
      setTimeout(() => {
        this.employeeCreated = true;
        this.route.navigate(['/employees/all-employee']);
      }, 2000)

    } catch (err) {

      if (err['error']) {
        this.errorMessage = 'Please Provide valid image'
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000)
        this.creating = false;

      } else if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = 'An user already registered with this email'
        this.creating = false;
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000)

      } else {
        this.errorMessage = 'Something went wrong'
        this.creating = false;
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000)
      }

    }

  }

  fiterDesignation(event: { target: { value: any } }) {
    this.des = this.designations.filter((e: { dname: string; }) => e.dname.toLowerCase() === event.target.value.toLowerCase())
  }


  // NEXT & PREV //
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
