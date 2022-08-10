import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

import { IndexService } from './index.service';
import { Menu } from './menu';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isCollapsed = false;


  mode = false;
  dark = false;

  menuList : Array<Menu>;
 
  constructor(private indexSevice: IndexService, private nzMessageService: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.getMenu();
  }

  //退出
  logout() {
    // 清除本地tokens
    localStorage.clear();

    this.router.navigate(['/login'])
  }


  getMenu() {
    this.indexSevice.getMenu().subscribe(res => {
      this.menuList = res.data;
    });
  }

}
