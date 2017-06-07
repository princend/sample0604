import { viewClassName } from '@angular/compiler/compiler';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, AfterViewChecked, Directive, Renderer, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { ToastsManager } from "@cmuh/components/src/app/toast";
import { Dt, Mt } from "./models";
@Component({
  selector: 'cmuh-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit {
  constructor(public toastr: ToastsManager, private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  @Input() testmtDatas: Mt[] = [];
  @Input() testdtDatas: Dt[] = [];
  @Input() testdtDatas1: Dt[] = [];
  @Input() testdtDatas2: Dt[] = [];
  @Input() testdtColumns: Object[] = [];
  @Input() mtSelection: string = "multiple";
  @Input() mtIndexValue;
  @Input() contentDisplay: boolean = false;
  @Input() contentHeight: number = 30;
  @Output() onMtRowSelect = new EventEmitter<any>()
  @Output() onDtRowSelect = new EventEmitter<any>();
  private masterWidth: string = "";
  private rightDivWidth: string = "";
  private contentDivHeight: string = "";
  value: Mt = new Mt();
  selectedValue: Mt;
  newValue: boolean;
  newdt: boolean;
  adddt: Dt = new Dt();
  selecteddt: Dt;
  //mt新增
  mtsave(value) {
    let temp = [...this.testmtDatas];
    temp.push(value);
    this.testmtDatas = temp;
    this.toastr.success('新增成功!', 'Success!');
  }
  //master刪除
  mtdelete(rowValue) {
    let index: number = this.testmtDatas.indexOf(rowValue);
    this.testmtDatas = this.testmtDatas.filter((val, i) => i != index);
    this.value = null;
    this.toastr.warning('刪除成功', 'Success!');
  }
  ngOnInit() {
    this.masterWidth = `25vw`;
    this.rightDivWidth = `70vw`;
    this.contentDivHeight = `${this.contentHeight}vh`;
  }

  //dt找到項位
  findSelectedDtIndex(): number {
    return this.testdtDatas.indexOf(this.selecteddt[0]);
  }
  //dt新增
  dtsave(adddt) {
    let temp = [...this.testdtDatas];
    temp.push(adddt)
    this.testdtDatas = temp;
    if (this.mtIndexValue == this.testmtDatas[0].value) { //tehe
      this.testdtDatas1 = temp;
    }
    else if (this.mtIndexValue == this.testmtDatas[1].value) {
      this.testdtDatas2 = temp;
    }
    this.toastr.success('新增成功!', 'Success!');
  }
  //dt修改
  dtmodify(dt) {
    let temp = [...this.testdtDatas];
    temp[this.findSelectedDtIndex()] = dt;
    this.testdtDatas = temp;
    dt = new Dt();
    if (this.mtIndexValue == this.testmtDatas[0].value) {
      this.testdtDatas1 = temp;
    }
    else if (this.mtIndexValue == this.testmtDatas[1].value) {
      this.testdtDatas2 = temp;
    }
    this.toastr.success('修改成功!', 'Success!');
    return this.testdtDatas;
  }

  //dtdatablechange
  public async dtchange(eventdatavalue) {
    if (eventdatavalue == this.testmtDatas[0].value) {
      this.testdtDatas = this.testdtDatas1;
    }
    else if (eventdatavalue == this.testmtDatas[1].value) {
      this.testdtDatas = this.testdtDatas2;
    }
    else {
      this.testdtDatas = [];
    }
  };

  //dt刪除
  dtdelete(rowValue) {
    let index: number = this.testdtDatas.indexOf(rowValue);
    this.testdtDatas = this.testdtDatas.filter((val, i) => i != index);
    this.value = null;

    if (this.mtIndexValue == this.testmtDatas[0].value) {
      this.testdtDatas1 = this.testdtDatas;
    }
    else if (this.mtIndexValue == this.testmtDatas[1].value) {
      this.testdtDatas2 = this.testdtDatas;
    }
    this.toastr.warning('刪除成功', 'Success!');
  }

  //主檔選單一筆

  public mtRowSelected(event) {
    this.mtIndexValue = event.data.value;
    this.onMtRowSelect.emit(event);
  }
  //明細連點選單一筆
  DtRowSelect(event) {
    this.adddt = this.cloneDt(event.data);
    this.onDtRowSelect.emit(this.adddt);
  }
  //明細連點選單一筆附帶資料
  cloneDt(c) {
    let dt = new Dt();
    for (let prop in c) {
      dt[prop] = c[prop];
    }
    return dt;
  }

}
