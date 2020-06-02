import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-exporttocsv',
  templateUrl: './exporttocsv.component.html',
  styleUrls: ['./exporttocsv.component.css']
})
export class ExporttocsvComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  exportDatas() {
    var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "csv.csv");
  }
}
