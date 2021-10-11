import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import axios from 'axios';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {
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
}
