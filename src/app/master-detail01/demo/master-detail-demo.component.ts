import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Dt,Mt} from '../models';
import { MasterDetailComponent } from "../master-detail.component";
@Component({
     selector: 'cmuh-master-detail-demo',
    templateUrl: 'master-detail-demo.component.html'
})

export class MasterDetailDemoComponent implements OnInit {


    @ViewChild('md') masterDetail: MasterDetailComponent;
    constructor() { }


        ngOnInit() { }

    private contentDisplay:boolean=true;


//移植到demo



  displayDialog: boolean;
  dtdisplayDialog: boolean;
  warningDisplayDialog: boolean;
  dtchdisplayDialog: boolean;
  addmt: Mt = new Mt();
  adddt:Dt=new Dt();
  private mtIndexValue;
private testdtColumns: Object[] =
  [{ "field": "c1", "header": "c1" },
  { "field": "c2", "header": "c2" },
  { "field": "c3", "header": "c3" }];
  ;
  private testmtDatas: Mt[] = [
    { "value": 1 },
    { "value": 2 }
  ];

private testdtDatas: Object[] = [];

 private  testdtDatas1: Dt[] =
  [{ "c1": 1, "c2": 7, "c3": 3 },
  { "c1": 2, "c2": 5, "c3": 6 },
  { "c1": 3, "c2": 8, "c3": 9 }];

 private  testdtDatas2: Dt[] =
  [{ "c1": 1, "c2": 22, "c3": 33 },
  { "c1": 21, "c2": 55, "c3": 66 },
  { "c1": 34, "c2": 88, "c3": 99 }]

  testmtshowDialogToAdd() {
    this.addmt = new Mt();
    this.displayDialog = true;
  }

  testdtshowDialogToAdd(){
    this.adddt = new Dt();
    this.dtdisplayDialog = true;
  
  }

mtsave(){
    this.masterDetail.mtsave(this.addmt);
    this.displayDialog=false;
}

close(){
 this.displayDialog=false;
  this.dtdisplayDialog=false;
  this.warningDisplayDialog=false;
  this.dtchdisplayDialog=false;
}



dtsave(){
     this.masterDetail.dtsave(this.adddt);
    this.dtdisplayDialog=false;
}


//mt單選一筆交換明細
  public MtRowSelect(event) {
    this.masterDetail.dtchange();
  }


DtRowSelect(event){
    this.dtchdisplayDialog=true;
     this.adddt = event;
}



dtmodify(){
    this.masterDetail.dtmodify(this.adddt);
     this.dtchdisplayDialog=false;
}



//結束


}


