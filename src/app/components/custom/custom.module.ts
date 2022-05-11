import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { CustomRoutingModule } from './custom-routing.module';
import { CustomListComponent } from './custom-list/custom-list.component';


@NgModule({
  declarations: [CustomListComponent],
  imports: [
    CommonModule,
    CustomRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class CustomModule { }
