import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import axios from 'axios';

import { Login } from './login';
import { Router } from '@angular/router';
import { Result } from '../share/result';
const AUTH_API = 'http://localhost:8080/auth/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private router: Router) {

  }
  axiosLogin(api: string) {
    return new Promise<Result>((resolve, reject) => {
      axios.get(api).then(function (res) {
        resolve(res.data);
      }, (err: Result) => {
        resolve(err);
      })
    }).catch(function (err){
      
      return(err)
    })
    
  }
  // login(api: string) {
  //   this.http.get<Result>(api).subscribe((repose: Result) => {
        
  //   });
  // }

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
  public get(url: string){
     this.http.get( url);
  }
}
