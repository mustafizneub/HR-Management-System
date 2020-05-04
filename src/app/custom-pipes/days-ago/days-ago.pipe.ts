import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let current_time = Date.now();
    let difference = current_time - parseInt(value);
    let time = Math.floor((difference / 1000) / 3600);
    if (time < 24) {
      return `${time} hours ago`;
    } else {
      let day = Math.floor(time / 24);
      if (day === 1) {
        return `${day} day ago`
      }
      return `${day} days ago`
    }

  }

}
