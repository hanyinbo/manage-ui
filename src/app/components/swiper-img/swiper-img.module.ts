import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { SwiperImgRoutingModule } from './swiper-img-routing.module';
import { HomeSwiperComponent } from './home-swiper/home-swiper.component';
import { CompanySwiperComponent } from './company-swiper/company-swiper.component';


@NgModule({
  declarations: [HomeSwiperComponent, CompanySwiperComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SwiperImgRoutingModule
  ]
})
export class SwiperImgModule { }
