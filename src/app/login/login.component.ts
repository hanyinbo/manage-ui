import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from './login.service';
import { Result } from '../share/result';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    debugger;
    if (this.validateForm.status === 'VALID') {
      debugger
      let { userName, password } = this.validateForm.value;
      // if (userName == 'admin' && password == '123456') {
      //   this.message.create('success', '登录成功');
      // } else {
      //   this.message.create('error', '用户名密码错误');
      // }
      let params = this.validateForm.value;
      this.loginService.login<Result>(userName, password);
      console.log("调用接口成功：" + userName + "---pasword---" + password);
    }
  }

}
