import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommentListComponent } from '../recomment/recomment-list/recomment-list.component';
const routes: Routes = [
  {
    path: 'list',
    component: RecommentListComponent,
    data: {
      breadcrumb: '报备列表'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommentRoutingModule { }
