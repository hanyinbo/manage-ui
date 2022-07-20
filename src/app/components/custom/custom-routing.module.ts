import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomListComponent } from './custom-list/custom-list.component';
const routes: Routes = [
  {
    path: 'custom-list',
    component: CustomListComponent,
    data: {
      breadcrumb: '客户列表'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoutingModule { }
