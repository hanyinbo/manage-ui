import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationListComponent } from './navigation-list/navigation-list.component';

const routes: Routes = [
  {
    path: 'navigationList',
    component: NavigationListComponent,
    data: {
      breadcrumb: '导航列表'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiniProgramsRoutingModule { }
