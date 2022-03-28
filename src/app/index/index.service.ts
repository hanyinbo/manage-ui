import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {URL} from '../config';
@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http: HttpClient) { }

  //退出 调用删除服务器token接口
  logout(){
    const token = localStorage.getItem('itcast-token');
   return this.http.delete(`${URL}/tokens`,{
     headers: {
       Authorization: `Bearer ${token}`
     }
   });
  }
  
}
