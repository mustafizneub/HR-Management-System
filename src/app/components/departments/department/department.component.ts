import { DepartmentService } from 'src/app/services/department/department.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  updateDep: FormGroup;
  depId: any;
  data: any;
  constructor(
    private departmentService: DepartmentService,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe((param: Params) => {
      this.depId = param.id;
      this.departmentService.getDepartment(this.depId).get().subscribe((e: { data: any }) => {
        this.data = e.data();
      });

      this.updateDep = new FormGroup({
        id: new FormControl(this.data ? this.data['id'] : ''),
        dep_name: new FormControl(this.data ? this.data['dep_name'] : '')
      });

    });
  }

  updateDepartment() {
    this.departmentService.updateDepartment(this.updateDep.value, this.depId)
  }

}
