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
  // menuList = [
  //   {
  //     level: 1,
  //     title: 'Mail Group',
  //     icon: 'mail',
  //     open: true,
  //     selected: false,
  //     disabled: false,
  //     children: [
  //       {
  //         level: 2,
  //         title: 'Group 1',
  //         icon: 'bars',
  //         open: false,
  //         selected: false,
  //         disabled: false,
  //         children: [
  //           {
  //             level: 3,
  //             title: 'Option 1',
  //             selected: false,
  //             disabled: false
  //           },
  //           {
  //             level: 3,
  //             title: 'Option 2',
  //             selected: false,
  //             disabled: true
  //           }
  //         ]
  //       },
  //       {
  //         level: 2,
  //         title: 'Group 2',
  //         icon: 'bars',
  //         selected: true,
  //         disabled: false
  //       },
  //       {
  //         level: 2,
  //         title: 'Group 3',
  //         icon: 'bars',
  //         selected: false,
  //         disabled: false
  //       }
  //     ]
  //   },
  //   {
  //     level: 1,
  //     title: 'Team Group',
  //     icon: 'team',
  //     open: false,
  //     selected: false,
  //     disabled: false,
  //     children: [
  //       {
  //         level: 2,
  //         title: 'User 1',
  //         icon: 'user',
  //         selected: false,
  //         disabled: false
  //       },
  //       {
  //         level: 2,
  //         title: 'User 2',
  //         icon: 'user',
  //         selected: false,
  //         disabled: false
  //       }
  //     ]
  //   }
  // ];
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
      //console.log('获取菜单：'+JSON.stringify(res.data));
      this.menuList = res.data;
      console.log('获取菜单：' + JSON.stringify(this.menuList));
    });
  }

}
