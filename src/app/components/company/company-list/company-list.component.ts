import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { CompanyService } from '../company.service';
import { Recruit ,Company} from '../company-type';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {


  controlArray: Array<{ index: number; show: boolean }> = [];
  formContorl: Array<{name: string; show: boolean}> = [];
  isCollapse = false;


  companyForm: FormGroup;

  companyAddForm: FormGroup;

  companySearchForm: FormGroup;

  constructor(private companyService: CompanyService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {
      // 新增form
      this.companyAddForm = this.fb.group({
        id: [''],
        companyName: ['', [Validators.required]],
        companyCode: [''],
        industry: ['', [Validators.required]],
        region: [''],
        address: ['', [Validators.required]],
        introduce: ['', [Validators.required]]
      });
     // 编辑、详情
      this.companyForm = this.fb.group({
        id: [''],
        companyName: ['', [Validators.required]],
        companyCode: [''],
        industry: ['', [Validators.required]],
        region: [''],
        address: ['', [Validators.required]],
        introduce: ['', [Validators.required]]
      });
      // 搜索
      this.companySearchForm = this.fb.group({
        id: [''],
        companyName: [''],
        companyCode: [''],
        industry: [''],
        region: [''],
        address: [''],
        introduce: ['']
      });

  }
 
  //控制编辑公司对话框
  isShowEditCompanyModel = false;
  //控制新增公司对话框
  isShowAddCompanyModel = false;
  //控制公司详情对话框
  isShowInfoCompanyModel = false;
  //点击编辑时的ID
  editCompanyId: bigint;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Company[] = [];
  listOfData: Array<Company>;
  setOfCheckedId = new Set<bigint>();

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

  onCurrentPageDataChange($event: readonly Company[]): void {
    this.listOfCurrentPageData = $event;
    console.log("改变页码："+JSON.stringify(this.listOfCurrentPageData))
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.fetchCompanyList();
  }
  // 获取公司列表
  fetchCompanyList(){
    this.companyService.getCompanyList().subscribe(res => {
      console.log(res.data)
      this.listOfData = res.data;
      console.log(res);
      
    });
  }
  // 点击修改按钮
  showEditModal(id:bigint): void {
    console.log('修改公司按钮时间ID:'+id)
    this.isShowEditCompanyModel = true;
    this.editCompanyId=id;
    this.companyService.getCompanyInfo(id).subscribe(res=>{
      if(res.code==200){
        console.log('公司信息：'+JSON.stringify(res.data))
         this.companyForm.patchValue(res.data)
      }
    })
  }
  // 点击详情按钮
  showInfoModal(id:bigint): void{
    this.isShowInfoCompanyModel=true; 
    this.companyService.getCompanyInfo(id).subscribe(res =>{
      if(res.code==200){
        console.log('公司信息：'+JSON.stringify(res.data))
         this.companyForm.patchValue(res.data)
      }
    })
  }
  // 点击新增按钮
  showAddModal(): void {
    this.isShowAddCompanyModel = true;
  }
  // 点击编辑公司确认按钮
  handleEditCompanyOk(e: Event,value: FormGroup): void {
    console.log('Button ok clicked!');
    this.isShowEditCompanyModel = false;
    const editCompanyForm= this.companyForm;
    const { controls } = editCompanyForm;

    Object.keys(controls).forEach(key=>{
      controls[key].markAsDirty()
      controls[key].updateValueAndValidity()
    })
    const param = { ...this.companyForm.value , id:this.editCompanyId};
    console.log('修改公司入参：'+JSON.stringify(param))
    this.companyService.updateCompany(param).subscribe(res=>{
      console.log('响应值：'+JSON.stringify(res))
      if(res.code== 200){
        console.log('修改结果：'+res.data)
        this.fetchCompanyList();
        this.nzMessageService.create('success', '修改公司成功');
      }else{
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 点击编辑公司取消按钮
  handleEditCompanyCancel(): void {
    console.log('Button cancel clicked!');
    this.isShowEditCompanyModel = false;
  }
  // 点击新增公司确认按钮
  handleAddCompanyOk = (e: Event,value: FormGroup) =>{
    //  e.preventDefault()
    console.log("提交")
     Object.keys(this.companyAddForm.controls).forEach(key =>{
       this.companyAddForm.controls[key].markAsDirty() 
       this.companyAddForm.controls[key].updateValueAndValidity()
     })
     console.log("表单值："+JSON.stringify(value))
     if(this.companyAddForm.valid){
      this.isShowAddCompanyModel = false;
      this.companyService.addCompany(this.companyAddForm.value).subscribe(res=>{
        console.log("添加公司："+JSON.stringify(res))
        if(res.code==200){
         this.listOfData.push(this.companyAddForm.value);
         this.fetchCompanyList();
         console.log('新增后的：'+JSON.stringify(this.listOfData))
         
         this.nzMessageService.create('success', '新增公司成功');
        }else{
          this.nzMessageService.create('error',res.msg)
        }
      })
     }
  }
  // 点击新增公司取消按钮
  handleAddCompanyCancel(): void{
    console.log('Button cancel clicked!');
    this.isShowAddCompanyModel = false;
  }
  // 点击公司详情右上角按钮
  handleInfoCompanyCancel(): void{
    console.log('Button cancel clicked!');
    this.isShowInfoCompanyModel = false;
  }

  // 删除公司
  delConfirm(id: bigint) {
    console.log('删除ID:' + id)
    this.companyService.delCompanyById(id).subscribe(res => {
      console.log('删除调用接口返回:' + res)
      if(res.code==200){
        this.listOfData = this.listOfData.filter(company => company.id != id)
        this.nzMessageService.create('success', '删除公司成功');
      }else{
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 取消删除
  delCancel() {
    this.nzMessageService.info('取消删除', { nzDuration: 1000 });
  }
  //列表追踪
  trackByCompanyId(index: number, company: Company) {
    console.log('表追踪：'+company.id);
    return company.id
  }


  search(){
    for (const i in this.companySearchForm.controls) {
      this.companySearchForm.controls[i].markAsDirty();
      this.companySearchForm.controls[i].updateValueAndValidity();
    }
    let { companyName, companyCode ,industry,region,address} = this.companySearchForm.value;
    const body={
      'companyName':companyName,
      'companyCode':companyCode,
      'industry':industry,
      'region':region,
      'address':address,
      'size':5,
      'current':1
    }
   this.companyService.getPageOfCompany(body).subscribe(res=>{
     if(res.code==200){
         this.listOfData=res.data
     }
   })
  }
  // 重置查询表单
  resetForm(): void {
    this.companySearchForm.reset();
  }

}
