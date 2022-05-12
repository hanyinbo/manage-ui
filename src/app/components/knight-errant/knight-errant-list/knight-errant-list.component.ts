import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { KnightErrant } from '../knight-errant-type';
import { KnightErrantService } from '../knight-errant.service';

@Component({
  selector: 'app-knight-errant-list',
  templateUrl: './knight-errant-list.component.html',
  styleUrls: ['./knight-errant-list.component.css']
})
export class KnightErrantListComponent implements OnInit {

  isCollapse = false;
  inputValue: string;
  editUserId: bigint;
  isShowInfoUserModel = false;
  isShowEditUserModel = false;
  isShowAddUserModel = false;
  userForm: FormGroup;
  userSearchForm: FormGroup;
  userAddForm: FormGroup;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly KnightErrant[] = [];
  listOfData: Array<KnightErrant>;
  setOfCheckedId = new Set<bigint>();

  optionList = [
    { label: '男', value: 0},
    { label: '女', value: 1}
  ];
  identityList =[
    {label: '游客',value: 0},
    {label: '侍卫',value: 1}
  ]
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);
  updateCheckedSet(id: bigint, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: bigint, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly KnightErrant[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  constructor(private knightErrantService: KnightErrantService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {
    // 编辑、详情
    this.userForm = this.fb.group({
      id: [''],
      nickName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      phone: [''],
      city: [''],
      address: [''],
      identity: ['', [Validators.required]],
      activeCode: ['', [Validators.required]]
    });
    // 表单搜索
    this.userSearchForm = this.fb.group({
      id: [''],
      nickName: [''],
      gender: [''],
      age: [''],
      phone: [''],
      city: [''],
      address: [''],
      identity: [''],
      activeCode: ['']
    });

     // 新增
     this.userAddForm = this.fb.group({
      id: [''],
      nickName: ['', [Validators.required]],
      gender: ['0'],
      age: ['', [Validators.required]],
      phone: [''],
      city: [''],
      address: [''],
      identity: ['', [Validators.required]],
      activeCode: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.fetchUserList();
  }

  // 点击详情按钮
  showInfoModal(id: bigint): void {
    this.isShowInfoUserModel = true;
    this.knightErrantService.getUserById(id).subscribe(res => {
      if (res.code == 200) {
        console.log('公司信息：' + JSON.stringify(res.data))
        this.userForm.patchValue(res.data)
        
      }
    })
  }
  // 点击公司详情右上角按钮
  handleInfoUserCancel(): void {
    this.isShowInfoUserModel = false;
  }
  // 获取用户列表
  fetchUserList() {
    this.knightErrantService.getWxUerList().subscribe(res => {
      this.listOfData = res.data;
      console.log(this.listOfData)
    })
  }
  // 点击修改按钮
  showEditModal(id: bigint): void {
    console.log('修改公司按钮时间ID:' + id)
    this.isShowEditUserModel = true;
    this.editUserId = id;
    this.knightErrantService.getUserById(id).subscribe(res => {
      if (res.code == 200) {
        console.log('公司信息：' + JSON.stringify(res.data))
        this.userForm.patchValue(res.data)
      }
    });
  }
  // 点击编辑用户取消按钮
  handleEditUserCancel(): void {
    this.isShowEditUserModel = false;
  }
  // 点击编辑公司确认按钮
  handleEditUserOk(e: Event, value: FormGroup): void {
    this.isShowEditUserModel = false;
    const editUserForm = this.userForm;
    const { controls } = editUserForm;

    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty()
      controls[key].updateValueAndValidity()
    })
    const param = { ...this.userForm.value, id: this.editUserId };
    console.log('修改公司入参：' + JSON.stringify(param))
    this.knightErrantService.updateUser(param).subscribe(res => {
      console.log('响应值：' + JSON.stringify(res))
      if (res.code == 200) {
        console.log('修改结果：' + res.data)
        this.fetchUserList();
        this.nzMessageService.create('success', '修改用户成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 删除公司
  delConfirm(id: bigint) {
    console.log('删除ID:' + id)
    this.knightErrantService.delUser(id).subscribe(res => {
      console.log('删除调用接口返回:' + res)
      if (res.code == 200) {
        this.listOfData = this.listOfData.filter(user => user.id != id)
        this.nzMessageService.create('success', '删除用户成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 取消删除
  delCancel() {
    this.nzMessageService.info('取消删除', { nzDuration: 1000 });
  }
  // 查询
  search() {
    for (const i in this.userSearchForm.controls) {
      this.userSearchForm.controls[i].markAsDirty();
      this.userSearchForm.controls[i].updateValueAndValidity();
    }
    let { nickName, gender, city, phone, activeCode,identity } = this.userSearchForm.value;
    const body = {
      'nickName': nickName,
      'gender': gender==null?'':gender,
      'city': city,
      'phone': phone,
      'activeCode': activeCode,
      'identity':identity,
      'size': 5,
      'current': 1
    }
    this.knightErrantService.getWxUerPage(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }
  // 重置查询表单
  resetForm(): void {
    this.userSearchForm.reset({
      nickName: [''],
      gender: [''],
      age: [''],
      phone: [''],
      city: [''],
      address: [''],
      identity: [''],
      activeCode: ['']
    });
  }
  // 点击新增按钮
  showAddModal(): void {
    this.isShowAddUserModel = true;
  }
  // 点击新增用户确认按钮
  handleAddUserOk(e: Event, value: FormGroup): void {
    console.log('Button ok clicked!');

    Object.keys(this.userAddForm.controls).forEach(key =>{
      this.userAddForm.controls[key].markAsDirty() 
      this.userAddForm.controls[key].updateValueAndValidity()
    })
    if (this.userAddForm.valid) {
      this.isShowAddUserModel = false;
      this.knightErrantService.addUser(this.userAddForm.value).subscribe(res => {
        console.log('响应值：' + JSON.stringify(res))
        if (res.code == 200) {
          console.log('修改结果：' + res.data)
          this.fetchUserList();
          this.userAddForm.reset({gender: '0'});
          this.nzMessageService.create('success', '新增用户成功');
        } else {
          this.nzMessageService.create('error', res.msg);
        }
      })
    }

  }
  // 点击新增用户取消按钮
  handleAddUserCancel(){
    this.isShowAddUserModel=false;
  }
}
