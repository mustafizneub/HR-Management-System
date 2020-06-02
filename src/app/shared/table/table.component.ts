import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data = []
  @Input() t_headers = []
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor() { }

  ngOnInit(): void { }

  editOne(id) {
    this.edit.emit(id);
  }
  deleteOne(ids) {
    this.delete.emit(ids)
  }
}
