import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyListComponent } from './company-list/company-list.component';
import { RecruitSettingComponent} from './recruit-setting/recruit-setting.component'; 
const routes: Routes = [
  {
    path: 'list',
    component: CompanyListComponent
  },
  {
    path: 'recruit-setting',
    component: RecruitSettingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
