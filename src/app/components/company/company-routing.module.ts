import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PositionListComponent } from './position-list/position-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { RecruitSettingComponent} from './recruit-setting/recruit-setting.component'; 
const routes: Routes = [
  {
    path: 'list',
    component: CompanyListComponent,
    data: {
      breadcrumb: '公司列表'
    },
  },
  {
    path: 'recruit-setting',
    component: RecruitSettingComponent,
    data: {
      breadcrumb: '招聘设置'
    },
  },
  {
    path: 'position-list',
    component: PositionListComponent,
    data: {
      breadcrumb: '职位设置'
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
