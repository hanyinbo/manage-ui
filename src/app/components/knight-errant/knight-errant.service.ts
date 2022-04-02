import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL} from '../../config';
import { Result } from '../../system/result/result';
import { KnightErrant } from './knight-errant-type';
@Injectable({
  providedIn: 'root'
})
export class KnightErrantService {

  constructor(private http:HttpClient) { 

  
  }
    //分页获取侍卫信息
    getWxUerList(){
      const token = localStorage.getItem('itcast-token')

      // this.http.get(`${URL}/mini/getWxUerList`).subscribe(res=>{
      //   re
      // })
      return this.http.get<Result<KnightErrant[]>>(`${URL}/mini/getWxUerList`)
    }
}
