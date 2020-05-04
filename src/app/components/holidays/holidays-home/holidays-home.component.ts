import { HolidayService } from 'src/app/services/holiday/holiday.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holidays-home',
  templateUrl: './holidays-home.component.html',
  styleUrls: ['./holidays-home.component.css']
})
export class HolidaysHomeComponent implements OnInit {
  modalOpen: boolean = false;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  data = []
  t_headers = [
    { key: "title", label: "title" },
    { key: "date", label: "Date" },
    { key: 'day', label: "Day" },
    { key: "actions", label: "actions" }
  ]

  holiday = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    startsIn: new FormControl(''),
    endsIn: new FormControl(''),
    day: new FormControl('')
  })
  editholiday: FormGroup;
  router: boolean = false;

  constructor(
    private location: Location,
    route: Router,
    private holidayService: HolidayService) {
    route.events.subscribe(() => {
      if (this.location.path() === '/employees/holidays') {
        this.router = false;
      } else {
        this.router = true;
      }
    })
  }

  ngOnInit(): void {
    this.holidayService
      .getHolidays()
      .valueChanges()
      .subscribe((e: { data: () => any }[]) => {
        this.data = e;
      });

  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

  addHoliday() {
    let val = this.holiday.value;
    let date = new Date(val.startsIn)
    this.holiday.value.day = this.days[date.getDay()];
    let data = {
      id: Date.now().toString(),
      title: this.holiday.value.title,
      day: this.holiday.value.day,
      date: this.holiday.value.startsIn.split('-').reverse().join('-') + ' to ' + this.holiday.value.endsIn.split('-').reverse().join('-'),

    }
    this.holidayService.createHoliday(data)
  }

  // editOne() {
  //   this.router = true;
  // }
  deleteOne(id: string) {
    this.holidayService.deleteHoliday(id)

  }
}
