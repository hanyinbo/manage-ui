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
      let api = `http://localhost:8080/auth/login?username=` + `${userName}` + `&password=` + `${encPassword}`;
      console.log("api地址" + api);
      this.loginService.axiosLogin(api).then((res) => {
        var data = JSON.parse(JSON.stringify(res));
        console.log("获取返回code的值：" + data.code)
        if (data.code == 200) {
          //路由到首页
          //this.router.navigateByUrl('');
          this.message.success(data.msg);
        } else {
          this.message.warning(data.msg);
        }
      }).catch((e) => {
        console.log("发生异常")
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
