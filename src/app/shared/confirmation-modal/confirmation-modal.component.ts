import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(private elRef: ElementRef) { }
  @Output() confirm = new EventEmitter();
  @Output() close = new EventEmitter()
  ngOnInit(): void {
    document.body.append(this.elRef.nativeElement)
  }
  onCloseClick() {
    this.close.emit();
  }
  confirmation(value) {
    if (value === true) {
      this.confirm.emit(true)
    } else {
      this.confirm.emit(false);
    }
  }
}
