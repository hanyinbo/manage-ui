import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSwiperComponent} from './home-swiper/home-swiper.component';
import { CompanySwiperComponent } from './company-swiper/company-swiper.component';
const routes: Routes = [
  {
    path: 'homeSwiper',
    component: HomeSwiperComponent,
    data: {
      breadcrumb: '轮播图设置'
    },
  },
  {
    path: 'companySwiper',
    component: CompanySwiperComponent,
    data: {
      breadcrumb: '公司导航图设置'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwiperImgRoutingModule { }
