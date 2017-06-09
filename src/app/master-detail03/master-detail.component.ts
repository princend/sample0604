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
export class MasterDetailComponent implements OnInit, OnChanges {
  constructor(public toastr: ToastsManager, private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  @Input() testmtDatas: Mt[] = [];
  @Input() testdtDatas: Dt[] = [];
  @Input() testdtDatas1: Dt[] =
  [{ "c1": 1, "c2": 7, "c3": 3 },
  { "c1": 2, "c2": 5, "c3": 6 },
  { "c1": 3, "c2": 8, "c3": 9 }];
  @Input() testdtDatas2: Dt[] = [];
  @Input() testdtColumns: Object[] = [{ field: "c1", header: "c1" },
  { field: "c2", header: "c2" },
  { field: "c3", header: "c3" }];
  ;;


  @Input() dtIndex;
  @Input() mtIndex;
  @Input() mtSelection: string = "multiple";
  @Input() mtIndexValue;
  @Input() contentDisplay: boolean = false;
  @Input() contentHeight: number = 30;
  @Output() onMtRowSelect = new EventEmitter<any>()
  @Output() onDtRowSelect = new EventEmitter<any>();
  @Output() onEditDetail = new EventEmitter();

  private masterWidth: string = "";
  private rightDivWidth: string = "";
  private contentDivHeight: string = "";

  private testdtDatas3 = [];
  value: Mt = new Mt();

  adddt: Dt = new Dt();
  selectedDt;


  dtDatas;



dtDataToRender:any[];




  //測試區

  @Input() inputData: MasterDetail[] = [

  ]

  selectMt: MasterDetail[];
  selectedMt;
  //測試區結束

  //mt新增
  mtsave(value) {
    let newData: MasterDetail[] = this.inputData.concat({ master: value, detail: [] });
    this.inputData = [];
    this.inputData = newData;
    this.toastr.success('新增成功!', 'Success!');
  }
  //master刪除
  mtdelete(rowValue) {
    let index: number = this.inputData.indexOf(rowValue);
    this.inputData = this.inputData.filter((val, i) => i != index);
    this.toastr.warning('刪除成功', 'Success!');
  }
  ngOnInit() {
    this.masterWidth = `25vw`;
    this.rightDivWidth = `70vw`;
    this.contentDivHeight = `${this.contentHeight}vh`;
  
  }
  //mt找到項位
  findSelectedMtIndex(): number {
    return this.inputData.indexOf(this.selectedMt);
  }
  //dt找到項位
  findSelectedDtIndex(): number {
    return this.selectedMt.detail.indexOf(this.selectedDt[0]);
  }
  //dt新增

  dtsave(adddt) {
    let newDetail = this.selectedMt['detail'].concat(adddt);
    this.selectedMt['detail'] = [];
    this.selectedMt['detail'] = newDetail;
     this.dtUpdateDataToRender(this.selectedMt.detail);
    this.toastr.success('新增成功!', 'Success!');
  }

  //dt修改
  dtmodify(adddt) {
    let mtIndex = this.findSelectedMtIndex();
    let dtIndex = this.findSelectedDtIndex();
    //this.inputData[mtIndex].detail[dtIndex] = adddt;
    
    this.selectedMt.detail[dtIndex]=adddt;
    this.dtUpdateDataToRender(this.selectedMt.detail);
    this.toastr.success('修改成功!', 'Success!');

  }


  ngOnChanges() {

  }



  private dtUpdateDataToRender(datasource) {

        if(datasource) {
            this.dtDataToRender = [];
            for(let i = 0; i < datasource.length; i++) {            
                this.dtDataToRender.push(datasource[i]);
            }
        }
        else {
            this.dtDataToRender = datasource;
        }
 }






  /*
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
  */

  /*
  空陣列方法
  let temp=this.inputData;
  this.inputData=[];
  temp[x].detail[y]=adddt;
  this.inputData=temp;
  
  */


  /*private inputData:MasterDetail[] =[
  {     master: 1 ,detail:[{ c1: 1, c2: 7, c3: 3 },
    { c1: 2, c2: 5, c3: 6 },
    { c1: 3, c2: 8,c3: 9 }] },
    {master:2,detail:[{ c1: 1, c2: 22, c3: 33 },
    { c1: 21, c2: 55, c3: 66 },
    { c1: 34, c2: 88, c3: 99 }]}
  
  ] 
  
  */







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
    let dt = new Dt();
    for (let prop in c) {
      dt[prop] = c[prop];
    }
    return dt;
  }

}



