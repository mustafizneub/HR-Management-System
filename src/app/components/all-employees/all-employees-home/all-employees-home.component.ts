import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { DesignationService } from 'src/app/services/designation/designation.service';
@Component({
  selector: 'app-all-employees-home',
  templateUrl: './all-employees-home.component.html',
  styleUrls: ['./all-employees-home.component.css']
})
export class AllEmployeesHomeComponent implements OnInit {
  data: [];
  t_headers = [
    { key: "username", label: "Name" },
    { key: "employee_id", label: "Employee ID" },
    { key: "email", label: "Email" },
    { key: "joining_date", label: "Join Date" },
    { key: "designation", label: "Designation" },
    { key: "actions", label: "Actions" }
  ]
  modalOpen: boolean = false;
  confirmationModal: boolean = false;
  router: boolean = false;
  deleted: boolean = false;
  creating: boolean = false;
  totalEmployee: number;
  deleteId: any;
  designations: any;
  errorMessage: string;
  constructor(private route: Router, private employeeService: EmployeeService, location: Location, private designationService: DesignationService) {
    this.route.events.subscribe(() => {
      if (location.path() === '/employees/all-employee') {
        this.router = false;
      } else {
        this.router = true;
      }
    })

  }

  ngOnInit(): void {
    // this.employeeService.getEmployees().snapshotChanges().subscribe((e: any) => {
    //   this.data = e.map(employee => {
    //     employee = employee.payload.doc.data()
    //     return ({
    //       first_name: employee.basic.first_name,
    //       last_name: employee.basic.last_name,
    //       username: employee.basic.username,
    //       employee_id: employee.basic.employee_id,
    //       company: employee.basic.company,
    //       avatar: employee.basic.avatar,
    //       designation: employee.basic.designation,
    //       email: employee.contact.email,
    //       phone_number: employee.contact.phone_number,
    //       joining_date: employee.basic.joining_date
    //     })
    //   })


    //   this.designationService.getdesignations().get().subscribe((e: { docs: any[]; }) => {
    //     this.designations = e.docs.map(e => {
    //       return e.data();
    //     })
    //   })
    // })

    this.employeeService.getEmployees().snapshotChanges().subscribe((e: any) => {
      this.data = e.map(employee => {
        employee = employee.payload.doc.data()
        return ({
          first_name: employee.basic.first_name,
          last_name: employee.basic.last_name,
          username: employee.basic.username,
          employee_id: employee.basic.employee_id,
          company: employee.basic.company,
          avatar: employee.basic.avatar,
          designation: employee.basic.designation,
          email: employee.contact.email,
          phone_number: employee.contact.phone_number,
          joining_date: employee.basic.joining_date,
          fStoreId: employee.fStoreId
        })
      })
    })
    this.designationService.getdesignations().get().subscribe((e: { docs: any[]; }) => {
      this.designations = e.docs.map(e => {
        return e.data();
      })
    })
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  toggleConfirmationModal() {
    this.confirmationModal = !this.confirmationModal;
  }


  addEmployee(employee: any) {
    try {
      this.employeeService.create(employee);
    } catch (err) {
      console.log(err, "MESSAGE")
    }


    setTimeout(() => {
      this.creating = true;
    }, 0)

    setTimeout(() => {
      document.querySelector('#addedText').innerHTML = "Employee Added"
    }, 1500)
    setTimeout(() => {
      this.creating = false;
    }, 2000)

  }

  deleteEmployee(id: string) {
    this.deleteId = id;
    this.confirmationModal = !this.confirmationModal;
  }
  confirmation(confirm: boolean) {
    this.deleted = false;
    if (confirm === true) {
      this.employeeService.deleteEmployee(this.deleteId)
        .then(() => {
          this.deleted = true;
          this.confirmationModal = false;
          setTimeout(() => {
            this.deleted = false;
          }, 2000);
        })
        .catch((err: Response) => {
          this.errorMessage = "deleteFail"
          // alert("Something went wrong")
        });

    } else {
      this.toggleConfirmationModal();
    }
  }
  filterData(filteredData: []) {
    this.data = filteredData
  }
}
