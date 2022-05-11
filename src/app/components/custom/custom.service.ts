import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { URL } from '../../config';
import { Result } from '../../system/result/result';
import { Custom } from './custom-type';

const headers = new HttpHeaders()
  .set('content-Type', 'application/json;charset=UTF-8"')

0
@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(private http: HttpClient) { }

  // 分页客户列表
  getCoustomOfPage(body: any) {
    return this.http.get<Result<Custom[]>>(`${URL}/mini/getWxCustomPage`, { params: body, headers: headers })
  }
  // 获取客户详情
  getCustomData(id: bigint) {
    return this.http.get<Result<Custom>>(`${URL}/mini/getWxCustomInfo/${id}`)
  }
  // 删除客户
  delCustom(id: bigint) {
    return this.http.delete<Result<Boolean>>(`${URL}/mini/delWxCustom/${id}`)
  }
  // 更新客户信息
  updateCustom(param: Custom) {
    return this.http.put<Result<Boolean>>(`${URL}/mini/updateWxCustom`, param)
  }
  // 新增客户
  addCustom(body: Custom) {
    return this.http.post<Result<Boolean>>(`${URL}/mini/addWxCustom`, body)
  }
  // 客户列表
  getWxCustomList(){
    return this.http.get<Result<Custom[]>>(`${URL}/mini/getWxCustomList`)
  }
}
