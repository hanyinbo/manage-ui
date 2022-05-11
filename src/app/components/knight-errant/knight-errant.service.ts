import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { URL } from '../../config';
import { Result } from '../../system/result/result';
import { KnightErrant } from './knight-errant-type';

const headers = new HttpHeaders()
  .set('content-Type', 'application/json;charset=UTF-8"')

@Injectable({
  providedIn: 'root'
})
export class KnightErrantService {

  constructor(private http: HttpClient) {


  }
  //获取侍卫信息
  getWxUerList() {
    const token = localStorage.getItem('itcast-token')
    return this.http.get<Result<KnightErrant[]>>(`${URL}/mini/getWxUerList`)
  }
  // 获取用户信息
  getUserById(id: bigint) {
    return this.http.get<Result<KnightErrant>>(`${URL}/mini/getUserInfo/${id}`)
  }
  // 更新用户信息
  updateUser(param: KnightErrant) {
    return this.http.put<Result<Boolean>>(`${URL}/mini/updateUser`, param)
  }
  // 删除用户
  delUser(id: bigint) {
    return this.http.delete<Result<Boolean>>(`${URL}/mini/delUserById/${id}`)
  }
  // 分页获取用户信息
  getWxUerPage(body: any) {
    return this.http.get<Result<KnightErrant[]>>(`${URL}/mini/getWxUerPage`, { params: body, headers: headers })
  }
  // 新增用户
  addUser(body:KnightErrant){
    return this.http.post<Result<Boolean>>(`${URL}/mini/addUser`,body)
  }
  // 获取推荐人列表
  getRecommentUserList(){
    return this.http.get<Result<KnightErrant[]>>(`${URL}/mini/getRecommentUserList`)
  }
}
