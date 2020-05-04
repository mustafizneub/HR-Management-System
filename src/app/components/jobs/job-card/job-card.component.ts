import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

  @Input() job;
  constructor() { }

  ngOnInit(): void { }

}
