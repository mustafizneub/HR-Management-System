import { filter } from 'rxjs/operators';

import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../../../services/salary/salary.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';



import * as Print from '../../../utils/printpage'
import * as MakePdf from '../../../utils/makepdf'


@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.css']
})
export class SalaryDetailsComponent implements OnInit {


  loader: boolean = true;
  modalOpen: boolean = false;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  currentMonth = this.months[new Date().getMonth()].toUpperCase();
  year = new Date().getFullYear()
  employeeSalary: any;
  basicInfo: any;
  mailOnAir: boolean;
  mailSent: boolean;
  email;
  subject;
  message
  mailError: boolean;

  constructor(private salaryService: SalaryService, private aRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    combineLatest(
      this.aRoute.paramMap,
      this.aRoute.queryParamMap
    ).subscribe(combined => {
      let id = combined[0].get('id');
      let historyId = combined[1].get('history')

      this.salaryService.getEmployeeSalary(id).get().subscribe(e => {
        this.basicInfo = e.data()
        this.email = this.basicInfo.staff_email
      });

      this.salaryService.getEmployeeSalary(id).get().subscribe(e => {
        let data = e.data()
        let history = data;
        delete history.salary_id;
        delete history.staff_email;
        delete history.bank;
        delete history.staff_salary
        delete history.staff_total_salary;
        delete history.lastModfiedAt;
        delete history.payslip_no;
        delete history.status;
        delete history.staff_avatar;
        delete history.staff_name;
        delete history.staff_id;

        let keys = Object.keys(history);

        let key = keys.filter(key => key === historyId)
        this.employeeSalary = history[key[0]];
        this.loader = false
        // this.email = this.basicInfo.staff_email
      });
      // this.salaryService.getEmployeeSalary(id).collection('salary-history').doc(historyId).get().subscribe(e => {
      //   this.employeeSalary = e.data()
      //   this.loader = false;

      // })
    })

  }

  printHistory() {
    let prtContent = document.getElementById("employee-history");

    Print.history(prtContent);
  }


  makePdf() {
    let pdf = MakePdf.salaryDetails(this.basicInfo, this.employeeSalary);
    pdf.open()
  }

  sendMail(form) {

    this.mailError = false;
    this.mailOnAir = true;
    this.mailSent = false;
    let pdf = MakePdf.salaryDetails(this.basicInfo, this.employeeSalary);

    pdf.getBase64(async (data) => {
      this.http.post('http://localhost:3000/sendmail',
        { email: form.value.email, message: form.value.message, subject: form.value.subject, pdf: data })
        .subscribe(res => {
          this.mailOnAir = false;
          this.mailSent = true;
          setTimeout(() => {
            this.mailSent = false;
            this.toggleModal();
          }, 2000)

        }, (err) => {
          this.mailError = true;
          this.mailOnAir = false;
          setTimeout(() => {
            this.mailError = false;
            this.toggleModal()
          }, 2000)
        })
    })

  }
  toggleModal() {
    this.modalOpen = !this.modalOpen
  }
}
