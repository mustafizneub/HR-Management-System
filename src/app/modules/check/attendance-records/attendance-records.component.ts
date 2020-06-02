import { Component, OnInit } from '@angular/core';
import { CheckService } from 'src/app/services/check/check.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-attendance-records',
  templateUrl: './attendance-records.component.html',
  styleUrls: ['./attendance-records.component.css']
})
export class AttendanceRecordsComponent implements OnInit {

  inTime;
  outTime;
  inDate;
  outDate;
  inNote;
  outNote;
  duration;
  empId;
  record: boolean = false;
  constructor(private check: CheckService) { }

  ngOnInit(): void {
    this.empId = localStorage.getItem("empid");
  }

  public searchByDate(value: any): void {

    var datePipe = new DatePipe("en-US");
    var date = datePipe.transform(value, 'yyyy-MM-dd');


    this.check.searchBydate(date, this.empId).valueChanges().subscribe(object => {
      this.record = true;
      this.inTime = object[0]['checkin'];
      this.outTime = object[0]['checkout'];
      this.inDate = object[0]['indate'];
      this.outDate = object[0]['outdate'];
      this.inNote = object[0]['innote'];
      this.outNote = object[0]['outnote'];
      //check in & check out duration
      var a = moment(this.inTime, 'HH:mm');
      var b = moment(this.outTime, 'HH:mm');
      this.duration = Math.floor(b.diff(a, 'hours', true))

    });

  }

}
