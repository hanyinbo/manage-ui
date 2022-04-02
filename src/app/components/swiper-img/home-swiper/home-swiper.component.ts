import { Component, OnInit } from '@angular/core';

import { SwiperImgService } from '../swiper-img.service';
import { SwiperImg } from '../swiper-img-type';
@Component({
  selector: 'app-home-swiper',
  templateUrl: './home-swiper.component.html',
  styleUrls: ['./home-swiper.component.css']
})
export class HomeSwiperComponent implements OnInit {

  constructor(private swiperImgService: SwiperImgService) { }

  ngOnInit(): void {
    this.swiperImgService.getSwiperImgList().subscribe(res=>{
      this.listOfData =  res.data
    })
  }

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly SwiperImg[] = [];
  listOfData: Array<SwiperImg>;
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

  onCurrentPageDataChange($event: readonly SwiperImg[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

}
