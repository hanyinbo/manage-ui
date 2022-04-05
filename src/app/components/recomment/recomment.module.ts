import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { RecommentRoutingModule } from './recomment-routing.module';
import { RecommentListComponent } from './recomment-list/recomment-list.component';


@NgModule({
  declarations: [RecommentListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RecommentRoutingModule
  ]
})
export class RecommentModule { }
