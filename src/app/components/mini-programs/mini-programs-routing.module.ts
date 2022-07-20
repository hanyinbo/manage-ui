import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationListComponent } from './navigation-list/navigation-list.component';

const routes: Routes = [
  {
    path: 'navigationList',
    component: NavigationListComponent,
    data: {
      breadcrumb: '导航设置'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiniProgramsRoutingModule { }
