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
  getCarouselImgList(){
    return this.http.get<Result<SwiperImg[]>>(`${URL}/mini/getCarouselImgList`)
  }
  // 删除图片
  deleteMiniCarouselImg(id:bigint){
    return this.http.delete<Result<Boolean>>(`${URL}/mini/deleteMiniCarouselImg/${id}`)
  }
  // 修改轮播图信息
  updateCarouselOrNavUrl(param:SwiperImg){
    return this.http.put<Result<Boolean>>(`${URL}/mini/updateCarouselOrNavUrl`,param)
  }
  // 获取轮播图详情
  getCarouselOrNavImgInfo(id:bigint){
    return this.http.get<Result<SwiperImg>>(`${URL}/mini/getCarouselOrNavImgInfo/${id}`)
  }
}
