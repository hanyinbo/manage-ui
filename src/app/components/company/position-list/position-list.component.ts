import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { CompanyService } from '../company.service';
import { Position } from '../company-type';
@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

  positionAddForm: FormGroup;
  positionForm: FormGroup;
  positionSearchForm: FormGroup;
  isShowAddPositionModel = false;
  isShowInfoPositionModel = false;
  isShowEditPositionModel = false;

  editPositionId: bigint;
  isCollapse = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Position[] = [];
  listOfData: Array<Position>;
  setOfCheckedId = new Set<bigint>();

  constructor(private companyService: CompanyService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {
    // 新增
    this.positionAddForm = this.fb.group({
      id: [''],
      positionName: ['', [Validators.required]],
      positionCode: ['']
    });
    // 编辑、详情
    this.positionForm = this.fb.group({
      id: [''],
      positionName: ['', [Validators.required]],
      positionCode: ['']
    });
    // 搜索
    this.positionSearchForm = this.fb.group({
      positionName: [''],
      positionCode: ['']
    });
  }

  ngOnInit(): void {

    this.fetchPositionData();
  }

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

  onCurrentPageDataChange($event: readonly Position[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  // 获取职位列表
  fetchPositionData() {
    this.companyService.getPositionList().subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data;
      }
      console.log('获取职位列表：' + JSON.stringify(res))
    })
  }
  // 删除职位
  delConfirm(id: bigint) {
    console.log('删除ID:' + id)
    this.companyService.delPositionById(id).subscribe(res => {
      console.log('删除调用接口返回:' + res)
      if (res.code == 200) {
        this.listOfData = this.listOfData.filter(position => position.id != id)
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
  // 点击新增按钮
  showAddModal(): void {
    this.isShowAddPositionModel = true;
  }
  // 点击新增职位取消按钮
  handleAddPositionCancel() {
    this.isShowAddPositionModel = false;
  }
  // 点击新增职位确认按钮
  handleAddPositionOk(e: Event, value: FormGroup): void {
    Object.keys(this.positionAddForm.controls).forEach(key => {
      this.positionAddForm.controls[key].markAsDirty()
      this.positionAddForm.controls[key].updateValueAndValidity()
    })
    if (this.positionAddForm.valid) {
      this.isShowAddPositionModel = false;
      this.companyService.addPosition(this.positionAddForm.value).subscribe(res => {
        console.log('响应值：' + JSON.stringify(res))
        if (res.code == 200) {
          console.log('修改结果：' + res.data)
          this.fetchPositionData();
          this.positionAddForm.reset({ gender: '0' });
          this.nzMessageService.create('success', '新增职位成功');
        } else {
          this.nzMessageService.create('error', res.msg);
        }
      })
    }
  }
  // 点击职位详情右上角按钮
  handleInfoPositionCancel(): void {
    this.isShowInfoPositionModel = false;
  }
  // 点击详情按钮
  showInfoModal(id: bigint): void {
    this.isShowInfoPositionModel = true;
    this.companyService.getPositionInfo(id).subscribe(res => {
      if (res.code == 200) {
        console.log('职位信息：' + JSON.stringify(res.data))
        this.positionForm.patchValue(res.data)
      }
    })
  }
  // 点击修改按钮
  showEditModal(id: bigint): void {
    console.log('修改职位按钮时间ID:' + id)
    this.isShowEditPositionModel = true;
    this.editPositionId = id;
    this.companyService.getPositionInfo(id).subscribe(res => {
      if (res.code == 200) {
        console.log('职位信息：' + JSON.stringify(res.data))
        this.positionForm.patchValue(res.data)
      }
    });
  }
  // 点击编辑职位取消按钮
  handleEditPositionCancel(): void {
    this.isShowEditPositionModel = false;
  }
  // 点击编辑公司确认按钮
  handleEditPositionOk(e: Event, value: FormGroup): void {
    this.isShowEditPositionModel = false;
    const editPositionForm = this.positionForm;
    const { controls } = editPositionForm;

    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty()
      controls[key].updateValueAndValidity()
    })
    const param = { ...this.positionForm.value, id: this.editPositionId };
    console.log('修改职位入参：' + JSON.stringify(param))
    this.companyService.updatePosition(param).subscribe(res => {
      console.log('响应值：' + JSON.stringify(res))
      if (res.code == 200) {
        console.log('修改结果：' + res.data)
        this.fetchPositionData();
        this.nzMessageService.create('success', '修改职位成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 重置查询表单
  resetForm(): void {
    this.positionSearchForm.reset({
      positionName: [''],
      positionCode: ['']
    });
  }
  // 查询
  search() {
    for (const i in this.positionSearchForm.controls) {
      this.positionSearchForm.controls[i].markAsDirty();
      this.positionSearchForm.controls[i].updateValueAndValidity();
    }
    let { positionName, positionCode } = this.positionSearchForm.value;
    const body = {
      'positionName': positionName,
      'positionCode': positionCode,
      'size': 5,
      'current': 1
    }
    this.companyService.getPageOfPosition(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }
}
