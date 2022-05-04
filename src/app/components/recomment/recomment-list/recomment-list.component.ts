import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RecommentService } from '../recomment.service';
import { CompanyService } from '../../company/company.service';
import { Recomment } from '../recomment-type';
import { Company } from '../../company/company-type';
@Component({
  selector: 'app-recomment-list',
  templateUrl: './recomment-list.component.html',
  styleUrls: ['./recomment-list.component.css']
})
export class RecommentListComponent implements OnInit {

  constructor(private recommentService: RecommentService,
    private nzMessageService: NzMessageService,
    private companyService: CompanyService,
    private fb: FormBuilder) {
    // 详情 
    this.recommentForm = this.fb.group({
      id: [''],
      customName: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      intentionCompany: [null, [Validators.required]],
      companyId: [''],
      status: ['', [Validators.required]],
      recommentName: ['', [Validators.required]],
      recommentId: [''],
      remark: [null]
    });
    // 搜索
    this.recommentSearchForm = this.fb.group({
      customName: [''],
      telephone: [''],
      gender: [''],
      intentionCompany: [''],
      status: [''],
      recommentName: ['']
    })
  }

  recommentForm: FormGroup;
  recommentSearchForm: FormGroup;
  isShowInfoRecommentModel = false;
  isShowEditRecommentModel = false;

  editRecommentId: bigint;
  // 性别
  optionList = [
    { label: '男', value: 0 },
    { label: '女', value: 1 }
  ];
  // 状态
  statusList = [
    { label: '待面试', value: 0 },
    { label: '已面试', value: 1 },
    { label: '已入职', value: 2 },
    { label: '已离职', value: 3 }
  ];
  isCollapse = false;
  modelParam: any;
  companyList: Array<Company>;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Recomment[] = [];
  listOfData: Array<Recomment>;
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

  onCurrentPageDataChange($event: readonly Recomment[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
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
  // 获取报备列表
  fetchRecommentData() {
    this.recommentService.getRecommentList().subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }

  ngOnInit(): void {
    this.fetchRecommentData();
    this.fetchCompanyData();
  }

  // 点击详情按钮
  showInfoModal(id: bigint): void {
    this.isShowInfoRecommentModel = true;
    this.recommentService.getRecommentById(id).subscribe(res => {
      if (res.code == 200) {
        console.log('公司信息： ' + JSON.stringify(res.data))
        this.recommentForm.patchValue(res.data)
      }
    })
  }
  //报备详情取消按钮
  handleInfoRecommendCancel() {
    this.isShowInfoRecommentModel = false;
  }
  // 取消删除
  delCancel() {
    this.nzMessageService.info('取消删除', { nzDuration: 1000 });
  }
  // 确认删除
  delConfirm(id: bigint) {
    this.recommentService.delRecomment(id).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = this.listOfData.filter(recome => recome.id != id);
        this.nzMessageService.create('success', '删除报备成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    });
  }
  // 点击修改按钮
  showEditModal(id: bigint): void {
    console.log('修改报备事件ID:' + id)
    this.isShowEditRecommentModel = true;
    this.editRecommentId = id;
    this.recommentService.getRecommentById(id).subscribe(res => {
      if (res.code == 200) {
        console.log('报备信息：' + JSON.stringify(res.data))
        this.recommentForm.patchValue(res.data)
      }
    });
  }
  // 报备编辑取消按钮
  handleEditRecommentCancel() {
    this.isShowEditRecommentModel = false;
  }
  // 报备编辑确认按钮
  handleEditRecommentOk(e: Event, value: FormGroup) {
    Object.keys(this.recommentForm.controls).forEach(key => {
      this.recommentForm.controls[key].markAsDirty()
      this.recommentForm.controls[key].updateValueAndValidity()
    });
    let {  companyId } = this.recommentForm.value;
    this.companyList.filter(company => {
      if (company.id == companyId) {
        console.log("公司过滤名称：" + company.companyName);
        const param = { ...this.recommentForm.value, intentionCompany: company.companyName }
        console.log("参数：" + JSON.stringify(param));
        this.recommentService.updateRecomment(param).subscribe(res=>{
          if(res.code==200){
            this.fetchRecommentData(); 
            this.nzMessageService.create('success', '修改报备成功');
           }else{
            this.nzMessageService.create('error', res.msg);
           }
        })
      }
    });
    this.isShowEditRecommentModel = false;
  }

  // 查询
  search() {
    for (const i in this.recommentSearchForm.controls) {
      this.recommentSearchForm.controls[i].markAsDirty();
      this.recommentSearchForm.controls[i].updateValueAndValidity();
    }
    console.log("查询参数："+JSON.stringify(this.recommentSearchForm.value))
    let { customName, telephone, gender, intentionCompany, status ,recommentName} = this.recommentSearchForm.value;
    const body = {
      'customName': customName,
      'telephone': telephone,
      'gender': gender==null?'':gender,
      'intentionCompany': intentionCompany,
      'status': status,
      'recommentName': recommentName,
      'size': 5,
      'current': 1
    }
    this.recommentService.getRecommentOfPage(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }
  // 重置查询表单
  resetForm(): void {
    this.recommentSearchForm.reset({
      customName: [''],
      telephone: [''],
      gender: [''],
      intentionCompany: [''],
      status: [''],
      recommentName: ['']
    });
  }
}
