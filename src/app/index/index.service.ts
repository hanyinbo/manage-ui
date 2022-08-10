import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Result } from '../system/result/result';
import { Menu } from './menu';

import { URL } from '../config';
@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http: HttpClient) { }
  
  //退出 调用删除服务器token接口
  logout() {
    const token = localStorage.getItem('itcast-token');
    return this.http.delete(`${URL}/tokens`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 获取登录菜单
  getMenu() {
    return this.http.get<Result<Menu[]>>(`${URL}/api/manage/menu/getMenu`)
  }


}
