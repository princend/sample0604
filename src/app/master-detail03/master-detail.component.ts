
import { templateJitUrl } from '@angular/compiler';


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
  @Input() contentHeight: number = 30;
  @Output() onDtRowSelect = new EventEmitter<any>();

  @Input()showMt:boolean=true;



  private masterWidth: string = "";
  private rightDivWidth: string = "";
  private contentDivHeight: string = "";

  adddt;
  selectedDt;
  dtDataToRender: any[];

  //測試區

  @Input() inputData: MasterDetail[] = [];
  selectMt: MasterDetail[];
  selectedMt: MasterDetail;

  ngOnInit() {
    this.masterWidth = `25vw`;
    this.rightDivWidth = `70vw`;
    this.contentDivHeight = `${this.contentHeight}vh`;
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



onShowMt(){
console.log("tehe");
}



}



