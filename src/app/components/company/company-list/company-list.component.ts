import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CompanyService } from '../company.service';
import { Company } from '../company-type';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  constructor(private companyService : CompanyService,
              private nzMessageService: NzMessageService) { }

  //控制公司对话框
  isShowCompanyModel = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Company[] = [];
  listOfData: Array<Company>;
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
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

      this.companyService.getCompanyList().subscribe(res=>{
       this.listOfData =  res.data;
        console.log(res)
      })
    
  }

  showModal(): void {
    this.isShowCompanyModel = true;
  }

  handleEditCompanyOk(): void {
    console.log('Button ok clicked!');
    this.isShowCompanyModel = false;
  }

  handleEditCompanyCancel(): void {
    console.log('Button cancel clicked!');
    this.isShowCompanyModel = false;
  }
  // 删除公司
  delConfirm(id:number){
    console.log('删除ID:'+id)
    this.companyService.delCompanyById(id).subscribe(res=>{
      console.log('删除调用接口返回:'+res)
    })
    this.nzMessageService.info('确认删除');
  }
  delCancel(){
    this.nzMessageService.info('取消删除',{nzDuration: 1000});
  }
  //列表追踪
  trackByCompanyId(index: number,company:Company){
    return company.id
  }
}
