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
  @Input() testmtDatas: PrimeValue[] = [];
  @Input() testdtDatas: Object[] = [];
  @Input() testdtDatas1: Object[] =
  []
  @Input() testdtDatas2: Object[] =
  [{ "c1": 1, "c2": 22, "c3": 33 },
  { "c1": 21, "c2": 55, "c3": 66 },
  { "c1": 34, "c2": 88, "c3": 99 }]
  @Input() testdtColumns: Object[]=[];
  @Input() mtWidth: number = 5;
  @Input() mtSelection: string = "multiple";
  @Input() mtColumns: GridColumn[] = [];
  @Input() mtDatas: Object[] = [];
  @Input() mtDataKey: string = null;
  @Input() contentDisplay: boolean = false;
  @Input() contentHeight: number = 30;
  @Input() dtSelection: string = "multiple";

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
    return this.testdtDatas.indexOf(this.selecteddt);
  }
  //dt新增
  dtsave() {
    let temp = [...this.testdtDatas];
    temp.push(this.adddt)
    console.log(this.adddt.c1);
    if (temp) {
      this.testdtDatas = [];
      for (let i = 0; i < temp.length; i++) {
        this.testdtDatas.push(temp[i]);
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
    let temp = [...this.testdtDatas];
    temp[this.findSelectedDtIndex()] = this.adddt;
    this.testdtDatas = temp;
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
    this.dtdisplayDialog = false;
        if (this.mtIndexValue == 1) {
      this.testdtDatas1 = this.testdtDatas;
    }
    else if (this.mtIndexValue == 2) {
      this.testdtDatas2 = this.testdtDatas;
    }
    this.toastr.warning('刪除成功', 'Success!');
  }

  //主檔選單一筆

 @Input() mtIndexValue;
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
