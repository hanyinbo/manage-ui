import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnightErrantListComponent } from './knight-errant-list/knight-errant-list.component';
import { KnightErrantSettingsComponent } from './knight-errant-settings/knight-errant-settings.component';
const routes: Routes = [
  {
    path: 'list',
    component: KnightErrantListComponent
  },
  {
    path: 'settings',
    component: KnightErrantSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnightErrantRoutingModule { }
