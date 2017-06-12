import { AfterViewInit, Component, OnChanges, OnInit, ViewChild,DoCheck } from '@angular/core';
import { Dt, Mt, MasterDetail } from '../models';
import { MasterDetailComponent } from "../master-detail.component";

@Component({
  selector: 'cmuh-master-detail-demo',
  templateUrl: 'master-detail-demo.component.html'
})

export class MasterDetailDemoComponent implements OnInit,DoCheck{

  @ViewChild('md') masterDetail: MasterDetailComponent;
  constructor() { }

  ngOnInit() {
  
   }

ngDoCheck(){
this.masterDetail.contentHeight=`${this.contentHeightValue}vh`;
}
  private contentDisplay: boolean = true;


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
      { c1: 34, c2: 88, c3: 99 }]
    }
  ]
  private displayDialog: boolean;          
  private dtdisplayDialog: boolean;      
  private warningDisplayDialog: boolean;
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
    this.adddt = new Dt();
    this.dtdisplayDialog = true;

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
    this.warningDisplayDialog = false;
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
//dt修改
  dtmodify() {
    this.masterDetail.dtmodify(this.adddt);
    this.dtchdisplayDialog = false;
  }


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

