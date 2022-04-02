import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from './company-list/company-list.component';

@NgModule({
  declarations: [CompanyListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
