import { Component, OnInit,AfterViewInit } from '@angular/core';
import {GridColumn} from '../models';
import {DialogModule} from 'primeng/primeng';

@Component({
     selector: 'cmuh-master-detail-demo',
    templateUrl: 'master-detail-demo.component.html'
})

export class MasterDetailDemoComponent implements OnInit,AfterViewInit {
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
    private mtShowDeleteBtn:boolean=true;
    private dtShowDeleteBtn:boolean=true;

    private mtColumns:GridColumn[] = [{  "field": "value","editable": false,"header":"value" ,"editorType":"","width":20,"sortable":false,"hidden":false}
    ]
    private mtDatas:Object[]=[{"value":1},{"value":2},{"value":3},{"value":4},{"value":5},{"value":6},{"value":7},{"value":8},{"value":9},{"value":10},{"value":11},{"value":12},{"value":13},{"value":14},{"value":15},{"value":16},{"value":17},{"value":18},{"value":19},{"value":20}];
    private dtColumns:GridColumn[] = [
      {  "field": "column1","editable": false,"header":"c1" ,"editorType":"","width":20,"sortable":true,"hidden":false},
      {  "field": "column2","editable": false,"header":"c2" ,"editorType":"","width":20,"sortable":false,"hidden":false},
      {  "field": "column3","editable": false,"header":"c3" ,"editorType":"","width":0,"sortable":false,"hidden":true},
      {  "field": "column4","editable": false,"header":"c4" ,"editorType":"","width":20,"sortable":true,"hidden":false},
      {  "field": "column5","editable": false,"header":"c5" ,"editorType":"","width":20,"sortable":false,"hidden":false}
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
    private addMt(){
        let temp  = this.mtDatas;
        temp.push(this.addMaster)
        if(temp) {
            this.mtDatas = [];
            for(let i = 0; i < temp.length; i++) {            
                this.mtDatas.push(temp[i]);
            }
            console.log(this.mtDatas);
        }
        this.displayMt=false;
        this.addMaster=new Master();
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