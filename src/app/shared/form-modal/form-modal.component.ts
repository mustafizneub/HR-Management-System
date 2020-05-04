import { Component, OnInit, ElementRef, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  // @Input() employeeData;
  constructor(private elRef: ElementRef) {
  }
  ngOnInit(): void {
    document.body.append(this.elRef.nativeElement)
  }
  ngOnDestroy() {
    this.elRef.nativeElement.remove()
  }
  onCloseClick() {
    this.close.emit()
  }

}
