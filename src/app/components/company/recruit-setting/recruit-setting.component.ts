import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { CompanyService } from '../company.service';
import { Recruit, Company, Position,RecruitInfoDTO } from '../company-type';
@Component({
  selector: 'app-recruit-setting',
  templateUrl: './recruit-setting.component.html',
  styleUrls: ['./recruit-setting.component.css']
})
export class RecruitSettingComponent implements OnInit {

  recruitSearchForm: FormGroup;
  recruitForm: FormGroup;
  recruitInfoForm: FormGroup;
  constructor(private companyService: CompanyService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {
    // 新增 编辑
    this.recruitForm = this.fb.group({
      id: [''],
      companyName: ['', [Validators.required]],
      companyId: [''],
      interviewAddress: ['', [Validators.required]],
      money: ['', [Validators.required]],
      number: ['', [Validators.required]],
      position: [null, [Validators.required]],
      wxPositionList: [null, [Validators.required]],
      welfare: ['', [Validators.required]],
      jobRequire: ['', [Validators.required]],
    });
    // 详情
    this.recruitInfoForm = this.fb.group({
      id: [''],
      companyName: ['', [Validators.required]],
      companyId: [''],
      industry: ['', [Validators.required]],
      region: ['', [Validators.required]],
      address: ['', [Validators.required]],
      interviewAddress: [''],
      wxCompany: this.fb.group({
        companyName: ['', [Validators.required]],
        industry: ['', [Validators.required]],
        region: ['', [Validators.required]],
        address: ['', [Validators.required]],
        id: [null]
      }),
      wxPositionList: [null, [Validators.required]],
      money: ['', [Validators.required]],
      number: ['', [Validators.required]],
      welfare: ['', [Validators.required]],
      jobRequire: ['', [Validators.required]],

    });
    // 搜索
    this.recruitSearchForm = this.fb.group({
      companyName: [''],
      industry: [''],
      region: [''],
      address: [''],
      interviewAddress: [''],
      money: [''],
      number: ['']
    })
  }
  //控制新增招聘对话框
  isShowAddRecruitModel = false;
  // 控制招聘详情对话框
  isShowInfoRecruitModel = false;
  // 控制招聘编辑对话框
  isShowEditRecruitModel = false;

  editRecruitId: bigint;

  isCollapse = false;

  checked = false;
  indeterminate = false;
  // listOfCurrentPageData: readonly Recruit[] = [];
  listOfCurrentPageData: readonly RecruitInfoDTO[] = [];
  // listOfData: Array<Recruit>;
  listOfData: Array<RecruitInfoDTO>;
  setOfCheckedId = new Set<bigint>();
  companyList: Array<Company>;
  positionList: Array<Position>;
  listOfOption: Array<{ label: string; value: string }> = [];
  position: Position;
  positionNameList: Array<string>;
  companyIdList: Array<bigint>;
  companyId: bigint;
  addParam: any;
  editParam: any;
  selectCompanyValue: bigint;
  selectCompanylabel: string;
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

  onCurrentPageDataChange($event: readonly RecruitInfoDTO[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  ngOnInit(): void {


    this.fetchRecruitData();

    this.fetchCompanyData();

    this.fetchPositionData();

  }

  //  获取招聘信息
  fetchRecruitData() {
    const body ={
      'size': 5,
      'current': 1
    }
    this.companyService.getRecruitOfPage(body).subscribe(res=>{
      if(res.code==200){
       this.listOfData=res.data;
      }
    })
  }
  // 获取公司列表
  fetchCompanyData() {
    this.companyService.getCompanyList().subscribe(res => {
      if (res.code == 200) {
        this.companyList = res.data
      }
      console.log("公司列表：" + JSON.stringify(this.companyList))
    })
  }
  // 获取岗位列表
  fetchPositionData() {
    this.companyService.getPositionList().subscribe(res => {
      if (res.code == 200) {
        this.positionList = res.data
      }
      console.log('初始化岗位列表：' + JSON.stringify(this.listOfOption))
    })
  }
  // 控制新增窗口
  showAddModal(): void {
    this.isShowAddRecruitModel = true;
  }
  // 新增招聘
  handleAddRecruitOk(e: Event, value: FormGroup): void {
    Object.keys(this.recruitForm.controls).forEach(key => {
      this.recruitForm.controls[key].markAsDirty()
      this.recruitForm.controls[key].updateValueAndValidity()
    })
    let { companyName } = this.recruitForm.value;
    // 公司
    this.companyList.filter(company => {
      if (company.id == companyName) {
        this.addParam = { ...this.recruitForm.value, companyName: company.companyName, companyId: company.id }
      }
    })
    console.log('公司列表重新赋值1：' + JSON.stringify(this.addParam))
    this.companyService.addRecruitInfo(this.addParam).subscribe(res => {
      if (res.code == 200) {
        this.fetchRecruitData();
        this.nzMessageService.create('success', '新增招聘成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    });
    this.isShowAddRecruitModel = false;
  }
  // 取消新增招聘
  handleAddRecruitCancel(): void {
    console.log('Button cancel clicked!');
    this.isShowAddRecruitModel = false;
  }
  // 删除公司招聘
  delConfirm(id: bigint) {
    this.companyService.delRecruit(id).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = this.listOfData.filter(position => position.id != id)
        this.nzMessageService.create('success', '删除公司招聘成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 取消删除公司招聘
  delCancel() {
    this.nzMessageService.info('取消删除', { nzDuration: 1000 });
  }
  // 点击详情按钮
  showInfoModal(id: bigint): void {
    this.isShowInfoRecruitModel = true;
    this.companyService.getRecruitData(id).subscribe(res => {
      if (res.code == 200) {
        console.log('职位信息：' + JSON.stringify(res.data))
        // this.recruitForm.s
        // const data = { ...this.recruitAddForm.value, companyName: res.data.company.companyName, industry: res.data.company.industry, region: res.data.company.region }
        this.recruitInfoForm.patchValue(res.data)
      }
      console.log("公司招聘详情：" + JSON.stringify(this.recruitInfoForm.value))
    })
  }
  // 点击详情取消按钮
  handleInfoRecruitCancel() {
    this.isShowInfoRecruitModel = false;
  }
  // 点击修改按钮
  showEditModal(id: bigint): void {
    this.isShowEditRecruitModel = true;
    this.editRecruitId = id;
    this.companyService.getRecruitData(id).subscribe(res => {
      if (res.code == 200) {
       
        this.recruitForm.reset();
        this.recruitForm.patchValue(res.data);
        this.fetchRecruitData();
        
      }
      console.log('点击修改按钮:' + JSON.stringify(this.recruitForm.value))
    });
  }
  // 点击编辑取消按钮
  handleEditRecruitCancel() {
    this.isShowEditRecruitModel = false;
  }
  // 点击编辑确认按钮
  handleEditRecruitOk(e: Event, value: FormGroup): void {
    Object.keys(this.recruitForm.controls).forEach(key => {
      this.recruitForm.controls[key].markAsDirty()
      this.recruitForm.controls[key].updateValueAndValidity()
    })
    let { companyName } = this.recruitForm.value;
   console.log('修改公司名称：'+companyName)
   console.log("公司ID:"+companyName)
   // 公司
     const params = {...this.recruitForm.value,companyId:this.selectCompanyValue,companyName:this.selectCompanylabel}
     console.log('点击编辑职位：'+JSON.stringify(params));
     this.companyService.updateRecruitInfo(params).subscribe(res=>{
       if(res.code==200){
        this.fetchRecruitData(); 
        this.nzMessageService.create('success', '修改招聘成功');
       }else{
        this.nzMessageService.create('error', res.msg);
       }
     });
    this.isShowEditRecruitModel = false;
  }
  // 切换公司
  handleCompanyChange(value:any){
    this.companyList.filter(company => {
      if (company.id ==  value) {
        this.addParam = { ...this.recruitForm.value, companyName: company.companyName, companyId: company.id }
        this.selectCompanyValue=company.id;
        this.selectCompanylabel=company.companyName;   
      }
    });
  }
  
  // 重置查询表单
  resetForm(): void {
    this.recruitSearchForm.reset({
      companyName: [null],
      industry: [null],
      region: [null],
      address: [null],
      interviewAddress: [null],
      money: [null],
      number: [null]
    });
  }
  // 查询
  search() {
    for (const i in this.recruitSearchForm.controls) {
      this.recruitSearchForm.controls[i].markAsDirty();
      this.recruitSearchForm.controls[i].updateValueAndValidity();
    }
    let { companyName, industry,region,address ,interviewAddress,money,number} = this.recruitSearchForm.value;
    const body = {
      'companyName': companyName,
      'industry': industry,
      'region': region,
      'address': address,
      'interviewAddress': interviewAddress,
      'money': money,
      'number': number,
      'size': 5,
      'current': 1
    }
    this.companyService.getRecruitOfPage(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }
  //列表追踪
  // trackByCompanyId(index: number, recruit: Recruit) {
  //   return recruit.id
  // }
}
