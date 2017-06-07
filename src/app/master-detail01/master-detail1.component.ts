import { Value } from './value';
import { viewClassName } from '@angular/compiler/compiler';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, AfterViewChecked, Directive, Renderer, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { GridColumn } from './models';
import { ToastsManager } from "@cmuh/components/src/app/toast";

@Component({
  selector: 'cmuh-master-detail',
  templateUrl: './master-detail1.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit {
  constructor(public toastr: ToastsManager, private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  @Input() testmtDatas: PrimeValue[] = [];
  @Input() testdtDatas: Object[] = [];
  @Input() testdtDatas1: Object[] = [];
  @Input() testdtDatas2: Object[] = [];
  @Input() testdtColumns: Object[] = [];
  @Input() mtSelection: string = "multiple";
  @Input() mtColumns: GridColumn[] = [];
  @Input() mtDatas: Object[] = [];
  @Input() mtIndexValue;
  @Input() contentDisplay: boolean = false;
  @Input() contentHeight: number = 30;
  @Output() onMtRowSelect = new EventEmitter<any>()
  @Output() onDtRowSelect = new EventEmitter<any>();
  private masterWidth: string = "";
  private rightDivWidth: string = "";
  private contentDivHeight: string = "";
  private detailHeight: string = "";



  value: PrimeValue = new PrimeValue();
  selectedValue: PrimeValue;
  newValue: boolean;
  newdt: boolean;
  adddt: PrimeDt = new PrimeDt();
  selecteddt: PrimeDt;

  mtsave(value) {
    let temp = [...this.testmtDatas];
    temp.push(value);
    this.testmtDatas = temp;
  
    this.toastr.success('新增成功!', 'Success!');
  }


/*  mtsave(value) {
    let temp = this.testmtDatas;
    temp.push(value);
    this.testmtDatas = [];
    temp.forEach((value) => this.testmtDatas.push(value));
    this.toastr.success('新增成功!', 'Success!');
  }
*/


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
    this.detailHeight = `${100 - this.contentHeight - 5}vh`;
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
    dt = new PrimeDt();
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

  cloneDt(c) {
    let dt = new PrimeDt();
    for (let prop in c) {
      dt[prop] = c[prop];
    }
    return dt;
  }

}

export class PrimeValue {
  public value;
  constructor() { }
}

export class PrimeDt {
  public c1;
  public c2;
  public c3;
  constructor() { }
}
