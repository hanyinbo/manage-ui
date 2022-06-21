import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoggerService } from '../system/log/logger.service';
import axios from 'axios';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap, delay } from 'rxjs/operators';
import { HttpErrorHandler } from '../system/error/http-error-handler.service';

import { R } from './login';
import { URL } from '../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private httpError: HttpErrorHandler,
    private logger: LoggerService
  ) {
  }
  axiosLogin(api: string) {
    return new Promise((resolve, reject) => {
      axios.get(api).then((res) => {
        resolve(res.data);
      }, (err) => {
        resolve(err.response.data)
      })
    }).catch((response) => {
      console.log(response.code)
    })
  }

  // 登录接口
  doLogin(body: any): Observable<any> {
    const produceName = "submitForm";
   

    this.logger.debugRequest(JSON.stringify('service层的请求Body:' + body), produceName);
    this.logger.info(JSON.stringify('service层的请求Body:' + body), produceName);

    return this.http.post<R>(`${URL}/login`,body, httpOptions)
      .pipe(
        retry(1),
        tap(data => this.logger.debugResponse(JSON.stringify(data), produceName)),
        catchError(this.httpError.handleError(this.logger.title + '.' + produceName))
      );
  }
  //封装了一个post请求 
  //  public ajaxPost(url:String, json:Object) {
  //   const httpoptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})
  //   };
  //   var api = this.config.domain + url;
  //   return new Promise((resove, reject) => {
  //     this.http.post(api, json, httpoptions).subscribe((response) => {
  //       resove(response);
  //     }, (error) => {
  //       reject(error);
  //     })
  //   })
  // }

  // dologin(json:Object){
  //   const httpoptions = {
  //         headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'})
  //       };

  //       return new Promise(()=>{
  //        axios.post(`http://localhost:8080/auth/login?`,json,httpoptions).then(res =>{
  //         console.log('res=>',res);    
  //        })
  //       })
  //   }

}
