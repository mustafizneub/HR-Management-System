import { HolidayService } from 'src/app/services/holiday/holiday.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  editholiday: FormGroup;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  id: any;
  holiday: any;
  updatingHoliday: boolean;
  holidayUpdated: boolean;
  constructor(private aRoute: ActivatedRoute, private holidayService: HolidayService) {

    this.aRoute.params.subscribe(param => {
      this.id = param.id;
    })
  }

  ngOnInit(): void {
    this.holidayService.getHoliday(this.id).get().subscribe((e: { data: () => any }) => {
      this.holiday = e.data();
      this.editholiday = new FormGroup({
        id: new FormControl(this.holiday.id),
        title: new FormControl(this.holiday.title),
        startsIn: new FormControl(this.holiday.date.split('to')[0].trim().split('-').reverse().join('-')),
        endsIn: new FormControl(this.holiday.date.split('to')[1].trim().split('-').reverse().join('-'))
      });
    });
  }

  editHoliday() {
    this.updatingHoliday = true;
    this.holidayUpdated = false;

    let val = this.editholiday.value;
    let d = new Date(val.startsIn)
    this.editholiday.value.day = this.days[d.getDay()];
    let dt = {
      id: this.editholiday.value.id,
      title: this.editholiday.value.title,
      day: this.editholiday.value.day,
      date: this.editholiday.value.startsIn.split('-').reverse().join('-') + ' to ' + this.editholiday.value.endsIn.split('-').reverse().join('-'),
    }
    this.holidayService.updateHoliday(dt, this.id)

    setTimeout(() => {
      this.updatingHoliday = false;
      this.holidayUpdated = true;

    }, 1000)
    setTimeout(() => {
      this.holidayUpdated = false;

    }, 1500)

  }

}
