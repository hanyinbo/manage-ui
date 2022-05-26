import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SwiperImgService } from '../swiper-img.service';
import { SwiperImg } from '../swiper-img-type';
@Component({
  selector: 'app-home-swiper',
  templateUrl: './home-swiper.component.html',
  styleUrls: ['./home-swiper.component.css']
})
export class HomeSwiperComponent implements OnInit {

  swiperForm: FormGroup;
  imgUrl: string;

  isShowEditSwiperImgModel = false;

  editSwiperId: bigint;
  constructor(private swiperImgService: SwiperImgService,
    private msg: NzMessageService, private fb: FormBuilder) {
    this.swiperForm = this.fb.group({
      id: [''],
      imgName: ['',[Validators.required]],
      imgUrl: [''],
      navigatorUrl: ['']
    });
  }

  ngOnInit(): void {
     this.fetchSwiperImgData();
  }

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly SwiperImg[] = [];
  listOfData: Array<SwiperImg>;
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

  onCurrentPageDataChange($event: readonly SwiperImg[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log("上传图片：" + info.file.name);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 上传失败`);
    }
  }
  fetchSwiperImgData(){
    this.swiperImgService.getCarouselImgList().subscribe(res => {
    this.listOfData = res.data
    });

  }
  // 取消删除
  delCancel() {
    this.msg.info('取消删除', { nzDuration: 1000 });
  }
  // 确认删除
  delConfirm(id: bigint) {
    this.swiperImgService.deleteMiniCarouselImg(id).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = this.listOfData.filter(img => img.id != id);
        this.msg.create('success', '删除图片成功');
      } else {
        this.msg.create('error', res.msg);
      }
    });
  }
  // 点击修改按钮
  showEditModal(id: bigint): void {
    console.log('修改轮播图事件ID:' + id)
    this.isShowEditSwiperImgModel = true;
    this.editSwiperId = id;
    this.swiperImgService.getCarouselOrNavImgInfo(id).subscribe(res => {
      if (res.code == 200) {
        this.imgUrl=res.data.imgUrl;
        console.log("图片："+this.imgUrl)
        console.log('轮播图详情：' + JSON.stringify(res.data))
        this.swiperForm.patchValue(res.data)
      }
    });
  }
  // 编辑取消
  handleEditSwiperImgCancel() {
    this.isShowEditSwiperImgModel = false;
  }
  // 编辑确认
  handleEditSwiperImgOk(e: Event, value: FormGroup): void {
    this.isShowEditSwiperImgModel = false;
    const editPositionForm = this.swiperForm;
    const { controls } = editPositionForm;

    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty()
      controls[key].updateValueAndValidity()
    })
    const param = { ...this.swiperForm.value, id: this.editSwiperId };
    console.log('修改轮播图入参：' + JSON.stringify(param))
    this.swiperImgService.updateCarouselOrNavUrl(param).subscribe(res => {
      console.log('响应值：' + JSON.stringify(res))
      if (res.code == 200) {
        console.log('修改结果：' + res.data)
        this.fetchSwiperImgData();
        this.msg.create('success', '修改轮播图信息成功');
      } else {
        this.msg.create('error', res.msg);
      }
    })
  }

}
