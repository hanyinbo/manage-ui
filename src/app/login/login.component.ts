import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as CryptoJS from 'crypto-js';
import { LoginService } from './login.service';
import { Result } from '../share/result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  captchaUlr: 'http://localhost:8080/captcha';
  validateForm!: FormGroup;
  captchaCode:Object;
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
      captcha: [null,[Validators.required]],
      remember: [true]
    });

    // this.getCaptcha();
  }

  getCaptcha(){
    this.loginService.getCaptchaCode().subscribe(res=>{
      this.captchaCode=res;
      console.log("获取code:"+res);
    })
  }
  // 提交登录
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      let { userName, password ,captcha} = this.validateForm.value;
      //密码加密
      let encPassword = this.encryptByEnAES(password);
      const body={
        'username':userName,
        'password':encPassword,
        'code': captcha
      }

      this.loginService.doLogin(body).subscribe((res) => {
        var data = JSON.parse(JSON.stringify(res));
        console.log("获取返回code的值：" + JSON.stringify(data.data.token))
        if (data.code == 200) {
          localStorage.setItem('itcast-token',data.data.token)
          //路由到首页
          this.message.success(data.msg);
          this.router.navigateByUrl('index');
        } else {
          this.message.warning(data.msg);
        }
      })
     }
  }

  //DES加密
  encryptByEnAES(password: string): string {

    var key = CryptoJS.enc.Utf8.parse("a5h*jos&fj18oico");

    var encrypted = CryptoJS.DES.encrypt(password, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

    return encrypted.ciphertext.toString();
  }
}
