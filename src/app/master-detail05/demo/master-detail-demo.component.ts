

import { AfterViewInit, Component, OnChanges, OnInit, ViewChild, DoCheck } from '@angular/core';
import { Dt, Mt, MasterDetail, Column } from '../models';
import { MasterDetailComponent } from "../master-detail.component";

@Component({
  selector: 'cmuh-master-detail-demo',
  templateUrl: 'master-detail-demo.component.html',
  styleUrls: ['./master-detail-demo.component.scss']
})

export class MasterDetailDemoComponent implements OnInit {

  @ViewChild('md') masterDetail: MasterDetailComponent;
  constructor() { }

  ngOnInit() {

  }


  private isShowDeleteButton: boolean = true;
  private selectedData;
  private dtSelectionMode = 'single';
 private mtSelectionMode="single";
 private isShowMtSelectCheckbox=true;
 private isShowMtDeleteButton=true;
  private dtcolumns: Column[] =
  [{ "field": "column1", "editable": false, "header": "c1", "editorType": "", "width": "10%", "sortable": true, "hidden": false, "frozen": false },
  { "field": "column2", "editable": false, "header": "c2", "editorType": "", "width": "10%", "sortable": false, "hidden": false, "frozen": false},
  { "field": "column3", "editable": false, "header": "c3", "editorType": "", "width": "10%", "sortable": false, "hidden": false }];
  ;


  private dtColumns2: Object[] =
  [{ "field": "c1", "header": "c1" },
  { "field": "c2", "header": "c2" },
  { "field": "c3", "header": "c3" }];
  ;


  private dtinputData1 = [{ column1: 1, column2: 7, column3: 3 },
 { column1: 123, column2: 127, column3: 3234 },
  { column1: 15334543, column2: 12567, column3: 35425 },
  { column1: 1534773, column2: 56457, column3: 3525 },
  { column1: 12315343, column2: 56237, column3: 35412325 },
  { column1: 1536643, column2: 51267, column3: 355 }]


  private dtinputData2 = [{ column1: "aaaaaa", column2: "bbbbbb", column3: "tehe" },
 { column1: "cv", column2: "sick", column3: 3234 },
  { column1:"bran", column2: "ttit", column3: 35425 },
  { column1: "kit", column2: 56457, column3: "cry"}
]


  private dtinputData3 = [{ column1: "123aaa", column2: "bbsdabb", column3: "tqweehe" },
 { column1: "qwedfasdf", column2: "12wqedfs", column3: 3234 },
  { column1: "f", column2: 12567, column3: 35425 },
  { column1: "1534773", column2: "qwedas", column3: 3525 },
  { column1: "w", column2: 56237, column3: "689" }]



  private mtColumn: object[] =
  [{ "field": "c1", "header": "c1" }];

  private mtInputData = [
    { c1: "master1" },
    { c1: "master2" },
    { c1: "master3" }
  ]


mtRowClick(event){
  if(event.c1==this.mtInputData[0].c1){
    this.masterDetail.dtUpdateDataToRender(this.dtinputData1);
  }
  else if(event.c1==this.mtInputData[1].c1)
  { this.masterDetail.dtUpdateDataToRender(this.dtinputData2);}
  else if (event.c1==this.mtInputData[2].c1)
  { this.masterDetail.dtUpdateDataToRender(this.dtinputData3);}
  console.log(event);
}

}

