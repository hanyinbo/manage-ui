import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';


import { RecommentService } from '../recomment.service';
import { CompanyService } from '../../company/company.service';
import { KnightErrantService } from '../../knight-errant/knight-errant.service';
import { KnightErrant } from '../../knight-errant/knight-errant-type';
import { Recomment,RecuitPosition } from '../recomment-type';
import { Company } from '../../company/company-type';
@Component({
  selector: 'app-recomment-list',
  templateUrl: './recomment-list.component.html',
  styleUrls: ['./recomment-list.component.css']
})
export class RecommentListComponent implements OnInit {

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }
  constructor(private changeDetectorRef: ChangeDetectorRef, private recommentService: RecommentService,
    private nzMessageService: NzMessageService,
    private knightErrantService: KnightErrantService,
    private companyService: CompanyService,
    private fb: FormBuilder) {
    // 详情 
    this.recommentForm = this.fb.group({
      id: [''],
      customName: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      gender: [0, [Validators.required]],
      position: ['',[Validators.required]],
      agreeInterviewTime: [null, [Validators.required]],
      companyId: [''],
      positionId: [''],
      status: [''],
      recommentName: ['', [Validators.required]],
      recommentId: [''],
      recruitId:[''],
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
  isShowAddRecommentModel = false;

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
  //复选（表头的复选框控制表格内的复选框 相关变量）
  checked = false;//当页是否全选

  indeterminate = false;
  listOfCurrentPageData: readonly Recomment[] = [];//当页表格中的数据列表
  listOfData: Array<Recomment>;
  notInterviewListOfData: Array<Recomment>;
  okInterviewListOfData: Array<Recomment>;
  inductionListOfData: Array<Recomment>;
  leaveOfficeListOfData: Array<Recomment>;
  KnightErrantlist: Array<KnightErrant>;
  positionList: Array<RecuitPosition>;
  setOfCheckedId = new Set<bigint>(); // 选中的id集合
  companyName: string;
  recommentName: string;
  position: string;
  recruitId: bigint;

  updateCheckedSet(id: bigint, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  // 当表格内的单个复选框被选中时
  onItemChecked(id: bigint, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  // 当表头的复选框被选中时
  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }
  // 当前页面展示数据改变的回调函数：event是当页表格的数据数组对象（有待验证？）
  onCurrentPageDataChange($event: readonly Recomment[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }
  // // 更新状态
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
    });
  }
  // 获取报备列表
  fetchRecommentData() {
    this.recommentService.getRecommentList().subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    });
  }
  // 获取未面试报备列表
  fetchRecommentNotInterviewData() {
    const body = {
      'size': 5,
      'current': 1
    }
    this.recommentService.getRecommentNotInterview(body).subscribe(res => {
      if (res.code == 200) {
        console.log('获取未面试报备列表:' + JSON.stringify(res.data))
        this.notInterviewListOfData = res.data;
      }
    });
  }
  // 获取已面试报备列表
  fetchRecommentOkInterviewData() {
    const body = {
      'size': 5,
      'current': 1
    }
    this.recommentService.getRecommentOkInterview(body).subscribe(res => {
      if (res.code == 200) {
        this.okInterviewListOfData = res.data;
      }
    });
  }
  // 获取已入职报备列表
  fetchRecommentInductionData() {
    const body = {
      'size': 5,
      'current': 1
    }
    this.recommentService.getRecommentInduction(body).subscribe(res => {
      if (res.code == 200) {
        this.inductionListOfData = res.data;
      }
    });
  }
  // 获取已离职报备列表
  fetchRecommentLeaveOfficeData() {
    const body = {
      'size': 5,
      'current': 1
    }
    this.recommentService.getRecommentLeaveOffice(body).subscribe(res => {
      if (res.code == 200) {
        this.leaveOfficeListOfData = res.data;
      }
    });
  }
  // 获取推荐人列表 
  fetchRecommentUserList() {
    this.knightErrantService.getRecommentUserList().subscribe(res => {
      if (res.code == 200) {
        this.KnightErrantlist = res.data;
      }
    })
  }
  ngOnInit(): void {
    this.fetchRecommentData();
    this.fetchCompanyData();
    this.fetchRecommentNotInterviewData();
    this.fetchRecommentOkInterviewData();
    this.fetchRecommentInductionData();
    this.fetchRecommentLeaveOfficeData();
    this.fetchRecommentUserList();
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
    let { companyId } = this.recommentForm.value;
    this.companyList.filter(company => {
      if (company.id == companyId) {
        console.log("公司过滤名称：" + company.companyName);
        const param = { ...this.recommentForm.value, intentionCompany: company.companyName }
        console.log("参数：" + JSON.stringify(param));
        this.recommentService.updateRecomment(param).subscribe(res => {
          if (res.code == 200) {
            this.fetchRecommentData();
            this.nzMessageService.create('success', '修改报备成功');
          } else {
            this.nzMessageService.create('error', res.msg);
          }
        })
      }
    });
    this.isShowEditRecommentModel = false;
  }
  // 切换公司
  handleCompanyChange(value: any) {
      console.log("切换公司："+value);
      if(value !=null){
      this.recommentService.getRecruitPositionByCompanyId(value).subscribe(res=>{
        if(res.code == 200){
          console.log('公司招聘岗位：'+JSON.stringify(res.data))
          this.positionList = res.data;
        }
      });
    }
  }
  // 新增取消
  handleAddRecommentCancel() {
    this.isShowAddRecommentModel = false;
  }
  // 新增确认
  handleAddRecommentOk(e: Event, value: FormGroup) {
    Object.keys(this.recommentForm.controls).forEach(key => {
      this.recommentForm.controls[key].markAsDirty()
      this.recommentForm.controls[key].updateValueAndValidity()
    });
    let { companyId, recommentId, positionId} = this.recommentForm.value;

    this.companyList.filter(company => {
      if (company.id == companyId) {
        this.companyName = company.companyName;
      }
    });
    this.KnightErrantlist.filter(recome => {
      if (recome.id == recommentId) {
        this.recommentName = recome.nickName;
      }
    });
    this.positionList.filter(position =>{
      if(position.id == positionId){
          this.position = position.positionName;
          this.recruitId = position.recruitId;
      }
    })
    const param = { ...this.recommentForm.value, intentionCompany: this.companyName, 
      recommentName: this.recommentName ,position: this.position,recruitId:this.recruitId}
    console.log("参数：" + JSON.stringify(param));
    this.recommentService.addRecomment(param).subscribe(res => {
      if (res.code == 200) {
        this.fetchRecommentData();
        this.fetchRecommentNotInterviewData();
        this.nzMessageService.create('success', '新增报备成功');
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    })
    this.isShowAddRecommentModel = false;
  }
  // 查询
  search() {
    for (const i in this.recommentSearchForm.controls) {
      this.recommentSearchForm.controls[i].markAsDirty();
      this.recommentSearchForm.controls[i].updateValueAndValidity();
    }
    console.log("查询参数：" + JSON.stringify(this.recommentSearchForm.value))
    let { customName, telephone, gender, intentionCompany, status, recommentName } = this.recommentSearchForm.value;
    const body = {
      'customName': customName,
      'telephone': telephone,
      'gender': gender == null ? '' : gender,
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
  refleshData() {
    this.fetchRecommentData();
  }
  // 新增
  showAddModal() {
    this.resetForm();
    this.isShowAddRecommentModel = true
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
  // 面试
  changeInterviewStatus() {
    const param = new Array<bigint>();
    this.setOfCheckedId.forEach(s => {
      console.log('入职选中的' + s);
      param.push(s);
    });
    this.recommentService.changeInterviewStatus(param).subscribe(res => {
      if (res.code == 200) {
        console.log('修改状态成功');
        this.nzMessageService.create('success', '修改状态成功');
        this.fetchRecommentNotInterviewData();
        this.fetchRecommentOkInterviewData();
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    });
  }
  // 入职
  changeInductionStatus() {
    const param = new Array<bigint>();
    this.setOfCheckedId.forEach(s => {
      console.log('入职选中的' + s);
      param.push(s);
    });
    this.recommentService.changeInductionStatus(param).subscribe(res => {
      if (res.code == 200) {
        this.nzMessageService.create('success', '修改状态成功');
        this.fetchRecommentOkInterviewData();
        this.fetchRecommentInductionData();
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    });
    console.log('入职选中的长度' + this.setOfCheckedId.size)
  }
  // 离职
  changeLeaveOfficeStatus() {
    const param = new Array<bigint>();
    this.setOfCheckedId.forEach(s => {
      console.log('离职选中的' + s);
      param.push(s);
    });
    this.recommentService.changeLeaveOfficeStatus(param).subscribe(res => {
      if (res.code == 200) {
        this.nzMessageService.create('success', '修改状态成功');
        this.fetchRecommentInductionData();
        this.fetchRecommentLeaveOfficeData();
      } else {
        this.nzMessageService.create('error', res.msg);
      }
    });
  }
}
