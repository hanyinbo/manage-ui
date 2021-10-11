import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AES, mode, pad, enc } from 'crypto-js';

import { LoginService } from './login.service';
import { Result } from '../share/result';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  public result: Result;
  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.status === 'VALID') {
      let { userName, password } = this.validateForm.value;
      //密码加密
      let encPassword = this.encryptByEnAES(password)
      console.log("加密后的密码："+encPassword);
      let api = `http://localhost:8080/auth/login?username=` + `${userName}` + `&password=` + `${encPassword}`;
      console.log("api地址" + api);
      this.loginService.axiosLogin(api).then((res) => {
        console.log("返回值"+JSON.stringify(res))
        var data = JSON.parse(JSON.stringify(res));
        console.log("解析返回值："+data)
        console.log("获取返回code的值：" + data.code)
        if (data.code == 200) {
          //路由到首页
          //this.router.navigateByUrl('');
        } else {
          this.message.warning(data.msg);
        }
      }).catch((e) => {
        console.log("发生异常")
      })
    }
  }
  //aes加密
  encryptByEnAES(data: string): string {
    let Key = "aisonsyyds";
    let tmpAES = AES.encrypt(data, Key, {
      mode: mode.CBC,
      padding: pad.Pkcs7
    });
    return tmpAES.toString();
  }
}
