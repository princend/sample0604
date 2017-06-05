import { Value } from './value';
import { viewClassName } from '@angular/compiler/compiler';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, AfterViewChecked, Directive, Renderer, ChangeDetectorRef } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { GridColumn } from './models';
@Component({
  selector: 'cmuh-master-detail',
  templateUrl: './master-detail1.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit, OnChanges {
  constructor() {
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
   { "c1":3, "c2": 8, "c3": 9 }]
  @Input() testdtDatas2: Object[] =
   [{ "c1": 1, "c2": 22, "c3": 33 },
  { "c1": 2, "c2": 55, "c3": 66 }, 
  { "c1":3, "c2": 88, "c3": 99 }]
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

  @Output() mtDatasChange: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() dtDatasChange: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() mtSelectedevent = new EventEmitter();
  @Output() dtSelectedevent = new EventEmitter();

  private mtSelected: Object[] = [];
  private dtSelected: Object[] = [];
  private mtDataToRender: Object[];
  private dtDataToRender: Object[];
  private masterWidth: string = "";
  private rightDivWidth: string = "";
  private contentDivHeight: string = "";
  private detailHeight: string = "";


  displayDialog: boolean;

  value: PrimeValue = new PrimeValue();

  selectedValue: PrimeValue;

  newValue: boolean;

    private mtSelectedRow: Object = {};
  private mtSelectedRows: Object[] = [];

  newdt: boolean;
  adddt:PrimeDt = new PrimeDt();
  dtdisplayDialog: boolean;
  warningDisplayDialog:boolean;
  dtchdisplayDialog:boolean;

  dtIndex;
  testshowDialogToAdd() {
    this.newValue = true;
    this.value = new PrimeValue();
    this.displayDialog = true;
  }
    testdtshowDialogToAdd() {
    this.newdt = true;
    this.adddt = new PrimeDt();
    this.dtdisplayDialog = true;
  }

showDialogToWarning(rowValue){
  this.warningDisplayDialog=true;
  this.mtdelete(rowValue);
}

//master新刪
  mtsave() {
        let temp  = this.testmtDatas;
        temp.push(this.value)
        if(temp) {
            this.testmtDatas = [];
            for(let i = 0; i < temp.length; i++) {            
                this.testmtDatas.push(temp[i]);
            }
        }
    this.displayDialog = false;
  }
  mtdelete(rowValue) {
let index: number = this.testmtDatas.indexOf(rowValue);
   this.testmtDatas = this.testmtDatas.filter((val,i) => i!=index);
          this.value=null;
   
  }

//關閉彈窗
close(){
   this.displayDialog = false;
   this.dtdisplayDialog = false;
   this.warningDisplayDialog=false;
   this.dtchdisplayDialog=false;
}









  findSelectedValueIndex(): number {
    return this.testmtDatas.indexOf(this.selectedValue);
  }
  selecteddt = new PrimeDt();

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
//dtdatablechange
  public dtchange(eventdatavalue) {
    if (eventdatavalue == 1) {
      this.testdtDatas0 = this.testdtDatas1;
    }
    if (eventdatavalue == 2) {
      this.testdtDatas0 = this.testdtDatas2;
    }
  };

  findSelectedDtIndex(): number {
       console.log(this.testdtDatas0);
    return this.testdtDatas0.indexOf(this.selecteddt);
 
  }

 /*   dtsave() {
        let testdtDatas0 = [...this.testdtDatas0];
        if (this.newdt) {
          testdtDatas0.push(this.testdtDatas0);
        }
            else
          testdtDatas0[this.findSelectedDtIndex()] = this.dt;
        this.testdtDatas0 = testdtDatas0;
        this.dt = null;
    this.dtdisplayDialog = false;
  }*/

  dtsave() {
        let temp  = [...this.testdtDatas0];
        //console.log(this.testdtDatas1);
        temp.push(this.adddt)
        console.log(this.adddt.c1);
        if(temp) {
            this.testdtDatas0 = [];
            for(let i = 0; i < temp.length; i++) {            
                this.testdtDatas0.push(temp[i]);
            }
        }
    this.adddt=new PrimeDt();
    this.dtdisplayDialog = false;
  }
  
  dtmodify(){
 
        if(this.adddt) {
            this.testdtDatas0[this.dtIndex-1] = this.adddt;
        }
    this.adddt=new PrimeDt();
     this.dtchdisplayDialog = false;
  }

  
/*  dtmodify(){
       let temp  = [...this.testdtDatas0];
        temp.push(this.adddt)
        if(temp) {
            this.testdtDatas0 = [];
            for(let i = 0; i < temp.length; i++) {            
                this.testdtDatas0.push(temp[i]);
            }
        }
    this.adddt=new PrimeDt();
     this.dtchdisplayDialog = false;
  }*/


/*      save() {
        let cars = [...this.cars];
        if(this.newCar)
            cars.push(this.car);
        else
            cars[this.findSelectedCarIndex()] = this.car;
        
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }*/


    dtdelete(rowValue) {
let index: number = this.testdtDatas0.indexOf(rowValue);
   this.testdtDatas0 = this.testdtDatas0.filter((val,i) => i!=index);
          this.value=null;
    this.dtdisplayDialog = false;
  }


/*    save() {
        let cars = [...this.cars];
        if(this.newCar)
            cars.push(this.car);
        else
            cars[this.findSelectedCarIndex()] = this.car;
        
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }
*/

//明細選單一筆
  onRowSelect(event) {
    console.log(event.data.c1);
    this.dtIndex=event.data.c1;
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

  indexValue;

  public handleMtRowSelected(event) {//主檔選單一筆
    //console.log(event.data.value);

    this.dtchange(event.data.value);
    this.indexValue=event.data.value;
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
