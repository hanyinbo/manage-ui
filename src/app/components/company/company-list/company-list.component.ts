import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';


import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CompanyService } from '../company.service';
import { Recruit, Company, CompanyImg, UploadImg } from '../company-type';


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {


  controlArray: Array<{ index: number; show: boolean }> = [];
  formContorl: Array<{ name: string; show: boolean }> = [];
  isCollapse = false;

  companyImgIds = new Set<bigint>();
  companyImgList: Array<UploadImg>;

  companyEditIdList: Array<bigint>;
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
      companyImgIdList: [''],
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
  companyImg: CompanyImg;
  nzUploadFile: Array<NzUploadFile>;
  listOfCurrentPageData: readonly Company[] = [];
  listOfData: Array<Company>;
  setOfCheckedId = new Set<bigint>();



  fileList: NzUploadFile[] = [];
  uploadFile: NzUploadFile;

  previewImage: string | undefined = '';
  previewVisible = false;


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
    this.fetchCompanyList();
  }
  // 获取公司列表
  fetchCompanyList() {
    this.companyService.getCompanyList().subscribe(res => {
      this.listOfData = res.data;
    });
  }
  // 获取公司图片
  fetchCompanyImgList(id: bigint) {
    this.companyService.getCompanyImgList(id).subscribe(res => {
      if (res.code == 200) {
        if(res.data==null){
          this.fileList=[];
        }else{
          this.fileList = res.data;
        }  
      }
    })
  }
  // 点击修改按钮
  showEditModal(id: bigint): void {
    this.isShowEditCompanyModel = true;
    this.editCompanyId = id;

    this.companyImgIds= new Set<bigint>();

    this.companyService.getCompanyInfo(id).subscribe(res => {
      if (res.code == 200) {
        this.companyForm.patchValue(res.data);
        this.companyEditIdList = res.data.companyImgIdList;
      }
    });
    this.fetchCompanyImgList(id);
  }
  // 点击详情按钮
  showInfoModal(id: bigint): void {
    this.isShowInfoCompanyModel = true;
    this.companyService.getCompanyInfo(id).subscribe(res => {
      if (res.code == 200) {
        console.log('公司信息：' + JSON.stringify(res.data))
        this.companyForm.patchValue(res.data);
      }
    });
    this.fetchCompanyImgList(id);
    // if(this.fileList == null){
    //   console.log('图片为空');
    // }
  }
  // 点击新增按钮
  showAddModal(): void {
    this.isShowAddCompanyModel = true;
    this.resetAddForm();
    this.fileList = [];
    this.companyImgIds= new Set<bigint>();
  }
  // 点击编辑公司确认按钮
  handleEditCompanyOk(e: Event, value: FormGroup): void {
    this.isShowEditCompanyModel = false;
    const editCompanyForm = this.companyForm;
    const { controls } = editCompanyForm;

    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty()
      controls[key].updateValueAndValidity()
    });
    this.companyImgIds.forEach(id => {
      this.companyEditIdList.push(id);
    });
    const param = { ...this.companyAddForm.value, id: this.editCompanyId, companyImgIdList: this.companyEditIdList };
    this.companyService.updateCompany(param).subscribe(res => {
      if (res.code == 200) {
        this.fetchCompanyList();
        this.nzMessageService.create('success', '修改公司成功');
      } else {
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
  handleAddCompanyOk = (e: Event, value: FormGroup) => {
    //  e.preventDefault()
    const companyImgIdList = new Array<bigint>();

    Object.keys(this.companyAddForm.controls).forEach(key => {
      this.companyAddForm.controls[key].markAsDirty()
      this.companyAddForm.controls[key].updateValueAndValidity()
    });
    if (this.companyAddForm.valid) {
      this.isShowAddCompanyModel = false;
      this.companyImgIds.forEach(id => {
        companyImgIdList.push(id);
      })
      const param = { ...this.companyAddForm.value, companyImgIdList: companyImgIdList };
      console.log('新增公司信息：' + JSON.stringify(param))
      this.companyService.addCompany(param).subscribe(res => {
        if (res.code == 200) {
          this.listOfData.push(this.companyAddForm.value);
          this.fetchCompanyList();
          this.nzMessageService.create('success', '新增公司成功');
        } else {
          this.nzMessageService.create('error', res.msg)
        }
      })
    }else{
      this.nzMessageService.create('error', '公司图片不能为空');
    }
  }
  // 点击新增公司取消按钮
  handleAddCompanyCancel(): void {
    this.isShowAddCompanyModel = false;
  }
  // 点击公司详情右上角按钮
  handleInfoCompanyCancel(): void {
    this.isShowInfoCompanyModel = false;
  }

  // 删除公司
  delConfirm(id: bigint) {
    console.log('删除ID:' + id)
    this.companyService.delCompanyById(id).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = this.listOfData.filter(company => company.id != id)
        this.nzMessageService.create('success', '删除公司成功');
      } else {
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
    return company.id;
  }

  // 查询
  search() {
    for (const i in this.companySearchForm.controls) {
      this.companySearchForm.controls[i].markAsDirty();
      this.companySearchForm.controls[i].updateValueAndValidity();
    }
    let { companyName, companyCode, industry, region, address } = this.companySearchForm.value;
    const body = {
      'companyName': companyName,
      'companyCode': companyCode,
      'industry': industry,
      'region': region,
      'address': address,
      'size': 5,
      'current': 1
    }
    this.companyService.getPageOfCompany(body).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data
      }
    })
  }
  // 重置查询表单
  resetForm(): void {
    this.companySearchForm.reset();
  }
  // 重置新增表单
  resetAddForm(): void {
    this.companyAddForm.reset();
  }
  // 上传文件前校验
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      this.resetForm();
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.nzMessageService.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.nzMessageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
  });

  // 自定义文件预览逻辑
  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  // 上传图片后的回调
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      if (info.file.response.code == 200) {
        this.companyImg = info.file.response.data;
        console.log('公司图片对象：' + JSON.stringify(this.companyImg));
        this.companyImgIds.add(this.companyImg.id);
        console.log('上传图片的ID:' + this.companyImgIds);
        this.nzMessageService.success(`${info.file.name} 上传成功`);
      } else {
        this.nzMessageService.error(`${info.file.name} 上传失败:` + info.file.response.msg);
      }
    } else if (info.file.status === 'error') {
      this.nzMessageService.error(`${info.file.name} 上传失败`);
    }
  }

}
