import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from '../../../services/employee/employee.service';

import 'firebase/firestore';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
   object:any;
   p: number = 1;
   employees;

  constructor( 
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public router: Router,
    private employeeService: EmployeeService
    ) { 
  }

  ngOnInit(): void {
    // employee_id  YT-103
        this.employeeService.getEmployees().valueChanges().subscribe((response) => {
            this.employees = response;
            console.log(response, '32');
      })
            
  }


}