import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { URL} from '../../config';
import { Result } from '../../system/result/result';
import { Recomment } from './recomment-type';


const headers = new HttpHeaders()
  .set('content-Type', 'application/json;charset=UTF-8"')

@Injectable({
  providedIn: 'root'
})
export class RecommentService {

  constructor(private httpClient: HttpClient) { }

  // 获取报备列表
  getRecommentList(){
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentList`)
  }
  // 获取报备详情
  getRecommentById(id:bigint){
   return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentById/${id}`);
  }
  // 删除报备
  delRecomment(id:bigint){
    return this.httpClient.delete<Result<Boolean>>(`${URL}/mini/delRecomment/${id}`);
  }
  // 修改报备
  updateRecomment(param:Recomment){
    return this.httpClient.put<Result<Boolean>>(`${URL}/mini/updateRecomment`,param);
  }
  // 分页获取报备信息
  getRecommentOfPage(body:any){
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentOfPage`, { params: body, headers: headers })
  }
}
