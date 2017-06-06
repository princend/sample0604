import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {GridColumn} from '../models';
import {DialogModule} from 'primeng/primeng';
import { MasterDetailComponent } from "../master-detail1.component";
@Component({
     selector: 'cmuh-master-detail-demo',
    templateUrl: 'master-detail-demo.component.html'
})

export class MasterDetailDemoComponent implements OnInit,AfterViewInit {


    @ViewChild('md') masterDetail: MasterDetailComponent;
    constructor() { }


        ngOnInit() { }
    private onSearch(searchString: string) {
        /* do something... */
        console.log(searchString);
        alert(`送出查詢${searchString}`);
    }

    ngAfterViewInit(){
        console.log("parent ngAfterViewInit");
        
    }
    private displayMt = false;
    private displayDt = false;
    private addMaster = new Master();
    private addDetail = new Detail();
    private mtSelectedRows:Object[]=[];
    private dtSelectedRows:Object[]=[];

    private mtSelectedRow:Object={};  
    private mtWidth:number=25;
    private dtWidh:number=25;
    private contentHeight:number=20;
    private mtSelection:string="multiple";
    private dtSelection:string="multiple";
    private contentDisplay:boolean=true;
    private dtShowDeleteBtn:boolean=true;

    private mtColumns:GridColumn[] = [{  "field": "value","editable": false,"header":"value" ,"editorType":"","width":20,"sortable":false,"hidden":false}
    ]
    private dtDatas:Object[]=[];
    private dtDatas1:Object[]=[
      {"column1":"c1r1","column2":"c2r1","column3":"c3r1","column4":"c4r1","column5":true},
      {"column1":"c1r2","column2":"c2r2","column3":"c3r2","column4":"c4r2","column5":false},
      {"column1":"c1r3","column2":"c2r3","column3":"c3r3","column4":"c4r3","column5":true},
      {"column1":"c1r4","column2":"c2r4","column3":"c3r4","column4":"c4r4","column5":false}
    ];
    private dtDatas2:Object[]=[
      {"column1":"@@@c1r1","column2":"@@@c2r1","column3":"@@@c3r1","column4":"@@@c4r1","column5":false},
      {"column1":"@@@c1r2","column2":"@@@c2r2","column3":"@@@c3r2","column4":"@@@c4r2","column5":true},
      {"column1":"@@@c1r3","column2":"@@@c2r3","column3":"@@@c3r3","column4":"@@@c4r3","column5":false},
      {"column1":"@@@c1r4","column2":"@@@c2r4","column3":"@@@c3r4","column4":"@@@c4r4","column5":true}
    ];


//移植到demo
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

  private testdtDatas1: Object[] =
  [{ "c1": 1, "c2": 7, "c3": 3 },
  { "c1": 2, "c2": 5, "c3": 6 },
  { "c1": 3, "c2": 8, "c3": 9 }];


  private testdtDatas2: Object[] =
  [{ "c1": 1, "c2": 22, "c3": 33 },
  { "c1": 21, "c2": 55, "c3": 66 },
  { "c1": 34, "c2": 88, "c3": 99 }]

    private SelectMt(event) {
        console.log(event);
        if(event.action=="Selected"){
            //這邊因為是示範資料，實際上應該以選取的主檔為參數，從service帶出明細資料
            this.mtSelectedRow= event.selectedRow;
        this.dtDatas= event.selectedRow.value==1?this.dtDatas1:event.selectedRow.value==2?this.dtDatas2:[];
        }
        this.mtSelectedRows =event.selectedRows;
        
    }
    private SelectDt(event) {
        console.log(event);
        this.dtSelectedRows =event.selectedRows;
    }
    private dtDatasChange(event){   
        console.log(event);
    }

    private addDt(){
        if(this.mtSelectedRow=={})
        {
            return;
        }
        else{
            let temp = this.dtDatas;
            temp.push(this.addDetail)
            if(temp) {
                this.dtDatas = [];
                for(let i = 0; i < temp.length; i++) {            
                    this.dtDatas.push(temp[i]);
                }
            }
        }
        this.displayDt=false;
        this.addDetail=new Detail();
    }
    private showMtAdd() {
        this.displayMt = true;
    }
    private showDtAdd() {
        this.displayDt = true;
    }


}
class Master  {
    constructor(public text?, public value?) {}
}
class Detail {
     constructor(public column1?, public column2?,column3?,column4?,column5?:boolean) {}
}


export class Mt {
  public value;
  constructor() { }
}