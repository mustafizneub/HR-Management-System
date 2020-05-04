import { LeaveRequestsService } from './../../services/leave-requests/leave-requests.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-two',
  templateUrl: './filter-two.component.html',
  styleUrls: ['./filter-two.component.css']
})
export class FilterTwoComponent implements OnInit {

  data = [];

  @Output() filter = new EventEmitter();
  leave_status: any;
  leave_type: any;

  constructor(private leaveReqService: LeaveRequestsService) { }

  ngOnInit(): void {
    this.leaveReqService.getLeaveRequests().valueChanges().subscribe(e => {
      this.data = e;
    });
  }

  leaveType(event) {
    this.leave_type = event.target.value;
  }
  leaveStatus(event) {
    this.leave_status = event.target.value
  }
  getElem() {
    let filter = []
    let inp1 = document.getElementById('type-one').firstChild.firstChild;
    let inp3 = document.getElementById('type-three').firstChild.firstChild;
    let inp4 = document.getElementById('type-four').firstChild.firstChild;

    let inp1Val = (<HTMLInputElement>inp1).value;
    let inp3Val = (<HTMLInputElement>inp3).value
    let inp4Val = (<HTMLInputElement>inp4).value


    let inp1Id = (<HTMLInputElement>inp1).id;
    let inp3Id = (<HTMLInputElement>inp3).id;
    let inp4Id = (<HTMLInputElement>inp4).id;

    let filteredData = []

    if (inp1Val || inp3Val || inp4Val || this.leave_type || this.leave_status) {
      this.data.forEach(e => {
        if (inp1Val) {

          if (e[inp1Id].toLowerCase().includes(inp1Val.toLowerCase())) {
            if (!filter.includes(e.id)) {
              filter.push(e.id)
              filteredData.push(e)
            }

          }
        }
        if (inp3Val) {
          if (e[inp3Id] === inp3Val) {
            if (!filter.includes(e.id)) {
              filter.push(e.d)
              filteredData.push(e)
            }
          }
        }
        if (inp4Val) {
          if (e[inp4Id] === inp4Val) {
            if (!filter.includes(e.id)) {
              filter.push(e.id)
              filteredData.push(e)
            }
          }
        }
        if (this.leave_type) {
          if (e['leave_type'].toLowerCase().includes(this.leave_type.toLowerCase())) {
            if (!filter.includes(e.id)) {
              filter.push(e.employe_id)
              filteredData.push(e)
            }
          }
        }
        if (this.leave_status) {
          if (e['status'].toLowerCase().includes(this.leave_status.toLowerCase())) {
            if (!filter.includes(e.id)) {
              filter.push(e.employe_id)
              filteredData.push(e)
            }
          }
        }
      })
      this.filter.emit(filteredData);
    }

  }
  resetData() {
    this.filter.emit(this.data)
  }

}
