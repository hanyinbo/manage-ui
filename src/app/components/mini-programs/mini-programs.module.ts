import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { MiniProgramsRoutingModule } from './mini-programs-routing.module';
import { NavigationListComponent } from './navigation-list/navigation-list.component';


@NgModule({
  declarations: [NavigationListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    MiniProgramsRoutingModule
  ]
})
export class MiniProgramsModule { }
