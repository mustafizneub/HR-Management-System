import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckService } from 'src/app/services/check/check.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  checkIn;
  empId;
  type;
  breaktime;
  breaknote;
  cind;
  cint;
  cinn;
  cod;
  cot;
  con;

  sType;
  sTime;
  sNote;
  constructor(private check: CheckService, public fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {

    this.empId = localStorage.getItem("empid");

    this.type = "Select Type";
    this.breaktime = this.convertTime12to24(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    this.cot = this.convertTime12to24(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    this.cint = this.convertTime12to24(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    this.check.fetchCheckIn(this.empId).valueChanges().subscribe(object => {
      var datePipe = new DatePipe('en-US');
      object[0]['indate'] = datePipe.transform(object[0]['indate'], 'dd/MM/yyyy');
      this.checkIn = object[0]['indate'] + " " + object[0]['checkin'];

    });

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


  break(type, breaktime, breaknote) {
    this.sType = type;
    this.sTime = breaktime;
    this.sNote = breaknote;
    this.check.addBreak(this.empId, type, breaktime, breaknote);


  }

  againCheckIn(cind, cint, cinn) {
    this.check.againCheckIn(this.empId, cind, cint, cinn);

  }

  checkOut(cod, cot, con) {
    this.check.checkOut(this.empId, cod, cot, con);

  }
  backtowork(type,breaktime,breaknote){
    
  }

}
