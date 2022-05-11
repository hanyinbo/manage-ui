import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrokerageListComponent } from './brokerage-list/brokerage-list.component';
const routes: Routes = [
  {
    path: 'brokerage-list',
    component: BrokerageListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
