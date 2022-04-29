import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { CompanyService } from '../company.service';
import { Recruit, Company } from '../company-type';
@Component({
  selector: 'app-recruit-setting',
  templateUrl: './recruit-setting.component.html',
  styleUrls: ['./recruit-setting.component.css']
})
export class RecruitSettingComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private companyService: CompanyService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {

  }

  //控制新增招聘对话框
  isShowAddRecruitModel = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Recruit[] = [];
  listOfData: Array<Recruit>;
  setOfCheckedId = new Set<bigint>();
  optionList: Array<Company>;
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

  onCurrentPageDataChange($event: readonly Recruit[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      companyName: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      region: ['', [Validators.required]],
      money: ['', [Validators.required]],
      number: ['', [Validators.required]],
      position: ['', [Validators.required]],
      address: ['', [Validators.required]],
      companyIntroduce: [''],
      welfare: ['', [Validators.required]],
      jobRequire: ['', [Validators.required]],
    });

    this.fetchRecruitData();

    this.fetchCompanyData();
  }

  //  获取招聘信息
  fetchRecruitData() {
    this.companyService.getRecruitList().subscribe(res => {
      if(res.code==200){
        this.listOfData = res.data;
      }
      console.log(res)
    });
  }
  // 获取公司列表
  fetchCompanyData(){
    this.companyService.getCompanyList().subscribe(res =>{
      if(res.code==200){
         this.optionList= res.data
      }
      console.log("公司列表："+JSON.stringify(this.optionList))
    })
  }
  showAddModal(): void {
    this.isShowAddRecruitModel = true;
  }

  handleAddRecruitOk(): void {
    console.log('Button ok clicked!');
    this.isShowAddRecruitModel = false;
  }

  handleAddRecruitCancel(): void {
    console.log('Button cancel clicked!');
    this.isShowAddRecruitModel = false;
  }
  // 删除公司
  delConfirm(id: number) {
    console.log('删除ID:' + id)
    this.companyService.delRecruitById(id).subscribe(res => {
      console.log('删除调用接口返回:' + res)
    })
    this.nzMessageService.info('确认删除');
  }
  delCancel() {
    this.nzMessageService.info('取消删除', { nzDuration: 1000 });
  }
  //列表追踪
  trackByCompanyId(index: number, recruit: Recruit) {
    return recruit.id
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }


  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}
