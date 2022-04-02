import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { KnightErrantRoutingModule } from './knight-errant-routing.module';
import { KnightErrantListComponent } from './knight-errant-list/knight-errant-list.component';
import { KnightErrantSettingsComponent } from './knight-errant-settings/knight-errant-settings.component';


@NgModule({
  declarations: [KnightErrantListComponent, KnightErrantSettingsComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    KnightErrantRoutingModule
  ]
})
export class KnightErrantModule { }
