

import { AfterViewInit, Component, OnChanges, OnInit, ViewChild,DoCheck } from '@angular/core';
import { Dt, Mt, MasterDetail } from '../models';
import { MasterDetailComponent03 } from "../master-detail03.component";

@Component({
  selector: 'cmuh-master-detail-demo03',
  templateUrl: 'master-detail-demo03.component.html'
})

export class MasterDetailDemoComponent03 implements OnInit,DoCheck{

  @ViewChild('md') masterDetail: MasterDetailComponent03;
  constructor() { }

  ngOnInit() {
  
   }

ngDoCheck(){
this.masterDetail.contentHeight=`${this.contentHeightValue}vh`;
}



  private testdtColumns: Object[] =
  [{ "field": "c1", "header": "c1" },
  { "field": "c2", "header": "c2" },
  { "field": "c3", "header": "c3" }];
  ;



  private inputData: MasterDetail[] = [
    {
      master: 1, detail: [{ c1: 1, c2: 7, c3: 3 },
      { c1: 2, c2: 5, c3: 6 },
      { c1: 3, c2: 8, c3: 9 }]
    },
    {
      master: 2, detail: [{ c1: 1, c2: 22, c3: 33 },
      { c1: 21, c2: 55, c3: 66 },
      { c1: 34, c2: 88, c3: 99 },
      { c1: '61a', c2: '24b', c3: '87c' }]
    }
  ]
  private displayDialog: boolean;          
  private dtdisplayDialog: boolean;      
  private mtchdisplayDialog:boolean;
  private dtchdisplayDialog: boolean;
  private addmt: Mt;
  private adddt: Dt;
  private showMt:boolean=true;
  private mtbtValue='mt隱藏';
  private ctbtValue='ct顯示';
  

  private contentHeightValue=30;
  
//跳出新增mt彈窗
  testmtshowDialogToAdd() {
    this.addmt = new Mt();
    this.displayDialog = true;
  }
//跳出新增dt彈窗
  testdtshowDialogToAdd() {
    if(this.masterDetail.selectedMt!=undefined){
    this.adddt = new Dt();
    this.dtdisplayDialog = true;
  }
  else{
    this.masterDetail.toastr.error('請選擇主檔', 'Oops!');
  }
  }
//mt新增
  mtsave() {
    this.masterDetail.mtsave(this.addmt.value);
    this.displayDialog = false;
  }
//關閉彈窗
  close() {
    this.displayDialog = false;
    this.dtdisplayDialog = false;
    this.mtchdisplayDialog=false;
    this.dtchdisplayDialog = false;
  }
//dt新增
  dtsave() {
    this.masterDetail.dtsave(this.adddt);
    this.dtdisplayDialog = false;
  }
//dt DoubleClick 單選一筆
  DtRowSelect(event) {
    this.adddt = event;
    this.dtchdisplayDialog = true;
  }

// mt DoubleClick 單選一筆
MtRowSelect(event){
  this.addmt=new Mt()
  this.addmt.value=event;
  this.mtchdisplayDialog = true;
}

//mt修改
mtmodify(){
  this.masterDetail.mtmodify(this.addmt.value);
  this.mtchdisplayDialog=false;
}
//dt修改
  dtmodify() {

    this.masterDetail.dtmodify(this.adddt);
    this.dtchdisplayDialog = false;
  }

//mt顯示隱藏
onShowMt(){
if(this.mtbtValue=='mt隱藏')
{
  this.mtbtValue='mt顯示'
}
else{
  this.mtbtValue='mt隱藏'
};

 this.masterDetail.onShowMt();


}


//content顯示隱藏
onShowCt(){

if(this.ctbtValue=='ct顯示')
{
  this.ctbtValue='ct隱藏'
}
else{
  this.ctbtValue='ct顯示'
};
this.masterDetail.onShowCt();
}





}

