import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnightErrantListComponent } from './knight-errant-list/knight-errant-list.component';
import { KnightErrantSettingsComponent } from './knight-errant-settings/knight-errant-settings.component';
const routes: Routes = [
  {
    path: 'list',
    component: KnightErrantListComponent,
    data: {
      breadcrumb: '侍卫名单'
    },
  },
  {
    path: 'settings',
    component: KnightErrantSettingsComponent,
    data: {
      breadcrumb: '名单设置'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnightErrantRoutingModule { }
