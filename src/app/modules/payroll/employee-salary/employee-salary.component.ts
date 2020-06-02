import { Router } from '@angular/router';
import { combineLatest } from 'rxjs'
import { SalaryService } from 'src/app/services/salary/salary.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css']
})
export class EmployeeSalaryComponent implements OnInit {
  historyId: string;
  id: string;
  staff_name: string;
  staff_id: string;
  staff_email: string;
  payslip_no: any;
  staff_salary: any;
  history: any;
  bonus_type: string;
  bonus_amount: any;
  prev_bonus_amount: any;
  type: string;
  amount: any = '';
  prev_amount: any;
  total_amount: any;
  allowance_date: any;
  salary: any;
  editSalary: FormGroup;
  prev_type: any;
  monthly_amount: any;
  prev_bonus_type: any;
  empId: string;
  bonusToggle: boolean = false;


  changes = [];
  loader: boolean = true;

  salaryUpdated: boolean;
  salaryUpdating: boolean;

  validateRequire(val) {
    return (new FormControl(val, [
      Validators.required
    ]))
  }
  validateField(val, min, max) {
    return (new FormControl(val, [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern("[a-zA-Z ]*")
    ]));
  }
  validateNumbers(val, min, max) {
    return (new FormControl(val, [
      Validators.required,
      Validators.min(min),
      Validators.max(max)
    ]));
  }


  constructor(private aRoute: ActivatedRoute, private salaryService: SalaryService, private route: Router) { }

  ngOnInit(): void {

    combineLatest(
      this.aRoute.paramMap,
      this.aRoute.queryParamMap
    ).subscribe(obs => {
      this.id = obs[0].get('id');
      this.historyId = obs[1].get('history');
      this.empId = obs[1].get('emp');
      this.salaryService.getEmployeeSalary(this.id).valueChanges().subscribe(salary => {

        this.salary = salary
        this.staff_name = salary.staff_name
        this.staff_id = salary.staff_id
        this.staff_email = salary.staff_email
        this.payslip_no = salary.payslip_no
        this.staff_salary = this.salary.staff_salary;
        this.loader = false;

      })

      this.salaryService.getEmployeeSalary(this.id).get().subscribe(e => {
        let data = e.data()

        this.history = data;

        delete this.history.salary_id;
        delete this.history.staff_email;
        delete this.history.bank;
        delete this.history.staff_salary
        delete this.history.staff_total_salary;
        delete this.history.lastModfiedAt;
        delete this.history.payslip_no;
        delete this.history.status;
        delete this.history.staff_avatar;
        delete this.history.staff_name;
        delete this.history.staff_id;

        let keys = Object.keys(this.history);

        let key = keys.filter(key => key === this.historyId)

        let employeeSalary = this.history[key[0]];
        this.bonus_type = employeeSalary.bonus_type ? employeeSalary.bonus_type : '';
        this.prev_bonus_type = this.bonus_type;
        this.bonus_amount = employeeSalary.bonus_amount ? employeeSalary.bonus_amount : '0'
        this.prev_bonus_amount = this.bonus_amount;
        this.type = employeeSalary.type;
        this.prev_type = this.type;
        this.amount = this.type != 'Monthly Salary' ? employeeSalary.amount : employeeSalary.monthly_amount
        this.prev_amount = this.amount;
        this.monthly_amount = employeeSalary.monthly_amount
        this.total_amount = employeeSalary.total_amount;
        this.allowance_date = employeeSalary.date;


        if (this.bonus_type != '') {
          document.querySelector('#checkbox')['checked'] = true
          this.bonusToggle = !this.bonusToggle
        }
      });


    })


  }

  update(form) {

    this.salaryUpdated = false;
    this.salaryUpdating = true;
    let activity_log = [];
    let changed = {
      modifiedBy: {
        role: 'Admin'
      },
      type_changed: {
        previous: '',
        current: ''
      },
      amount_changed: {
        previous: '',
        current: ''
      },
      bonus_amount_changed: {
        previous: '',
        current: ''
      },
      bonus_type_changed: {
        previous: '',
        current: ''
      },
      time: Date.now().toString()
    }


    let updated = false;
    form.value.date = this.history[this.historyId].date;
    form.value.total_amount = this.total_amount;
    form.value.monthly_amount = this.monthly_amount;
    form.value.staff_salary = this.staff_salary;


    if (this.type != 'Monthly Salary') {

      if (this.amount > this.prev_amount) {

        let increasedBy = parseFloat(this.amount) - parseFloat(this.prev_amount);
        let total = parseFloat(this.total_amount.split('-')[1]) + increasedBy;
        form.value.amount = (parseFloat(this.prev_amount) - parseFloat(this.monthly_amount)) + increasedBy;
        form.value.total_amount = 'BDT- ' + total.toString();
        this.staff_salary = this.staff_salary + increasedBy
        form.value.staff_salary = this.staff_salary;

      }
      else if (parseFloat(this.amount) < parseFloat(this.prev_amount)) {

        let decreasedBy = parseFloat(this.prev_amount) - parseFloat(this.amount);
        let total = parseFloat(this.total_amount.split('-')[1]) - decreasedBy;
        form.value.amount = (parseFloat(this.prev_amount) - parseFloat(this.monthly_amount)) - decreasedBy;
        form.value.total_amount = 'BDT- ' + total.toString();
        this.staff_salary = this.staff_salary - decreasedBy
        form.value.staff_salary = this.staff_salary;

      }
    }


    if (parseFloat(this.prev_bonus_amount) < parseFloat(this.bonus_amount)) {
      let total = parseFloat(this.bonus_amount) + parseFloat(this.staff_salary);
      form.value.bonus_amount = this.bonus_amount;
      form.value.total_amount = 'BDT- ' + total.toString();
    } else if (this.prev_bonus_amount > this.bonus_amount) {
      let total = parseFloat(this.bonus_amount) + parseFloat(this.staff_salary);
      form.value.bonus_amount = this.bonus_amount;
      form.value.total_amount = 'BDT- ' + total.toString();
    }

    if (this.prev_type != this.type) {
      changed.type_changed = {
        previous: this.prev_type,
        current: this.type
      }

      updated = true;
    }
    if (this.amount != this.prev_amount) {
      changed.amount_changed = {
        previous: this.prev_amount,
        current: this.amount
      }

      updated = true;
    }
    if (this.bonus_type != this.prev_bonus_type) {
      changed.bonus_type_changed = {
        previous: this.prev_bonus_type,
        current: this.bonus_type
      }

      updated = true;
    }
    if (this.bonus_amount != this.prev_bonus_amount) {
      changed.bonus_amount_changed = {
        previous: this.prev_bonus_amount,
        current: this.bonus_amount
      }

      updated = true;
    }

    if (updated) {
      changed.modifiedBy = {
        role: 'Admin'
      }

      if (this.history[this.historyId].activity_log) {

        for (let i = 0; i < this.history[this.historyId].activity_log.length; i++) {
          activity_log.push(this.history[this.historyId].activity_log[i]);
        }

        activity_log[activity_log.length] = (changed)

      } else {
        activity_log[0] = (changed)
      }
    }



    let formValue = form.value;

    let staff_salary = formValue.staff_salary;

    formValue.activity_log = activity_log;

    delete formValue.allowance_date;
    delete formValue.payslip_no;
    delete formValue.staff_email;
    delete formValue.staff_id;
    delete formValue.staff_name;
    delete formValue.staff_net_salary;
    delete formValue.staff_salary;

    let formVal = {
      staff_salary: staff_salary,
      [this.historyId]: formValue,
      lastModfiedAt: Date.now().toString(),
    };


    if (formVal.staff_salary != undefined) {

      this.salaryService.updateSalary(formVal, this.id, this.empId)
        .then(() => {
          this.salaryUpdated = true;
          this.salaryUpdating = false;
          this.route.navigate([`/payroll/employee-salary/salary-history/${this.id}`], { queryParams: { emp: this.empId } })
        })


      // SERVER
      // this.salaryService.updateSalary(formVal, this.id)
      //   .subscribe((res) => {
      //     console.log(res, "RES")
      //     this.salaryUpdated = true;
      //     this.salaryUpdating = false;
      //     setTimeout(() => {
      //       this.salaryUpdated = false;
      //       this.route.navigate([`/payroll/employee-salary/salary-history/${this.id}`])
      //     }, 2000)
      //   }, err => {
      //     console.log(err)
      //   })

    }
  }


  addBonus() {
    this.bonusToggle = !this.bonusToggle;
  }
}
