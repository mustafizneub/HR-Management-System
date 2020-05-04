import { ActivatedRoute } from '@angular/router';
import { SalaryService } from 'src/app/services/salary/salary.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})

export class PayslipComponent implements OnInit {
  loader: boolean = true;

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  currentMonth = this.months[new Date().getMonth()].toUpperCase();
  year = new Date().getFullYear()
  employeeSalary: any;
  constructor(private salaryService: SalaryService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(param => {
      this.salaryService.getEmployeeSalary(param.id).get().subscribe((e: { data: () => any }) => {
        this.employeeSalary = e.data();
        console.log(this.employeeSalary)
        this.loader = false;
      });
    })
  }

  printHistory() {
    let prtContent = document.getElementById("employee-history");

    var win = window.open('', '_blank');
    win.document.write(`<html><head>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <style>
        img {
      width: 62%;
      margin-left: 50px;
    }

    h3 {
      text-align: right;
    }

    </style>
    </head><body><div class="container">`);
    win.document.write(prtContent.outerHTML);
    win.document.write(`</div>
      <script>
        window.print()
        window.close()
      </script>
    </body></html>`);
  }
}
