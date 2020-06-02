import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckService } from 'src/app/services/check/check.service';


@Component({
  selector: 'app-check-home',
  templateUrl: './check-home.component.html',
  styleUrls: ['./check-home.component.css']

})

export class CheckHomeComponent implements OnInit {

  empId;
  public checkForm: FormGroup;

  constructor(private check: CheckService, public fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {


    //set static employee id start
    localStorage.setItem("empid", "YT-101");
    //end

    if (localStorage.getItem("checked") === 'true') {
      this.router.navigate(['/check-out']);
    }

    this.empId = localStorage.getItem("empid");
    this.cForm();
    this.indate.setValue((new Date()).toISOString().substring(0, 10));
    this.intime.setValue(this.convertTime12to24(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));

  }

  convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }

  cForm() {
    this.checkForm = this.fb.group({
      indate: ['', [Validators.required]],
      intime: ['', [Validators.required]],
      innote: [''],
    })
  }


  get indate() {
    return this.checkForm.get('indate');
  }
  get intime() {
    return this.checkForm.get('intime');
  }
  get innote() {
    return this.checkForm.get('innote');
  }

  submitCheckIn() {
    this.check.checkIn(this.empId, this.checkForm.value['indate'], this.checkForm.value['intime'], this.checkForm.value['innote'])
    localStorage.setItem("checked", "true");
    this.router.navigate(['/check-out']);
  }

}
