import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { CompanyService } from '../../company/company.service';
import { FinanceService } from '../finance.service';
import { CustomService } from '../../custom/custom.service';
import { KnightErrantService } from '../../knight-errant/knight-errant.service';
import { KnightErrant } from '../../knight-errant/knight-errant-type';
import { Brokerage } from '../finance-type';
import { Company } from '../../company/company-type';
import { Custom } from '../../custom/custom-type';
@Component({
  selector: 'app-brokerage-list',
  templateUrl: './brokerage-list.component.html',
  styleUrls: ['./brokerage-list.component.css']
})
export class BrokerageListComponent implements OnInit {


  isShowInfoBrokerageModel = false;
  isShowEditBrokerageModel = false;
  isShowAddBrokerageModel = false;

  brokerageAddForm: FormGroup;
  brokerageSearchForm: FormGroup;
  brokerageForm: FormGroup;

  isSettleList = [
    { label: '未结佣', value: false },
    { label: '已结佣', value: true },
  ];

  // 客户状态
  statusList = [
    { label: '待面试', value: 0 },
    { label: '已面试', value: 1 },
    { label: '已入职', value: 2 },
    { label: '已离职', value: 3 }
  ];

  isCollapse = false;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Brokerage[] = [];
  listOfData: Array<Brokerage>;
  notBrokerageData: Array<Brokerage>;
  okBrokerageData: Array<Brokerage>;
  companyList: Array<Company>;
  customList: Array<Custom>;
  KnightErrantlist: Array<KnightErrant>;
  companyName: string;
  cusName: string;
  recommentName:string;
  setOfCheckedId = new Set<bigint>();

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

