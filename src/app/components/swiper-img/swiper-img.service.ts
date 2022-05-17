import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL} from '../../config';
import { Result } from '../../system/result/result';
import { SwiperImg } from './swiper-img-type';
@Injectable({
  providedIn: 'root'
})
export class SwiperImgService {

  constructor(private http:HttpClient) { }

  // 获取轮播图片
  getSwiperImgList(){
    return this.http.get<Result<SwiperImg[]>>(`${URL}/mini/getSwiperImgList`)
  }
  // 删除图片
  deleteSwiperImg(id:bigint){
    return this.http.delete<Result<Boolean>>(`${URL}/mini/deleteHomeSwiper/${id}`)
  }
  // 修改轮播图信息
  updateSwiperImg(param:SwiperImg){
    return this.http.put<Result<Boolean>>(`${URL}/mini/updateHomeSwiper`,param)
  }
  // 获取轮播图详情
  getSwiperImgInfo(id:bigint){
    return this.http.get<Result<SwiperImg>>(`${URL}/mini/getSwiperImgInfo/${id}`)
  }
}
