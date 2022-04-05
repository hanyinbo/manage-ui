import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';

import { MiniProgramsRoutingModule } from './mini-programs-routing.module';
import { NavigationListComponent } from './navigation-list/navigation-list.component';


@NgModule({
  declarations: [NavigationListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MiniProgramsRoutingModule
  ]
})
export class MiniProgramsModule { }
