import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptors implements HttpInterceptor {
    //拦截使用httpclient 发送的请求
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ):Observable<HttpEvent<any>> {
        const token = localStorage.getItem('itcast-token')
        // console.log("http:拦截器")
        const authReq = req.clone({
            headers: req.headers.set('Authorization',`Bearer ${token}`)
        });

        return next.handle(req)
    }

}