import { DepartmentService } from 'src/app/services/department/department.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
@Component({
  selector: 'app-departments-home',
  templateUrl: './departments-home.component.html',
  styleUrls: ['./departments-home.component.css']
})
export class DepartmentsHomeComponent implements OnInit {

  department = new FormGroup({
    id: new FormControl(),
    dep_name: new FormControl('')
  })

  t_headers = [
    { key: 'dep_name', label: 'Department' },
    { key: 'actions', label: 'Actions' }
  ];


  data = [];
  depId: string;

  router: boolean = false;
  modalOpen: boolean = false;
  addingDepartment: boolean;
  departmentAdded: boolean;

  constructor(
    private departmentService: DepartmentService,
    private route: Router,
    location: Location
  ) {
    this.route.events.subscribe(() => {
      if (location.path() === '/employees/departments') {
        this.router = false;
      } else {
        this.router = true;
      }
    })
  }

  ngOnInit(): void {
    this.departmentService.getDepartments().valueChanges().subscribe(e => {
      this.data = e
    });
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  addDepartment() {
    this.department.value.id = Date.now().toString();
    this.departmentService.addDepartment(this.department.value);
    setTimeout(() => {
      this.addingDepartment = true;
    }, 0)
    setTimeout(() => {
      this.addingDepartment = false;
      this.departmentAdded = true;
    }, 1000)
    setTimeout(() => {
      this.departmentAdded = false;
      this.department.reset();
      this.toggleModal()
    }, 2000)


  }

  deleteDepartment(id) {
    console.log(id)
    this.departmentService.deleteDepartment(id)
  }

}
