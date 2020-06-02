import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayLeft'
})
export class DayLeftPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let current_time = Date.now();
    console.log(value, current_time)
    let myDate = value.split('-');

    let newDate = myDate[1] + '/' + myDate[2] + '/' + myDate[0]
    value = new Date(newDate).getTime();
    let difference = parseInt(value) - current_time;
    let time = Math.floor((difference / 1000) / 3600);
    if (time < 0) {
      return '0 days left'
    }
    else if (time < 24) {
      return `${time} hours left`;
    } else {
      let day = Math.floor(time / 24);
      if (day === 1) {
        return `${day} day left`
      }
      return `${day} days left`
    }

  }
}
