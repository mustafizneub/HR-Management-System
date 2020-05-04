import { Router } from '@angular/router';
import { DesignationService } from 'src/app/services/designation/designation.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DepartmentService } from 'src/app/services/department/department.service';
@Component({
  selector: 'app-designations-home',
  templateUrl: './designations-home.component.html',
  styleUrls: ['./designations-home.component.css']
})
export class DesignationsHomeComponent implements OnInit {
  designation = new FormGroup({
    id: new FormControl(),
    dname: new FormControl(''),
    desname: new FormControl('')
  });
  modalOpen: boolean = false;
  data = [];
  t_headers = [
    { key: 'desname', label: "Designation" },
    { key: 'dname', label: 'Department' },
    { key: 'actions', label: 'Actions' }
  ]
  router: boolean = false
  desId: any;
  deps: any;
  constructor(private designationService: DesignationService, private depService: DepartmentService, private route: Router, private location: Location) {
    this.route.events.subscribe(() => {
      if (location.path() === "/employees/designations") {
        this.router = false;
      } else {
        this.router = true;
      }
    })
  }

  ngOnInit(): void {
    this.designationService.getdesignations().valueChanges().subscribe(e => {
      this.data = e;
    });
    this.depService.getDepartments().get().subscribe(e => {
      this.deps = e.docs.map(e => {
        return e.data()
      })
    })
    this.router = false;
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

  addDesignation() {
    this.designation.value.id = Date.now().toString();
    this.designationService.addDesignation(this.designation.value)
  }
  getDesignation() {
    this.data = this.designationService.getdesignations();
  }

  updateDesignation() {
    this.designationService.updateDesignation(this.designation.value, this.desId)
  }

  deleteDesignation(id) {
    this.designationService.deleteDesignation(id)
  }

}
