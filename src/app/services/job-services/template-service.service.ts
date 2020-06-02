import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class TemplateServiceService {

  constructor() { }

  public convertToPDF(content,name) {
    var data = content;
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(name +'.pdf'); // Generated PDF
      confirm('Your file Downloaded.')
    });
  }
}
