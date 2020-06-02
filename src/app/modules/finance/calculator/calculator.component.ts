import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  isCollapsed:boolean = true;
  calculateBox:any = '';
  output:any = 'Result';
  switch:boolean = false;
  @ViewChild('equation') equation:ElementRef;

  constructor( private elementRef: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => this.equation.nativeElement.focus());
     var m = document.getElementById('calculator');
     m.addEventListener('mousedown', mouseDown, false);
     window.addEventListener('mouseup', mouseUp, false);
     
     function mouseUp() {
         window.removeEventListener('mousemove', moving, true);
     }

     function mouseDown(e:any) {
         window.addEventListener('mousemove', moving, true);
     }
 
     function moving(e:any) {
           m.style.top = (e.clientY - 10) + 'px';
           m.style.left = (e.clientX - 20) + 'px';
           document.getElementById('inputbox').focus();
      };
  }

  ngAfterViewInit(){
    document.getElementById('inputbox').focus();
  }


  switchCalculator() {
    this.isCollapsed = ! this.isCollapsed;
    this.ngOnInit();
  }
  goInitialState() {
    this.calculateBox = '';
    this.ngOnInit();
  }
  removeElement() {
    this.calculateBox = '';
    this.ngOnInit();
  }
  addToDisplay(item:any) {
       this.ngOnInit();
       var s = item;
       s = s.replace(/^0+/, "");
       this.calculateBox =  this.calculateBox + item;
  }
  getResult(equation:any) {
    this.output = eval(equation);
    this.ngOnInit();
  }
}    

                                      