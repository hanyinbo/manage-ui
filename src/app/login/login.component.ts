import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from './login.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  validateForm!: FormGroup;
  public list: any[] = [];

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private loginService: LoginService,
    private http: HttpClient
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
    debugger;
    if (this.validateForm.status === 'VALID') {
      let { userName, password } = this.validateForm.value;
      const api = `http://localhost:8080/auth/login?username=` + `${userName}` + `&password=` + `${password}`;
      console.log("api地址" + api);
      this.loginService.axiosLogin(api).then(response => {
        console.log("响应规定response：" + response.code);
        if (response.code == 200) {
          alert("登录成功")
        }
      })
      //内置http请求
      // this.http.get(api).subscribe((response: any)=>{
      //   console.log(response);
      //   alert(response);
      // })

    }
  }


}