  onCurrentPageDataChange($event: readonly Brokerage[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  constructor(private companyService: CompanyService,
    private financeService: FinanceService,
    private customService: CustomService,
    private knightErrantService: KnightErrantService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder) {
    // 编辑、详情
    this.brokerageForm = this.fb.group({
      id: [''],
      cusName: ['', [Validators.required]],
      cusId: [''],
      companyName: ['', [Validators.required]],
      companyId: [''],
      brokerage: ['', [Validators.required]],
      isSettle: ['', [Validators.required]],
      recommentName: ['', [Validators.required]],
      recommentId: [''],
      interviewTime: ['', [Validators.required]],
      inductionTime: [''],
      leaveOfficeTime: [''],
      status: ['', [Validators.required]]
    });
    // 搜索
    this.brokerageSearchForm = this.fb.group({
      cusName: [''],
      cusId: [''],
      companyName: [''],
      companyId: [''],
      isSettle: [''],
      recommentName: [''],
      recommentId: [''],
      status: ['']
    })
  }

  ngOnInit(): void {
    this.fetchAllBrokerageList();

    this.fetchNotBrokerageList();

    this.fetchOkBrokerageList();

    this.fetchCompanyData();

    this.fetchCustomData();

    this.fetchRecommentUserList();


  }
  // 获取推荐人列表 
  fetchRecommentUserList(){
    this.knightErrantService.getRecommentUserList().subscribe(res=>{
      if(res.code==200){
        this.KnightErrantlist=res.data;
      }
    })
  }
  // 获取公司列表
  fetchCompanyData() {
    this.companyService.getCompanyList().subscribe(res => {
      if (res.code == 200) {
        this.companyList = res.data;
      }
      console.log("公司列表：" + JSON.stringify(this.companyList))
    })
  }
  // 获取客户列表
  fetchCustomData() {
    this.customService.getWxCustomList().subscribe(res => {
      if (res.code == 200) {
        this.customList = res.data;
      }
    })
  }
  // 分页获取全部佣金
  fetchAllBrokerageList() {
    const body = {
      'size': 5,
      'current': 1
    }
    this.financeService.getAllBrokeragePage(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }
  // 分页获取未结佣
  fetchNotBrokerageList(){
    const body = {
      'size': 5,
      'current': 1
    }
    this.financeService.getNotBrokeragePage(body).subscribe(res=>{
        if(res.code == 200){
          this.notBrokerageData = res.data;
        }
    })
  }
  // 分页获取已结佣
  fetchOkBrokerageList(){
    const body = {
      'size': 5,
      'current': 1
    }
    this.financeService.getOkBrokeragePage(body).subscribe(res=>{
      if(res.code==200){
         this.okBrokerageData = res.data
      }
    })
  }
  // 详情取消按钮
  handleInfoBrokerageCancel() {
    this.isShowInfoBrokerageModel = false;
  }
  // 点击详情按钮
  showInfoModal(id: bigint): void {
    this.isShowInfoBrokerageModel = true;
    this.financeService.getWxBrokerageInfo(id).subscribe(res => {
      if (res.code == 200) {
        console.log('佣金信息：' + JSON.stringify(res.data))
        this.brokerageForm.patchValue(res.data)
      }
    })
  }
  // 点击修改按钮
  showEditModal(id: bigint): void {
    console.log('修改佣金事件ID:' + id)
    this.isShowEditBrokerageModel = true;

    this.financeService.getWxBrokerageInfo(id).subscribe(res => {
      if (res.code == 200) {
        console.log('佣金信息：' + JSON.stringify(res.data))
        this.brokerageForm.patchValue(res.data)
      }
    });
  }
  // 点击编辑取消按钮
  handleEditBrokerageCancel() {
    this.isShowEditBrokerageModel = false;
  }
  // 点击编辑确认
  handleEditBrokerageOk(event: Event, value: FormGroup) {
    Object.keys(this.brokerageForm.controls).forEach(key => {
      this.brokerageForm.controls[key].markAsDirty()
      this.brokerageForm.controls[key].updateValueAndValidity()
    });

    let { companyId, cusId ,recommentId} = this.brokerageForm.value;
    this.companyList.filter(company => {
      if (company.id == companyId) {
        this.companyName = company.companyName;
      }
    });
    this.customList.filter(custom => {
      if (custom.id == cusId) {
        this.cusName = custom.cusName;
      }
    });
    this.KnightErrantlist.filter(recome=>{
      if(recome.id==recommentId){
        this.recommentName = recome.nickName;
      }
    });

    const param = { ...this.brokerageForm.value, companyName: this.companyName, cusName: this.cusName,recommentName:this.recommentName };
    this.financeService.updateWxBrokerage(param).subscribe(res => {
      if (res.code == 200) {
        this.fetchAllBrokerageList();
        this.nzMessageService.create('success', '修改佣金明细成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    });
     this.isShowEditBrokerageModel = false;
  }
  // 点击删除确认
  delConfirm(id: bigint) {
    this.financeService.delWxBrokerage(id).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = this.listOfData.filter(position => position.id != id)
        this.nzMessageService.create('success', '删除佣金成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 点击删除取消
  delCancel() {
    this.nzMessageService.info('取消删除', { nzDuration: 1000 });
  }
  // 查询
  search(){
    for (const i in this.brokerageSearchForm.controls) {
      this.brokerageSearchForm.controls[i].markAsDirty();
      this.brokerageSearchForm.controls[i].updateValueAndValidity();
      let {companyId,cusId,recommentId,status} = this.brokerageSearchForm.value;
      const body = {
        'companyId': companyId,
        'cusId': cusId,
        'recommentId': recommentId,
        'status': status,
        'size': 5,
        'current': 1
      }
      this.financeService.getAllBrokeragePage(body).subscribe(res=>{
           if(res.code == 200){
             this.listOfData = res.data
           }
      })

    }
  }
  // 重置
  resetForm(){
    this.brokerageSearchForm.reset({
      cusName: [''],
      cusId: [''],
      companyName: [''],
      companyId: [''],
      isSettle: [''],
      recommentName: [''],
      recommentId: ['']
    })
  }
  // 结佣
  settle(){
    const param = new Array<bigint>();
    this.setOfCheckedId.forEach(s => {
      console.log('入职选中的' + s);
      param.push(s);
    
    });
    this.financeService.settleBrokerage(param).subscribe(res=>{
      if(res.code == 200){
        this.nzMessageService.create('success', '已结佣成功');
        this.fetchAllBrokerageList();

        this.fetchNotBrokerageList();
    
        this.fetchOkBrokerageList();
       } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
  }
  // 刷新未结佣
  refleshNotSettleData(){
     this.fetchNotBrokerageList();
  }
  // 刷新已结拥
  refleshOkSettleData(){
      this.fetchOkBrokerageList();
  }
  // 刷新全部数据
  refleshAllSettleData(){
    this.fetchAllBrokerageList();
  }
}

