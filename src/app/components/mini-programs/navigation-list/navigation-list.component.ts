import { Component, OnInit } from '@angular/core';

import { MiniProgramsService } from '../mini-programs.service';
import { NavigationImg } from '../mini-type';
@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.css']
})
export class NavigationListComponent implements OnInit {

  constructor(private miniProgramsService: MiniProgramsService) { }

  ngOnInit(): void {
    this.miniProgramsService.getNavigationList().subscribe(res=>{
        this.listOfData = res.data;
    })
  }

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly NavigationImg[] = [];
  listOfData: Array<NavigationImg>;
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

  onCurrentPageDataChange($event: readonly NavigationImg[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

}
