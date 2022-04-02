import { Component, OnInit } from '@angular/core';
import { KnightErrant } from '../knight-errant-type';
import { KnightErrantService } from '../knight-errant.service';


interface ItemData {
  id: number;
  nickName: string;
  age: number;
  gender: string;
  phone: string;
  identity: string;
  activaCode: string;
  creatime: string;
  address: string;
}

@Component({
  selector: 'app-knight-errant-list',
  templateUrl: './knight-errant-list.component.html',
  styleUrls: ['./knight-errant-list.component.css']
})
export class KnightErrantListComponent implements OnInit {
  wxUserList:any;
  // listOfSelection = [
  //   {
  //     text: 'Select All Row',
  //     onSelect: () => {
  //       this.onAllChecked(true);
  //     }
  //   },
  //   {
  //     text: 'Select Odd Row',
  //     onSelect: () => {
  //       this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
  //       this.refreshCheckedStatus();
  //     }
  //   },
  //   {
  //     text: 'Select Even Row',
  //     onSelect: () => {
  //       this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
  //       this.refreshCheckedStatus();
  //     }
  //   }
  // ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: Array<KnightErrant>;
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

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  // listOfData: any;
  constructor(private knightErrantService: KnightErrantService) { }


  ngOnInit(): void {
    this.knightErrantService.getWxUerList().subscribe(res=>{
      this.listOfData=res.data;
      console.log(this.listOfData)
    })
  }

}
