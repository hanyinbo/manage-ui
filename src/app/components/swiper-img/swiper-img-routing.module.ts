import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSwiperComponent} from './home-swiper/home-swiper.component';
import { CompanySwiperComponent } from './company-swiper/company-swiper.component';
const routes: Routes = [
  {
    path: 'homeSwiper',
    component: HomeSwiperComponent
  },
  {
    path: 'companySwiper',
    component: CompanySwiperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwiperImgRoutingModule { }
