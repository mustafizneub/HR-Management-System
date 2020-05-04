import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { combineLatest } from 'rxjs'
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from 'src/app/services/salary/salary.service';

import * as MakePrint from '../../../utils/printpage';
import * as MakePdf from '../../../utils/makepdf';

@Component({
  selector: 'app-salary-history',
  templateUrl: './salary-history.component.html',
  styleUrls: ['./salary-history.component.css']
})
export class SalaryHistoryComponent implements OnInit {
  data: any;
  type = 'Monthly Salary';
  about;
  salary;
  date;
  salary_month;
  monthly_amount: number = 0;

  modalOpen: boolean = false;
  id: any;
  confirmationModal: boolean = false;
  deleted: boolean;
  addedToSalary: boolean = false;
  bonus_type;
  bonus_amount: number = 0;
  bonusToggle: boolean = false;
  history;
  loading: boolean = true;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];

  total_amount;


  mailOnAir: boolean;
  mailSent: boolean;
  mailError: boolean = false;
  email;
  subject;
  message;
  addiingAllowance: boolean = false;
  allowanceAdded: boolean;
  mailModal: boolean = false;
  keys: string[];
  historyId: any;

  constructor(private aRoute: ActivatedRoute,
    private salaryService: SalaryService,
    private route: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    'use strict'
    let currentTime = new Date().getMonth();
    this.salary_month = this.months[currentTime];

    this.aRoute.params.subscribe(param => {
      this.id = param.id.trim();
      combineLatest(
        this.salaryService.getEmployeeSalary(this.id).valueChanges(),
        this.salaryService.getEmployeeSalary(this.id).valueChanges(),
      ).subscribe(obs => {

        this.loading = false;
        this.history = obs[0];
        if (this.history != '' && this.history != undefined) {
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
          delete this.history.activity_log
          delete this.history.fStoreId
          this.keys = Object.keys(this.history);
        }
        this.data = obs[1]

        this.monthly_amount = this.data.staff_salary;
        this.salary = this.monthly_amount;
        this.total_amount = 'BDT- ' + this.monthly_amount.toString();


      })

      // Server
      // this.salaryService.getEmployeeSalary(this.id)
      //   .toPromise()
      //   .then((res: any) => {
      //     this.history = res;
      //     this.data = Object.assign({}, this.history);


      //     if (this.history != '' && this.history != undefined) {
      //       delete this.history.salary_id;
      //       delete this.history.staff_email;
      //       delete this.history.bank;
      //       delete this.history.staff_salary
      //       delete this.history.staff_total_salary;
      //       delete this.history.lastModfiedAt;
      //       delete this.history.payslip_no;
      //       delete this.history.status;
      //       delete this.history.staff_avatar;
      //       delete this.history.staff_name;
      //       delete this.history.staff_id;
      //       delete this.history.activity_log
      //       delete this.history.fStoreId
      //       this.keys = Object.keys(this.history);
      //     }

      //     this.monthly_amount = this.data.staff_salary;
      //     this.salary = this.monthly_amount;
      //     this.total_amount = 'BDT- ' + this.monthly_amount.toString();

      // }).catch(err => {
      //   console.log(err)
      // })

    })
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  mailModalToggle() {
    this.mailModal = !this.mailModal;
  }


  addToSalary(form) {

    this.addiingAllowance = true;
    this.allowanceAdded = false;

    let id = Date.now().toString();
    let total = parseFloat(this.total_amount.split('-')[1]) - this.monthly_amount - this.bonus_amount

    form.value.amount = total != 0 ? total : this.monthly_amount;
    form.value.monthly_amount = this.monthly_amount;

    form.value.month = this.salary_month;
    form.value.total_amount = this.total_amount;
    form.value.issue_date = moment(form.value.date).format('ll');
    form.value.salary_id = id;
    let formValue = form.value;


    if (formValue.type === 'Increment' || formValue.type === 'Promotion') {
      this.salaryService.getEmployeeSalary(this.id).set({
        staff_salary: this.monthly_amount + total,
        staff_total_salary: this.monthly_amount + total
      }, { merge: true })
    }

    let month = moment().format('MMM-YYYY').split('-').join('_');
    let allowance = { [month]: formValue };

    this.salaryService.getEmployeeSalary(this.id).set(
      { [month]: formValue },
      { merge: true }
    ).then(() => {
      this.addiingAllowance = false;
      this.allowanceAdded = true;
      setTimeout(() => {
        this.allowanceAdded = false;
        this.toggleModal()
      }, 2000)
    })



    // SERVER
    // this.salaryService.addAllowance(this.id, allowance).subscribe((res: (any | Response)) => {
    //   this.addiingAllowance = false;
    //   this.allowanceAdded = true;
    //   setTimeout(() => {
    //     this.allowanceAdded = false;
    //     this.toggleModal()
    //   }, 2000)
    // }, (err: Response) => {
    //   console.log(err.status)
    // })
  }

  addMessage() {
    this.addedToSalary = true;
    setTimeout(() => {
      this.addedToSalary = false;
      this.toggleModal()
    }, 1500)
  }

  toggleConfirmationModal() {
    this.confirmationModal = !this.confirmationModal;
  }

  confirmation(confirm: boolean) {
    if (confirm === true) {
      this.salaryService.deleteHistory(this.id, this.historyId).then(() => {
        this.deleted = true;
        this.confirmationModal = false;
        setTimeout(() => {
          this.deleted = false;
        }, 3000);

      }).catch((err) => {
        console.log(err)
      })
    } else {
      this.toggleConfirmationModal();
    }
  }

  addBonus() {
    this.bonusToggle = !this.bonusToggle;
  }

  total() {
    this.total_amount = 'BDT- ' + (this.salary + this.bonus_amount).toString()
  }
  printHistory() {
    MakePrint.history(document.getElementById('details'));
  }

  makePdf() {
    let pdf = MakePdf.salaryHistory(this.history, this.data);
    pdf.open()

  }

  sendMail(form) {

    this.mailError = false;
    this.mailOnAir = true;
    this.mailSent = false;

    let pdf = MakePdf.salaryHistory(this.history, this.data);
    pdf.getBase64(async (data) => {
      this.http.post('http://localhost:3000/sendmail',
        { email: form.value.email, message: form.value.message, subject: form.value.subject, pdf: data })
        .subscribe(() => {
          this.mailOnAir = false;
          this.mailSent = true;
          setTimeout(() => {
            this.mailSent = false;
            this.mailModalToggle();
          }, 2000)
        }, (err) => {
          this.mailError = true;
          this.mailOnAir = false;
          setTimeout(() => {
            this.mailError = false;
            this.mailModalToggle()
          }, 2000)
        })
    })

  }

  deleteAHistory(historyId) {
    this.historyId = historyId
    this.toggleConfirmationModal();


  }
}
