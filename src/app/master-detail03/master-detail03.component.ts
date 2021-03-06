import { concat } from 'rxjs/operator/concat';


import { viewClassName } from '@angular/compiler/compiler';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, AfterViewChecked, Directive, Renderer, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { ToastsManager } from "@cmuh/components/src/app/toast";
import { Dt, Mt, MasterDetail } from "./models";
@Component({
  selector: 'cmuh-master-detail03',
  templateUrl: './master-detail03.component.html',
  styleUrls: ['./master-detail03.component.scss']
})
export class MasterDetailComponent03 implements OnInit {
  constructor(public toastr: ToastsManager, private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  @Input() testdtColumns: Object[] = []; //明細欄位
  @Input() inputData: MasterDetail[] = [];//輸入資料
  @Input() showMt: boolean = true;//主檔顯示隱藏
  @Input() showCt: boolean = false;//內容顯示隱藏
  @Input() contentHeightValue: number = 30;//內容高度值
  @Input() contentHeight: string = "";//內容高度
  @Output() onDtRowSelect = new EventEmitter<any>();//明細修改事件
  @Output() onMtRowSelect = new EventEmitter<any>();//主檔修改事件
  private mtIndex;//主檔選擇項位
  private dtIndex;//明細選擇項位
  private searchValue: string = '';//搜尋條件
  private inputDtdatas: any[] = [];//明細資料
  private masterWidth: string = "";//mt寬度
  private rightDivWidth: string = "";//右分頁寬度

  private addmt;//主檔單筆增加 值
  private adddt; //明細單筆增加 值
  private selectedDt;//明細選擇單筆
  private dtDataToRender: any[];//更新明細table



  //測試區


  selectMt: MasterDetail[];
  selectedMt: MasterDetail;

  ngOnInit() {
    this.masterWidth = `25vw`;
    this.rightDivWidth = `70vw`;
    this.contentHeight = `${this.contentHeightValue}vh`;
  }

  //更新子組件dt dataTable
  private dtUpdateDataToRender(datasource) {
    if (datasource) {
      this.dtDataToRender = [];
      datasource.forEach(element => { this.dtDataToRender.push(element) });
    }
    else {
      this.dtDataToRender = datasource;
    }
  }

  //mt新增
  mtsave(value) {
    let newData: MasterDetail[] = this.inputData.concat({ master: value, detail: [] });
    this.inputData = newData;
    this.toastr.success('新增成功!', 'Success!');
  }

  //mt修改
  mtmodify(addmt) {
    let mtIndex = this.findSelectedMtIndex();
    this.selectedMt.master = addmt;
    this.toastr.success('修改成功!', 'Success!');
  }

  //mt刪除
  mtdelete(rowValue) {
    let index: number = this.inputData.indexOf(rowValue);
    this.inputData = this.inputData.filter((val, i) => i != index);
    this.toastr.warning('刪除成功', 'Success!');
  }

  //dt新增
  dtsave(adddt) {
    let newDetail = this.selectedMt['detail'].concat(adddt);
    this.selectedMt['detail'] = newDetail;
    this.dtUpdateDataToRender(this.selectedMt.detail);
    this.toastr.success('新增成功!', 'Success!');
  }
  //dt修改
  dtmodify(adddt) {
    let mtIndex = this.findSelectedMtIndex();
    let dtIndex = this.findSelectedDtIndex();
    this.selectedMt.detail[dtIndex] = adddt;
    this.dtUpdateDataToRender(this.selectedMt.detail);
    this.toastr.success('修改成功!', 'Success!');
  }

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
  //主檔連點選單一筆
  MtRowSelect(event) {
    this.addmt = event.data.master;
    this.onMtRowSelect.emit(this.addmt);
  }
  //明細連點選單一筆附帶資料
  cloneDt(c) {
    let dt = [];
    for (let index in c) {
      dt[index] = c[index];
    }
    return dt;
  }


  //mt找到項位
  findSelectedMtIndex(): number {
    return this.inputData.indexOf(this.selectedMt);
  }

  //dt找到項位
  findSelectedDtIndex(): number {
    return this.selectedMt.detail.indexOf(this.selectedDt[0]);
  }



  onShowMt() {
    if (this.showMt == true) {
      this.showMt = false
      this.masterWidth = `0vw`;
      this.rightDivWidth = `95vw`;
    }
    else {
      this.showMt = true;
      this.masterWidth = `25vw`;
      this.rightDivWidth = `70vw`;
    }



  }

  onShowCt() {
    if (this.showCt) {
      this.showCt = false;
    }
    else
      this.showCt = true;
  }

  onSearchClick() {
    if (this.searchValue == '') {
      this.toastr.error('搜尋條件不能為空', 'Oops!');
    }
    else {
      for (var x in this.inputData) {
        for (var y in this.inputData[x].detail) {
          this.inputDtdatas.push(this.inputData[x].detail[y])
        }
      }


      //檢查每一個c1裡面的字元有無符合
      //最多搜尋七個字元
      this.inputDtdatas = this.inputDtdatas.filter(value => {
        let c1Value;
        c1Value = String(value.c1);
        let temp = [...c1Value]; //slice c1Value
        let searchResult = [];
        for (var i in temp) {
          let j = +i;
          let char = [];
          char[0] = temp[i] + temp[j + 1];
          for (var z = 0; z <= 5; z++) {
            char[z + 1] = char[z] + temp[j + 2 + z];
          }
          let sV = this.searchValue;
          if (temp[i] == sV ||
            char[0] == sV ||
            char[1] == sV ||
            char[2] == sV ||
            char[3] == sV ||
            char[4] == sV ||
            char[5] == sV) {
            return searchResult;
          }
        }
      });



      /*
            //檢查每一個c1裡面的字元有無符合
            //最多搜尋七個字元
            this.inputDtdatas = this.inputDtdatas.filter(value => {
              let c1Value;
              c1Value = String(value.c1);
              let temp = [...c1Value]; //slice c1Value
              let searchResult = [];
              for (var i in temp) {
                let j = +i;
                let char2 = temp[i] + temp[j + 1];
                let char3 = char2 + temp[j + 2];
                let char4 = char3 + temp[j + 3];
                let char5 = char4 + temp[j + 4];
                let char6 = char5 + temp[j + 5];
                let char7 = char6 + temp[j + 6];
                let sV = this.searchValue;
                if (temp[i] == sV ||
                  char2 == sV ||
                  char3 == sV ||
                  char4 == sV ||
                  char5 == sV ||
                  char6 == sV ||
                  char7 == sV) {
                  return searchResult;
                }
              }
            });*/

      //c1完全符合
      // this.inputDtdatas = this.inputDtdatas.filter(value => { return value.c1 == this.searchValue });


      this.toastr.info(`搜尋條件為: ${this.searchValue}`, '  ');
      this.dtUpdateDataToRender(this.inputDtdatas);
      this.inputDtdatas = [];
      this.searchValue = '';

    }
  }

}

