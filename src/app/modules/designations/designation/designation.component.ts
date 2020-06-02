import { ActivatedRoute } from '@angular/router';
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

  editDes = new FormGroup({
    id: new FormControl(),
    dname: new FormControl(),
    desname: new FormControl()
  });

  desId: string;
  currentDep: string;
  data: any;
  deps: string;

  designationUpdated: boolean;
  updatingDesignation: boolean;

  constructor(
    private designationService: DesignationService,
    private depService: DepartmentService,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(param => {
      this.desId = param.id;
    })

    this.designationService.getDesignation(this.desId).subscribe(e => {
      this.data = e;


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

    })
  }

  updateDesignation() {
    this.updatingDesignation = true;
    this.designationService.updateDesignation(this.editDes.value, this.desId)
    setTimeout(() => {
      this.updatingDesignation = false;
      this.designationUpdated = true;

    }, 1000)
    setTimeout(() => {
      this.designationUpdated = false;
    }, 1500)
  }
}
