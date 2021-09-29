import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
  // login(userName: string, password: string): Observable<Login> {
  //   // const url = `${this.configUrl}/${id}`
  //   const params = new HttpParams({
  //     fromString: 'userName=' + userName
  //   });
  //   // return this.http.post<Login>(this.configUrl,)
  // }
  login(userName: string, password: string): Observable<Result> {
    // const   d = new URLSearchParams();
    // d.append('use',   'value' );
    // d.append('para1',   'value' );

    //  this.http.post(AUTH_API,params).subscribe(res=>{
    //   this.router.navigateByUrl("/login");
    // });
    const s = AUTH_API + `?userName=${userName}&password=${password}`;
    console.log(s);
    this.http.get<Result>(AUTH_API + `?userName=${userName}&password=${password}`, httpOptions)
  }
}
