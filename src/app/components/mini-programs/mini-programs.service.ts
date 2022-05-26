import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL } from '../../config';
import { Result } from '../../system/result/result';
import { NavigationImg } from './mini-type';
@Injectable({
  providedIn: 'root'
})
export class MiniProgramsService {

  constructor(private http: HttpClient) { }

  // 获取导航列表
  getNavImgList() {
    return this.http.get<Result<NavigationImg[]>>(`${URL}/mini/getNavImgList`)
  }
  // 删除图片
  deleteMiniNavImg(id: bigint) {
    return this.http.delete<Result<Boolean>>(`${URL}/mini/deleteMiniNavImg/${id}`)
  }
  // 修改导航栏信息
  updateCarouselOrNavUrl(param: NavigationImg) {
    return this.http.put<Result<Boolean>>(`${URL}/mini/updateCarouselOrNavUrl`, param)
  }
   // 获取导航栏详情
   getCarouselOrNavImgInfo(id:bigint){
    return this.http.get<Result<NavigationImg>>(`${URL}/mini/getCarouselOrNavImgInfo/${id}`)
  }

}
