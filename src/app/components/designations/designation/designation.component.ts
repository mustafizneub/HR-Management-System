import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DesignationService } from 'src/app/services/designation/designation.service';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  [x: string]: any;
  editDes = new FormGroup({
    id: new FormControl(),
    dname: new FormControl(),
    desname: new FormControl()
  });
  desId: any;

  constructor(private designationService: DesignationService, private depService: DepartmentService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(param => {
      this.desId = param.id;
    })

    this.data = this.designationService.getDesignation(this.desId)

    this.editDes = new FormGroup({
      id: new FormControl(this.data ? this.data.id : ''),
      dname: new FormControl(this.data ? this.data.dname : ''),
      desname: new FormControl(this.data ? this.data.desname : '')
    })
    this.currentDep = this.editDes['desname'];

    this.depService.getDepartments().get().subscribe(e => {
      this.deps = e.docs.map(e => {
        return e.data()
      })
    })

  }
  updateDesignation() {
    this.designationService.updateDesignation(this.editDes.value, this.desId)
  }
}
