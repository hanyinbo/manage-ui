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

  companyAddForm: FormGroup;

  constructor(private companyService: CompanyService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {
      this.companyAddForm = this.fb.group({
        companyName: ['', [Validators.required]],
        companyCode: [''],
        industry: ['', [Validators.required]],
        region: [''],
        address: ['', [Validators.required]],
        introduce: ['', [Validators.required]]
      });
      
  }
 
  //控制编辑公司对话框
  isShowEditCompanyModel = false;
  //控制新增公司对话框
  isShowAddCompanyModel = false;
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
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.fetchCompanyList()
  }
  // 获取公司列表
  fetchCompanyList(){
    this.companyService.getCompanyList().subscribe(res => {
      console.log(res.data)
      this.listOfData = res.data;
      console.log(res)
    });
  }
  // 点击修改按钮
  showEditModal(): void {
    this.isShowEditCompanyModel = true;
  }
  // 点击新增按钮
  showAddModal(): void {
    this.isShowAddCompanyModel = true;
  }
  // 点击编辑公司确认按钮
  handleEditCompanyOk(): void {
    console.log('Button ok clicked!');
    this.isShowEditCompanyModel = false;
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
     this.isShowAddCompanyModel = false;
  }
  // 点击新增公司取消按钮
  handleAddCompanyCancel(): void{
    console.log('Button cancel clicked!');
    this.isShowAddCompanyModel = false;
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

}
