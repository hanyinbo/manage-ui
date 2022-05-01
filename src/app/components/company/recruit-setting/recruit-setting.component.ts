import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { CompanyService } from '../company.service';
import { Recruit, Company, Position } from '../company-type';
@Component({
  selector: 'app-recruit-setting',
  templateUrl: './recruit-setting.component.html',
  styleUrls: ['./recruit-setting.component.css']
})
export class RecruitSettingComponent implements OnInit {

  validateForm: FormGroup;
  recruitAddForm: FormGroup;

  constructor(private companyService: CompanyService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {

    this.recruitAddForm = this.fb.group({
      companyName: ['', [Validators.required]],
      interviewAddress: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      region: ['', [Validators.required]],
      money: ['', [Validators.required]],
      number: ['', [Validators.required]],
      position: [null, [Validators.required]],
      workPositionList: [null, [Validators.required]],
      address: ['', [Validators.required]],
      companyIntroduce: [''],
      welfare: ['', [Validators.required]],
      jobRequire: ['', [Validators.required]],
    });

  }
  // listOfSelectedValue
  listOfSelectedValue = ['开发测试', '221'];
  //控制新增招聘对话框
  isShowAddRecruitModel = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Recruit[] = [];
  listOfData: Array<Recruit>;
  setOfCheckedId = new Set<bigint>();
  companyList: Array<Company>;
  positionList: Array<Position>;
  listOfOption: Array<{ label: string; value: string }> = [];
  position: Position;
  positionNameList: Array<string>;
  companyIdList: Array<bigint>;
  addParam: any;
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


    this.fetchRecruitData();

    this.fetchCompanyData();

    this.fetchPositionData();

  }

  //  获取招聘信息
  fetchRecruitData() {
    this.companyService.getRecruitList().subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data;
      }
    });
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
        // this.positionList.forEach(p=>{
        //   this.listOfOption.push({
        //     label: p.positionName,
        //     value: p.positionCode
        //   })
        // })
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
    Object.keys(this.recruitAddForm.controls).forEach(key => {
      this.recruitAddForm.controls[key].markAsDirty()
      this.recruitAddForm.controls[key].updateValueAndValidity()
    })
    let { workPositionList, companyName } = this.recruitAddForm.value;

    // 公司
    this.companyList.filter(company => {
      if (company.id == companyName) {
        this.addParam = { ...this.recruitAddForm.value, companyName: company.companyName, companyId: company.id }
      }
    })
    console.log('公司列表重新赋值1：' + JSON.stringify(this.addParam))
    // 招聘岗位
    this.positionNameList = workPositionList;
    // this.positionIdList.forEach(p => {
    //   const pstr = "";
    //   this.positionList.filter(pos => {
    //     if (p == pos.id) {
    //       pstr+pos.positionName
    //       console.log('过滤匹配岗位：' + JSON.stringify(pos));
    //       //this.addParam = {...this.recruitAddForm.value,pos:company.companyName}
    //       // const param = {...this.recruitAddForm.value,:this.position.} 
    //     }
    //   })
    // })
    // this.isShowAddRecruitModel = false;
    this.companyService.addRecruitInfo(this.addParam).subscribe(res => {
      if (res.code == 200) {
        console.log('新增招聘成功')
      }
    });
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
