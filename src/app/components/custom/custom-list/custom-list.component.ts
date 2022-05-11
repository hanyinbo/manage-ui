import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { CustomService } from '../custom.service';
import { Custom } from '../custom-type';
@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css']
})
export class CustomListComponent implements OnInit {

  isShowInfoCustomModel = false;
  isShowEditCustomModel = false;
  isShowAddCustomModel = false;

  customAddForm: FormGroup;
  customSearchForm: FormGroup;
  customForm: FormGroup;

  isCollapse = false;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Custom[] = [];
  listOfData: Array<Custom>;
  setOfCheckedId = new Set<bigint>();

  constructor(private customService: CustomService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {
    // 新增
    this.customAddForm = this.fb.group({
      id: [''],
      cusName: ['', [Validators.required]],
      gender: ['0'],
      telPhone: ['']
    });
    // 编辑、详情
    this.customForm = this.fb.group({
      id: [''],
      cusName: ['', [Validators.required]],
      gender: [''],
      telPhone: ['']
    });
    // 搜索
    this.customSearchForm = this.fb.group({
      cusName: [''],
      gender: [''],
      telPhone: ['']
    })
  }

  optionList = [
    { label: '男', value: 0 },
    { label: '女', value: 1 }
  ];
  ngOnInit(): void {
    this.fetchCustomList();
  }

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

  onCurrentPageDataChange($event: readonly Custom[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  // 获取客户列表
  fetchCustomList() {
    const body = {
      'size': 5,
      'current': 1
    }
    this.customService.getCoustomOfPage(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }
  // 详情取消按钮
  handleInfoCustomCancel() {
    this.isShowInfoCustomModel = false;
  }
  // 点击详情按钮
  showInfoModal(id: bigint): void {
    this.isShowInfoCustomModel = true;
    this.customService.getCustomData(id).subscribe(res => {
      if (res.code == 200) {
        console.log('客户信息：' + JSON.stringify(res.data))
        this.customForm.patchValue(res.data)
      }
    })
  }
  // 点击修改按钮
  showEditModal(id: bigint): void {
    console.log('修改按钮按钮时间ID:' + id)
    this.isShowEditCustomModel = true;
    // this.editUserId = id;
    this.customService.getCustomData(id).subscribe(res => {
      if (res.code == 200) {
        console.log('客户信息：' + JSON.stringify(res.data))
        this.customForm.patchValue(res.data)
      }
    });
  }
  // 编辑取消按钮
  handleEditCustomCancel() {
    this.isShowEditCustomModel = false;
  }
  // 编辑确认
  handleEditPositionOk(event: Event, value: FormGroup) {
    this.isShowEditCustomModel = false;
    const editCustomForm = this.customForm;
    const { controls } = editCustomForm;

    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty()
      controls[key].updateValueAndValidity()
    })
    const param = { ...this.customForm.value };
    console.log('修改客户入参：' + JSON.stringify(param))
    this.customService.updateCustom(param).subscribe(res => {
      console.log('响应值：' + JSON.stringify(res))
      if (res.code == 200) {
        console.log('修改结果：' + res.data)
        this.fetchCustomList();
        this.nzMessageService.create('success', '修改客户成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 取消删除
  delCancel() {
    this.nzMessageService.info('取消删除', { nzDuration: 1000 });
  }
  // 删除确认
  delConfirm(id: bigint) {
    console.log('删除ID:' + id)
    this.customService.delCustom(id).subscribe(res => {
      console.log('删除调用接口返回:' + res)
      if (res.code == 200) {
        this.listOfData = this.listOfData.filter(custom => custom.id != id)
        this.nzMessageService.create('success', '删除客户成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 查询
  search() {
    for (const i in this.customSearchForm.controls) {
      this.customSearchForm.controls[i].markAsDirty();
      this.customSearchForm.controls[i].updateValueAndValidity();
    }
    let { cusName, gender, telPhone } = this.customSearchForm.value;
    const body = {
      'cusName': cusName,
      'gender': gender == null ? '' : gender,
      'telPhone': telPhone,
      'size': 5,
      'current': 1
    }
    this.customService.getCoustomOfPage(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }
  // 重置
  resetForm() {
    this.customSearchForm.reset({
      cusName: [''],
      gender: [''],
      telPhone: ['']
    })
  }
  // 新增
  showAddModal() {
    this.isShowAddCustomModel = true;
  }

  // 新增取消按钮
  handleAddCustomCancel() {
    this.isShowAddCustomModel = false;
  }
  // 新增确认按钮
  handleAddCustomOk(event: Event, value: FormGroup) {
    Object.keys(this.customAddForm.controls).forEach(key => {
      this.customAddForm.controls[key].markAsDirty()
      this.customAddForm.controls[key].updateValueAndValidity()
    })
    if (this.customAddForm.valid) {
      this.isShowAddCustomModel = false;
      this.customService.addCustom(this.customAddForm.value).subscribe(res => {
        console.log('响应值：' + JSON.stringify(res))
        if (res.code == 200) {
          console.log('修改结果：' + res.data)
          this.fetchCustomList();
          this.customAddForm.reset({ gender: '0' });
          this.nzMessageService.create('success', '新增客户成功');
        } else {
          this.nzMessageService.create('error', res.msg);
        }
      })
    }
  }
  // 刷新
  refleshData(){
    this.fetchCustomList();
  }
}
