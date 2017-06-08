

import { viewClassName } from '@angular/compiler/compiler';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, AfterViewChecked, Directive, Renderer, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { ToastsManager } from "@cmuh/components/src/app/toast";
import { Dt, Mt ,MasterDetail} from "./models";
@Component({
  selector: 'cmuh-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit {
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
  @Input() testdtColumns: Object[] =   [{ field: "c1", header: "c1" },
  { field: "c2", header: "c2" },
  { field: "c3", header: "c3" }];
  ;;
  @Input() mtSelection: string = "multiple";
  @Input() mtIndexValue;
  @Input() contentDisplay: boolean = false;
  @Input() contentHeight: number = 30;
  @Output() onMtRowSelect = new EventEmitter<any>()
  @Output() onDtRowSelect = new EventEmitter<any>();
  private masterWidth: string = "";
  private rightDivWidth: string = "";
  private contentDivHeight: string = "";

  private testdtDatas3 = [];
  value: Mt = new Mt();

  adddt: Dt = new Dt();
  selectedDt: Dt;
  dtDatas;



//測試區

@Input() inputData :MasterDetail[]=[

] 

selectMt:MasterDetail[];
selectedMt;
//測試區結束

  //mt新增
  mtsave(value) {
    let newData:MasterDetail[] = this.inputData.concat({master: value,detail:[]});
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
    return this.testmtDatas.indexOf(this.selectedMt[0]);
  }
  //dt找到項位
  findSelectedDtIndex(): number {
    return this.testdtDatas.indexOf(this.selectedDt[0]);
  }
  //dt新增

  //好的
  dtsave(adddt) {
    let newDetail = this.selectedMt['detail'].concat(adddt);
    this.selectedMt['detail'] = [];
     this.selectedMt['detail'] = newDetail;
    this.toastr.success('新增成功!', 'Success!');
  }





/*  dtsave(adddt) {
    let temp = [...this.testdtDatas];
    temp.push(adddt);
    this.testdtDatas = temp;
    this.adddt = new Dt();
    if (this.mtIndexValue == this.testmtDatas[0].value) {
      this.testdtDatas1 = temp;
    }
    else if (this.mtIndexValue == this.testmtDatas[0].value) {
      this.testdtDatas2 = temp;
    }
    this.toastr.success('新增成功!', 'Success!');
  }*/




  //dt修改
  dtmodify(dt) {
    let temp = [...this.testdtDatas];
    temp[this.findSelectedDtIndex()] = dt;
    this.testdtDatas = temp;
    dt = new Dt();
    this.dtremain();
    this.toastr.success('修改成功!', 'Success!');
    return this.testdtDatas;
  }

  //dtdatablechange

  //方法一

  /*  public async dtchange() {
      this.multidtDatas=[this.testdtDatas1,this.testdtDatas2,...this.dtDatas]
      for (var i in this.testmtDatas){
        let index=+i;
        if (this.findSelectedMtIndex()==index){
          this.testdtDatas=this.multidtDatas[index];
        }
      }
    }*/


  //方法二 good
/*  public async dtchange() {

    console.log(this.multidtDatas[0]);
    if (this.mtIndexValue == this.testmtDatas[0].value) {
      this.testdtDatas = this.testdtDatas1;
    }
    else if (this.mtIndexValue == this.testmtDatas[1].value) {
      this.testdtDatas = this.testdtDatas2;
    }
    else {
      this.testdtDatas = [];
    }
  };*/


  //dt刪除
  dtdelete(rowValue) {
this.selectedMt['detail'] = this.selectedMt['detail'].filter(value => { return value != rowValue});
    this.toastr.warning('刪除成功', 'Success!');
  }

/*  mtdelete(rowValue) {
    let index: number = this.inputData.indexOf(rowValue);
    this.inputData = this.inputData.filter((val, i) => i != index);
    this.toastr.warning('刪除成功', 'Success!');
  }
*/


  //保留dt
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



  //主檔選單一筆
  public mtRowSelected(event) {
/*    this.mtIndexValue = event.data.value;
    this.onMtRowSelect.emit(event);*/
    this.selectedMt=this.selectMt[0];
    //console.log(this.selectItem.detail);
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



