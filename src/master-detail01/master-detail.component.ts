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
  private multidtDatas = [];
  private testdtDatas3 = [];
  value: Mt = new Mt();
  selectedMt: Mt;
  adddt: Dt = new Dt();
  selectedDt: Dt;


  dtDatas;






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
  //mt找到項位
  findSelectedMtIndex(): number {
    return this.testmtDatas.indexOf(this.selectedMt[0]);
  }
  //dt找到項位
  findSelectedDtIndex(): number {
    return this.testdtDatas.indexOf(this.selectedDt[0]);
  }
  //dt新增

  //好的
  dtsave(adddt) {
    let temp = [...this.testdtDatas];
    temp.push(adddt);
    this.testdtDatas = temp;
    this.adddt = new Dt();
    if (this.mtIndexValue == this.testmtDatas[0].value) {
      this.testdtDatas1 = temp;
    }
    else if (this.mtIndexValue == this.testmtDatas[0].value) {
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
    this.dtremain();
    this.toastr.success('修改成功!', 'Success!');
    return this.testdtDatas;
  }

  //dtdatablechange

  //方法一

  /*  public async dtchange() {
      this.multidtDatas=[this.testdtDatas1,this.testdtDatas2,...this.dtDatas]
      for (var i in this.testmtDatas){
        let index=+i;
        if (this.findSelectedMtIndex()==index){
          this.testdtDatas=this.multidtDatas[index];
        }
      }
    }*/


  //方法二
  public async dtchange() {
    if (this.mtIndexValue == this.testmtDatas[0].value) {
      this.testdtDatas = this.testdtDatas1;
    }
    else if (this.mtIndexValue == this.testmtDatas[1].value) {
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
    this.dtremain();
    this.toastr.warning('刪除成功', 'Success!');
  }

  //保留dt
  public dtremain() {
    if (this.mtIndexValue == this.testmtDatas[0].value) {
      this.testdtDatas1 = this.testdtDatas;
    }
    else if (this.mtIndexValue == this.testmtDatas[1].value) {
      this.testdtDatas2 = this.testdtDatas;
    }
    else {
      this.testdtDatas = [];
    }
  };



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
