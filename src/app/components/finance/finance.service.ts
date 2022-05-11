import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { URL } from '../../config';
import { Result } from '../../system/result/result';
import { Brokerage } from './finance-type';

const headers = new HttpHeaders()
  .set('content-Type', 'application/json;charset=UTF-8"')

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  // 分页获取全部佣金
  getAllBrokeragePage(body:any){
    return this.http.get<Result<Brokerage[]>>(`${URL}/mini/getAllBrokeragePage`, { params: body, headers: headers });
  }
  // 分页获取未结佣
  getNotBrokeragePage(body:any){
    return this.http.get<Result<Brokerage[]>>(`${URL}/mini/getNotBrokeragePage`, { params: body, headers: headers });
  }
  // 分页获取已结佣
  getOkBrokeragePage(body:any){
    return this.http.get<Result<Brokerage[]>>(`${URL}/mini/getOkBrokeragePage`, { params: body, headers: headers });
  }
  // 获取佣金详情
  getWxBrokerageInfo(id:bigint){
     return this.http.get<Result<Brokerage[]>>(`${URL}/mini/getWxBrokerageInfo/${id}`);
  }
  // 删除佣金详情
  delWxBrokerage(id:bigint){
     return this.http.delete<Result<Boolean>>(`${URL}/mini/delWxBrokerage/${id}`);
  }
  // 更新佣金详情
  updateWxBrokerage(param:Brokerage){
    return this.http.put<Result<Boolean>>(`${URL}/mini/updateWxBrokerage`,param);
 }
//  结佣
settleBrokerage(param:Array<bigint>){
  return this.http.put<Result<Boolean>>(`${URL}/mini/settleBrokerage`,param);
}
}
