import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/services/salary/salary.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-employee-salary-home',
  templateUrl: './employee-salary-home.component.html',
  styleUrls: ['./employee-salary-home.component.css']
})
export class EmployeeSalaryHomeComponent implements OnInit {
  employee_salary = '';
  employee_id = '';
  employee_name = '';
  email;

  staff_salary;
  staff_id;
  staff_name;

  employeeAdded: boolean = false;
  newEmployee: boolean = true;
  noEmployee: boolean = false;
  validId: boolean = true;
  salaryAdded: boolean = false;
  staff_avatar: any;
  bank: { bankname: any; branch: any; holder: any; acc_no: any; };
  errorMessage;

  validateRequire() {
    return (new FormControl(0, [
      Validators.required
    ]))
  }
  validateField(min, max) {
    return (new FormControl('', [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern("[a-zA-Z ]*")
    ]));
  }
  validateNumbers(min, max) {
    return (new FormControl(0, [
      Validators.required,
      Validators.min(min),
      Validators.max(max)
    ]));
  }

  addSalary: FormGroup;
  data = [];
  t_headers = [
    { key: 'staff_name', label: 'Employee' },
    { key: 'staff_id', label: 'Employee ID' },
    { key: 'staff_email', label: 'Email' },
    { key: 'staff_salary', label: 'Salary (BDT)' },
    { key: 'actions', label: 'Actions' }
  ]
  modalOpen: boolean = false;
  router: boolean = false;

  constructor(private salaryService: SalaryService,
    route: Router, location: Location,
    private employeeService: EmployeeService,
    private http: HttpClient) {
    route.events.subscribe(() => {
      if (location.path() === '/payroll/employee-salary') {
        this.router = false;
      }
      else {
        this.router = true;
      }
    })
  }

  ngOnInit(): void {
    this.salaryService.getEmployeesSalary().valueChanges().subscribe(e => {
      this.data = e;
      console.log(this.data)
    });
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

  create() {
    let payslip_no;
    if (this.data.length < 9) {
      payslip_no = '#00' + (this.data.length + 1).toString()
    } else if (this.data.length >= 9 && this.data.length < 99) {
      payslip_no = '#0' + (this.data.length + 1).toString()
    } else {
      payslip_no = '#' + (this.data.length + 1).toString();
    }

    let salary = {
      payslip_no: payslip_no,
      staff_id: this.staff_id.trim(),
      staff_name: this.staff_name,
      staff_email: this.email,
      staff_salary: parseFloat(this.staff_salary),
      staff_total_salary: parseFloat(this.staff_salary),
      staff_avatar: this.staff_avatar,
      bank: this.bank,
      status: 'active'
    }

    this.salaryService.createSlaray(salary)
    this.salaryAdded = true;
    setTimeout(() => {
      this.salaryAdded = false;
      this.toggleModal();
    }, 2000)

    // SERVER
    // this.salaryService.createSlaray(salary).subscribe((res: (any | Response)) => {
    //   console.log(res.message)
    //   this.salaryAdded = true;
    //   setTimeout(() => {
    //     this.salaryAdded = false;
    //     this.toggleModal();
    //   }, 2000)
    // }, (err: Response) => {
    //   console.log(err.status)
    // })
  }


  delete(id: string) {
    this.salaryService.deleteSalary(id)
  }

  employeeId() {

    this.employeeAdded = false;
    if (this.data.length > 0) {

      this.data.forEach(e => {
        if (e.staff_id.trim() === this.staff_id.trim()) {
          this.employeeAdded = true;
          this.errorMessage = 'employeeExist'
        }
      })

      if (!this.employeeAdded) {
        try {
          this.employeeService.getEmployeeById(this.staff_id.trim()).valueChanges().subscribe(e => {

            if (e[0]) {
              this.staff_name = e[0]['basic'].firstname + " " + e[0]['basic'].lastname;
              this.staff_avatar = e[0]['basic'].avatar;
              this.email = e[0]['contact'].email;
              this.bank = {
                bankname: e[0]['bankDetails'].bankname,
                branch: e[0]['bankDetails'].branch,
                holder: e[0]['bankDetails'].holder,
                acc_no: e[0]['bankDetails'].acc_no
              }
            } else {
              this.errorMessage = 'noEmployee';
              setTimeout(() => {
                this.errorMessage = '';
              }, 2000)
            };
          })

        } catch (err) {
          setTimeout(() => {
            this.errorMessage = "notValidId"
          }, 2000)
          setTimeout(() => {
            this.errorMessage = ""
          }, 3500)
        }
      } else {
        setTimeout(() => {
          this.errorMessage = ''
        }, 2000)
      }
    } else {
      this.employeeService.getEmployeeById(this.staff_id.trim()).valueChanges().subscribe(e => {
        if (e[0]) {
          this.staff_name = e[0]['basic'].firstname + " " + e[0]['basic'].lastname;
          this.staff_avatar = e[0]['basic'].avatar;
          this.email = e[0]['contact'].email;
          this.bank = {
            bankname: e[0]['bankDetails'].bankname,
            branch: e[0]['bankDetails'].branch,
            holder: e[0]['bankDetails'].holder,
            acc_no: e[0]['bankDetails'].acc_no
          }
        } else {
          this.errorMessage = 'noEmployee';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000)
        };
      })
    }
  }

}
