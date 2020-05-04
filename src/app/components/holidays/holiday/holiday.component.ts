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
  constructor(private aRoute: ActivatedRoute, private holidayService: HolidayService) {

    this.aRoute.params.subscribe(param => {
      this.id = param.id;
    })
  }

  ngOnInit(): void {
    this.holidayService.getHoliday(this.id).get().subscribe((e: { data: () => any }) => {
      let holiday = e.data();
      this.editholiday = new FormGroup({
        id: new FormControl(holiday.id),
        title: new FormControl(holiday.title),
        startsIn: new FormControl(holiday.date.split('to')[0].trim().split('-').reverse().join('-')),
        endsIn: new FormControl(holiday.date.split('to')[1].trim().split('-').reverse().join('-'))
      });
    });
  }

  editHoliday() {
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
  }

}
