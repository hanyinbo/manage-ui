import { Component, OnInit } from '@angular/core';


import { NzMessageService } from 'ng-zorro-antd/message';

import  { IndexService } from './index.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  {

  isCollapsed = false;
  
  constructor(private indexSevice:IndexService,private nzMessageService: NzMessageService, private router: Router) { }



  //退出
  logout(){
    // 清除本地tokens
    localStorage.clear();

    this.router.navigate(['/login'])
  }
  


}
