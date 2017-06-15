import { Column } from './models/column';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, AfterViewChecked, Directive, Renderer, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { ToastsManager } from "@cmuh/components/src/app/toast";
import { Dt, Mt, MasterDetail } from "./models";
@Component({
  selector: 'cmuh-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit {
  constructor(public toastr: ToastsManager, private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  /**
   * 必要
   */
  @Input() columns: Column[] =[]; //table欄位
  @Input() inputData= [];//輸入資料
  //

 @Input() selectionMode:string="multiple";//選擇資料模式 single or multiple
  
  @Input() isShowTable: boolean = true;//table顯示隱藏
  @Input() tableWidth: string = "";//table寬度
  @Input() tableHeightValue: number = 30;//table高度值
  @Input() isScrollable:boolean=true;//可否捲動
  @Input() tableHeight: string = "";//table高度
  @Input() isShowDeleteButton:boolean=false;//刪除按鈕顯示
  @Input() isShowSelectCheckbox:boolean=true;//checkbox顯示
  @Output() onRowDblclick = new EventEmitter<any>();//明細修改事件
  @Output() onRowClick =new EventEmitter<any>();
  private index;//單選選擇項位
  private inputDtdatas: any[] = [];//明細資料
  private adddt; //明細單筆增加值
  @Input() selectedData;//明細選擇單筆
  private DataToRender: any[];//更新明細table

  //測試區
  selectMt: any[];
  selectedMt: any;

  ngOnInit() {
    this.tableHeight = `${this.tableHeightValue}vh`;
    this.dtUpdateDataToRender(this.inputData);
  
    }

  //更新子組件dt dataTable
   dtUpdateDataToRender(datasource) {
    if (datasource) {
      this.DataToRender = [];
      datasource.forEach(element => { this.DataToRender.push(element) });
    }
    else {
      this.DataToRender = datasource;
    }
  }
//左鍵單選一筆
rowClick(event){
  this.onRowClick.emit(event.data);
}


  //明細連點選單一筆
  rowDblclick(event) {
    this.onRowDblclick.emit(event.data);
  }

  //明細連點選單一筆附帶資料
  cloneDt(c) {
    let dt = [];
    for (let index in c) {
      dt[index] = c[index];
    }
    return dt;
  }


  //dt找到項位
  findSelectedDtIndex(data): number {
    return this.inputData.indexOf(data);
  }



dtdelete(rowValue){
let index: number = this.inputData.indexOf(rowValue);
    this.inputData = this.inputData.filter((val, i) => i != index);
    this.dtUpdateDataToRender(this.inputData);
}
}

