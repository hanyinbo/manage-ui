import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { FinanceRoutingModule } from './finance-routing.module';
import { BrokerageListComponent } from './brokerage-list/brokerage-list.component';


@NgModule({
  declarations: [BrokerageListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FinanceRoutingModule,
  
  ]
})
export class FinanceModule { }
