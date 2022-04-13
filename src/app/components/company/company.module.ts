import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { RecruitSettingComponent } from './recruit-setting/recruit-setting.component';

@NgModule({
  declarations: [CompanyListComponent, RecruitSettingComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,

    CompanyRoutingModule
  ]
})
export class CompanyModule { }
