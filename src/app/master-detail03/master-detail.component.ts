

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
  @Input() testdtColumns: Object[] = [];
  @Input() dtIndex;
  @Input() mtIndex;
  @Input() mtSelection: string = "multiple";
  @Input() contentDisplay: boolean = false;

  @Output() onDtRowSelect = new EventEmitter<any>();

  @Input() showMt: boolean = true;
  @Input() showCt: boolean = false;

  @Input() contentHeightValue: number = 30;
  private masterWidth: string = "";
  private rightDivWidth: string = "";
  private contentDivHeight: string = "";
  @Input() contentHeight: string = "";
  adddt;
  selectedDt;
  dtDataToRender: any[];
  @Input() searchValue: string = '';


  @Input() inputDtdatas: any[] = [];
  //測試區

  @Input() inputData: MasterDetail[] = [];
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
    let newData: MasterDetail[] = this.inputData.concat({ master: value, detail: [] });
    this.inputData = newData;
    this.toastr.success('新增成功!', 'Success!');
  }

  //mt刪除
  mtdelete(rowValue) {
    let index: number = this.inputData.indexOf(rowValue);
    this.inputData = this.inputData.filter((val, i) => i != index);
    this.toastr.warning('刪除成功', 'Success!');
  }

  //dt新增
  dtsave(adddt) {
    let newDetail = this.selectedMt['detail'].concat(adddt);
    this.selectedMt['detail'] = newDetail;
    this.dtUpdateDataToRender(this.selectedMt.detail);
    this.toastr.success('新增成功!', 'Success!');
  }
  //dt修改
  dtmodify(adddt) {
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
    if(this.searchValue==''){
       this.toastr.error('搜尋條件不能為空', 'Oops!');
    }
    else{
    for (var x in this.inputData) {
      for (var y in this.inputData[x].detail) {
        this.inputDtdatas.push(this.inputData[x].detail[y])
      }
    }
    this.inputDtdatas = this.inputDtdatas.filter(value => { return value.c1 == this.searchValue });
      this.toastr.info(`搜尋條件為: ${this.searchValue}`,'  ');
    this.dtUpdateDataToRender(this.inputDtdatas);
    this.inputDtdatas = [];
    this.searchValue='';
   
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

