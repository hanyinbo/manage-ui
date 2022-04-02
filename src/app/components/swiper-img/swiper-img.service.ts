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

  getSwiperImgList(){
    return this.http.get<Result<SwiperImg[]>>(`${URL}/mini/getSwiperImgList`)
  }
}
