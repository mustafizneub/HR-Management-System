import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FilterOneComponent } from './filter-one/filter-one.component';
import { FilterTwoComponent } from './filter-two/filter-two.component';
import { TableComponent } from './table/table.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ErrorsComponent } from './errors/errors.component';
import { SuccessComponent } from './success/success.component';



@NgModule({
  declarations: [HeaderComponent, FilterOneComponent, FilterTwoComponent, TableComponent, FormModalComponent, ConfirmationModalComponent, ErrorsComponent, SuccessComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [HeaderComponent, FilterOneComponent, FilterTwoComponent, TableComponent, FormModalComponent, ConfirmationModalComponent, ErrorsComponent, SuccessComponent]
})
export class SharedModule { }
