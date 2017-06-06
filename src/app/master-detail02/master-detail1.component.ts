import { Value } from './value';
import { viewClassName } from '@angular/compiler/compiler';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, AfterViewChecked, Directive, Renderer, ChangeDetectorRef ,ViewContainerRef} from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { GridColumn } from './models';
import { ToastsManager } from "@cmuh/components/src/app/toast";

@Component({
  selector: 'cmuh-master-detail',
  templateUrl: './master-detail1.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit, OnChanges {
  constructor(public toastr: ToastsManager, private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  private testmtDatas: PrimeValue[] = [
    { "value": 1 },
    { "value": 2 },
    { "value": 3 },
    { "value": 4 },
    { "value": 5 },
    { "value": 6 },
    { "value": 7 }
  ];
  @Input() testdtDatas0: Object[] = [];
  @Input() testdtDatas1: Object[] =
  [{ "c1": 1, "c2": 7, "c3": 3 },
  { "c1": 2, "c2": 5, "c3": 6 },
  { "c1": 3, "c2": 8, "c3": 9 }]
  @Input() testdtDatas2: Object[] =
  [{ "c1": 1, "c2": 22, "c3": 33 },
  { "c1": 21, "c2": 55, "c3": 66 },
  { "c1": 34, "c2": 88, "c3": 99 }]
  @Input() testdtColumns: Object[] =
  [{ "field": "c1", "header": "c1" },
  { "field": "c2", "header": "c2" },
  { "field": "c3", "header": "c3" }];
  ;
  @Input() mtWidth: number = 5;
  @Input() mtSelection: string = "multiple";
  @Input() mtColumns: GridColumn[] = [];
  @Input() mtDatas: Object[] = [];
  @Input() mtDataKey: string = null;
  @Input() mtShowDeleteBtn: boolean = false;
  @Input() contentDisplay: boolean = false;
  @Input() contentHeight: number = 30;
  @Input() dtSelection: string = "multiple";
  @Input() dtColumns: GridColumn[] = [];
  @Input() dtDatas: Object[] = [];
  @Input() dtDataKey: string = null;
  @Input() dtShowDeleteBtn: boolean = false;


  private masterWidth: string = "";
  private rightDivWidth: string = "";
  private contentDivHeight: string = "";
  private detailHeight: string = "";



  value: PrimeValue = new PrimeValue();
  selectedValue: PrimeValue;
  newValue: boolean;
  newdt: boolean;
  adddt: PrimeDt = new PrimeDt();
  displayDialog: boolean;
  dtdisplayDialog: boolean;
  warningDisplayDialog: boolean;
  dtchdisplayDialog: boolean;
  testmtshowDialogToAdd() {
    this.newValue = true;
    this.value = new PrimeValue();
    this.displayDialog = true;
  }
  testdtshowDialogToAdd() {
    this.newdt = true;
    this.adddt = new PrimeDt();
    this.dtdisplayDialog = true;
  }
  showDialogToWarning(rowValue) {
    this.warningDisplayDialog = true;
    this.mtdelete(rowValue);
  }
  //master新增
  mtsave() {
    let temp = this.testmtDatas;
    temp.push(this.value)
    if (temp) {
      this.testmtDatas = [];
      for (let i = 0; i < temp.length; i++) {
        this.testmtDatas.push(temp[i]);
      }
    }
    this.displayDialog = false;
     this.toastr.success('新增成功!', 'Success!');
  }
  //master刪除
  mtdelete(rowValue) {
    let index: number = this.testmtDatas.indexOf(rowValue);
    this.testmtDatas = this.testmtDatas.filter((val, i) => i != index);
    this.value = null;
     this.toastr.warning('刪除成功', 'Success!');
  }
  //關閉彈窗
  close() {
    this.displayDialog = false;
    this.dtdisplayDialog = false;
    this.warningDisplayDialog = false;
    this.dtchdisplayDialog = false;
  }
  //mt找項位
  findSelectedValueIndex(): number {
    return this.testmtDatas.indexOf(this.selectedValue);
  }
  selecteddt: PrimeDt;

  ngOnInit() {
    console.log("ngOnInit");
    this.masterWidth = `${this.mtWidth}vw`;
    this.rightDivWidth = `${100 - this.mtWidth - 5}vw`;
    this.contentDivHeight = `${this.contentHeight}vh`;
    this.detailHeight = `${100 - this.contentHeight - 5}vh`;
  }
  ngOnChanges() {
    console.log("ngOnChanges");
  }
  //dt找到項位
  findSelectedDtIndex(): number {
    return this.testdtDatas0.indexOf(this.selecteddt);
  }
  //dt新增
  dtsave() {
    let temp = [...this.testdtDatas0];
    temp.push(this.adddt)
    console.log(this.adddt.c1);
    if (temp) {
      this.testdtDatas0 = [];
      for (let i = 0; i < temp.length; i++) {
        this.testdtDatas0.push(temp[i]);
      }
    }
    this.adddt = new PrimeDt();
    this.dtdisplayDialog = false;
    if (this.mtIndexValue == 1) {
      this.testdtDatas1 = temp;
    }
    else if (this.mtIndexValue == 2) {
      this.testdtDatas2 = temp;
    }
 this.toastr.success('新增成功!', 'Success!');
  }
  //dt修改
  dtmodify() {
    let temp = [...this.testdtDatas0];
    temp[this.findSelectedDtIndex()] = this.adddt;
    this.testdtDatas0 = temp;
    this.adddt = new PrimeDt();
    this.dtchdisplayDialog = false;

    if (this.mtIndexValue == 1) {
      this.testdtDatas1 = temp;
    }
    else if (this.mtIndexValue == 2) {
      this.testdtDatas2 = temp;
    }
     this.toastr.success('修改成功!', 'Success!');
  }
  //dtdatablechange
  public async dtchange(eventdatavalue) {

    if (eventdatavalue == this.testmtDatas[0].value) {
      this.testdtDatas0 = this.testdtDatas1;
    }
    else if (eventdatavalue == this.testmtDatas[1].value) {
      this.testdtDatas0 = this.testdtDatas2;
    }
    else {
      this.testdtDatas0 = [];
    }
  };
  //dt刪除
  dtdelete(rowValue) {
    let index: number = this.testdtDatas0.indexOf(rowValue);
    this.testdtDatas0 = this.testdtDatas0.filter((val, i) => i != index);
    this.value = null;
    this.dtdisplayDialog = false;
        if (this.mtIndexValue == 1) {
      this.testdtDatas1 = this.testdtDatas0;
    }
    else if (this.mtIndexValue == 2) {
      this.testdtDatas2 = this.testdtDatas0;
    }
    this.toastr.warning('刪除成功', 'Success!');
  }

  //主檔選單一筆

  mtIndexValue;
  public handleMtRowSelected(event) {
    this.mtIndexValue = event.data.value;
    this.dtchange(event.data.value);
  }
  //明細選單一筆
  onRowSelect(event) {
    this.newdt = true;
    this.adddt = this.cloneDt(event.data);
    this.dtchdisplayDialog = true;
    this.displayDialog = false;
  }

  cloneDt(c) {
    let dt = new PrimeDt();
    for (let prop in c) {
      dt[prop] = c[prop];
    }
    return dt;
  }
  update(dt) {
    dt.reset();
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
