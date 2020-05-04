import { EmployeeService } from '../../services/employee/employee.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DesignationService } from 'src/app/services/designation/designation.service';

@Component({
  selector: 'app-filter-one',
  templateUrl: './filter-one.component.html',
  styleUrls: ['./filter-one.component.css']
})
export class FilterOneComponent implements OnInit {
  data = [];

  option: any;
  @Output() filter = new EventEmitter();
  designations: any;
  constructor(private employeeService: EmployeeService, private designationService: DesignationService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().get().subscribe(e => {
      this.data = e.docs.map(e => {
        return (
          {
            employee_id: e.data().basic.employee_id,
            first_name: e.data().basic.firstname,
            last_name: e.data().basic.lastname,
            username: e.data().basic.username,
            password: e.data().basic.password,
            avatar: e.data().basic.avatar,
            designation: e.data().basic.designation,
            joining_date: e.data().basic.joining_date,
            company: e.data().basic.company,
            city: e.data().address.city,
            state: e.data().address.state,
            street: e.data().address.street,
            zip: e.data().address.zip,
            email: e.data().contact.email,
            phone_number: e.data().contact.phone_number
          }
        )
      })
      this.designationService.getdesignations().get().subscribe(e => {
        this.designations = e.docs.map(e => {
          return e.data();
        })
        // this.filteredDesignation = this.designations.filter(e => e.dname === this.department)
      })
    })

  }

  onChange(event) {
    this.option = event.target.value;
  }
  getElem() {
    let inp1 = document.getElementById('type-one').firstChild.firstChild;
    let inp2 = document.getElementById('type-two').firstChild.firstChild;

    let inp1Val = (<HTMLInputElement>inp1).value;
    let inp2Val = (<HTMLInputElement>inp2).value

    let inp1Id = (<HTMLInputElement>inp1).id;
    let inp2Id = (<HTMLInputElement>inp2).id;

    let filteredData = []
    let mapFilter = [];
    if (inp1Val || inp2Val || this.option) {
      this.data.forEach(e => {
        if (inp1Val) {
          if (e[inp1Id].toLowerCase().includes(inp1Val.toLowerCase())) {
            if (!mapFilter.includes(e.employee_id)) {
              mapFilter.push(e.employee_id)
              filteredData.push(e)
            }
          }
        }
        if (inp2Val) {
          if (e[inp2Id].toLowerCase().includes(inp2Val.toLowerCase())) {
            if (!mapFilter.includes(e.employee_id)) {
              mapFilter.push(e.employee_id)
              filteredData.push(e)
            }
          }
        }

        if (this.option) {
          if (e['designation'].toLowerCase().includes(this.option.toLowerCase())) {
            if (!mapFilter.includes(e.employee_id)) {
              mapFilter.push(e.employee_id)
              filteredData.push(e)
            }
          }
        }

      })
      this.filter.emit(filteredData);
    }

  }
  resetData() {
    this.filter.emit(this.data)
  }
}
