

import { viewClassName } from '@angular/compiler/compiler';
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
  @Input() testdtColumns: Object[] = []; //明細欄位
  @Input() inputData: MasterDetail[] = [];//輸入資料
  @Input() showMt: boolean = true;//主檔顯示隱藏
  @Input() showCt: boolean = false;//內容顯示隱藏
  @Input() contentHeightValue: number = 30;//內容高度值
  @Input() contentHeight: string = "";//內容高度
  @Output() onDtRowSelect = new EventEmitter<any>();//明細修改事件
  @Output() onMtRowSelect = new EventEmitter<any>();//主檔修改事件
  private mtIndex;//主檔選擇項位
  private dtIndex;//明細選擇項位
  private searchValue: string = '';//搜尋條件
  private inputDtdatas: any[] = [];//明細資料
  private masterWidth: string = "";//mt寬度
  private rightDivWidth: string = "";//右分頁寬度

  private addmt;//主檔單筆增加 值
  private adddt; //明細單筆增加 值
  private selectedDt;//明細選擇單筆
  private dtDataToRender: any[];//更新明細table



  //測試區


  selectMt: MasterDetail[];
  selectedMt: MasterDetail;

  ngOnInit() {
    this.masterWidth = `25vw`;
    this.rightDivWidth = `70vw`;
    this.contentHeight = `${this.contentHeightValue}vh`;
  }

  //更新子組件dt dataTable
  private dtUpdateDataToRender(datasource) {
    if (datasource) {
      this.dtDataToRender = [];
      datasource.forEach(element => { this.dtDataToRender.push(element) });
    }
    else {
      this.dtDataToRender = datasource;
    }
  }

  //mt新增
  mtsave(value) {
    console.log(value);
    let newData: MasterDetail[] = this.inputData.concat({ master: value, detail: [] });
    this.inputData = newData;
    this.toastr.success('新增成功!', 'Success!');
  }

//mt修改
mtmodify(addmt){
  console.log(addmt);
let mtIndex=this.findSelectedMtIndex();
this.selectedMt.master=addmt;
this.toastr.success('修改成功!', 'Success!');
}

  //mt刪除
  mtdelete(rowValue) {
    let index: number = this.inputData.indexOf(rowValue);
    this.inputData = this.inputData.filter((val, i) => i != index);
    this.toastr.warning('刪除成功', 'Success!');
  }

  //dt新增
  dtsave(adddt) {
     // console.log(adddt);
    let newDetail = this.selectedMt['detail'].concat(adddt);
    this.selectedMt['detail'] = newDetail;
    this.dtUpdateDataToRender(this.selectedMt.detail);
    this.toastr.success('新增成功!', 'Success!');
  }
  //dt修改
  dtmodify(adddt) {
  //  console.log(adddt);
    let mtIndex = this.findSelectedMtIndex();
    let dtIndex = this.findSelectedDtIndex();
    this.selectedMt.detail[dtIndex] = adddt;
    this.dtUpdateDataToRender(this.selectedMt.detail);
    this.toastr.success('修改成功!', 'Success!');
  }

  //dt刪除
  dtdelete(rowValue) {
    this.selectedMt['detail'] = this.selectedMt['detail'].filter(value => { return value != rowValue });
    this.dtUpdateDataToRender(this.selectedMt.detail);
    this.toastr.warning('刪除成功', 'Success!');
  }

  //主檔選單一筆
  public mtRowSelected(event) {
    this.selectedMt = this.selectMt[0];
    this.dtUpdateDataToRender(this.selectedMt.detail);
  }

  //明細連點選單一筆
  DtRowSelect(event) {
    this.adddt = this.cloneDt(event.data);
    this.onDtRowSelect.emit(this.adddt);
  }
//主檔連點選單一筆
  MtRowSelect(event) {
    this.addmt=event.data.master;
  this.onMtRowSelect.emit(this.addmt);
  }
  //明細連點選單一筆附帶資料
  cloneDt(c) {
    let dt = [];
    for (let index in c) {
      dt[index] = c[index];
    }
    return dt;
  }


  //mt找到項位
  findSelectedMtIndex(): number {
    return this.inputData.indexOf(this.selectedMt);
  }

  //dt找到項位
  findSelectedDtIndex(): number {
    return this.selectedMt.detail.indexOf(this.selectedDt[0]);
  }



  onShowMt() {
    if (this.showMt == true) {
      this.showMt = false
      this.masterWidth = `0vw`;
      this.rightDivWidth = `95vw`;
    }
    else {
      this.showMt = true;
      this.masterWidth = `25vw`;
      this.rightDivWidth = `70vw`;
    }



  }

  onShowCt() {
    if (this.showCt) {
      this.showCt = false;
    }
    else
      this.showCt = true;
  }

  onSearchClick() {
    if (this.searchValue == '') {
      this.toastr.error('搜尋條件不能為空', 'Oops!');
    }
    else {
      for (var x in this.inputData) {
        for (var y in this.inputData[x].detail) {
          this.inputDtdatas.push(this.inputData[x].detail[y])
        }
      }
      this.inputDtdatas = this.inputDtdatas.filter(value => { return value.c1 == this.searchValue });
      this.toastr.info(`搜尋條件為: ${this.searchValue}`, '  ');
      this.dtUpdateDataToRender(this.inputDtdatas);
      this.inputDtdatas = [];
      this.searchValue = '';

    }
  }




  /*for (var x=0;x<this.inputData.length;x++){
  for (var y=0;y<this.inputData[x].detail.length;y++){
    this.inputDtdatas.push(this.inputData[x].detail[y])
  }
  }
  */



  /*  [
      {
        master: 1, detail: [{ c1: 1, c2: 7, c3: 3 },
        { c1: 2, c2: 5, c3: 6 },
        { c1: 3, c2: 8, c3: 9 }]
      },
      {
        master: 2, detail: [{ c1: 1, c2: 22, c3: 33 },
        { c1: 21, c2: 55, c3: 66 },
        { c1: 34, c2: 88, c3: 99 }]
      }
    ]
  */
}

