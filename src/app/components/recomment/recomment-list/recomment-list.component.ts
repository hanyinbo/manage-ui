import { Component, OnInit } from '@angular/core';

import { RecommentService } from '../recomment.service';
import { Recomment } from '../recomment-type';
@Component({
  selector: 'app-recomment-list',
  templateUrl: './recomment-list.component.html',
  styleUrls: ['./recomment-list.component.css']
})
export class RecommentListComponent implements OnInit {

  constructor(private recommentService : RecommentService) { }

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Recomment[] = [];
  listOfData: Array<Recomment>;
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

  onCurrentPageDataChange($event: readonly Recomment[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  } 

  ngOnInit(): void {
    this.recommentService.getRecommendList().subscribe(res=>{
      this.listOfData = res.data
    })
  }


}
