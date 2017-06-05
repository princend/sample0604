import { Component,Input, Output, EventEmitter,OnInit,OnChanges,AfterViewInit,AfterViewChecked,Directive,Renderer,ChangeDetectorRef } from '@angular/core';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {GridColumn} from './models';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit,OnChanges,AfterViewInit,AfterViewChecked {

  /** 
   * Input
   * 
   * @mtWidth         {unmber}           主檔區塊寬度 1-100
   * @mtSelection     {string}           主檔是否多選 multiple=多選 single=單選
   * @mtColumns       {GridColumn[]}     主檔欄位定義
   * @mtDatas         {Object[]}         主檔資料
   * @mtShowDeleteBtn {boolean}          主黨是否顯示刪除欄位
   * @contentDisplay  {boolean}          是否顯示內容區塊true =顯示 ;false不顯示
   * @contentHeight   {unmber}           內容區塊高度  1-100
   * @dtSelection     {string}           明細檔是否多選 multiple=多選 single=單選
   * @dtColumns       {GridColumn[]}     明細檔欄位定義
   * @dtDatas         {Object[]}         明細資料
   * @dtShowDeleteBtn {boolean}          明細檔是否顯示刪除欄位
   * 
   * Output
   * 
   * @mtDatasChange          主檔資料更動事件  mtDatas格式
   * @dtDatasChange          明細資料更動事件  dtDatas格式
   * @mtSelectedevent        主檔選取事件 action:選取Selected 取消:Cancel 全選或全部取消:All
   *                                     selectedRow:  選取或取消的該筆資料  全選或全部取消=null
   *                                     selectedRows: 目前選取的所有資料
   * @dtSelectedevent        明細選取事件 action:選取Selected 取消:Cancel 全選或全部取消:All
   *                                     selectedRow:  選取或取消的該筆資料  全選或全部取消=null
   *                                     selectedRows: 目前選取的所有資料
   * 
   */

  @Input() mtWidth:number=30;                                              
  @Input() mtSelection:string="multiple";
  @Input() mtColumns: GridColumn[]=[];
  @Input() mtDatas: Object[]=[];
  @Input() mtDataKey: string=null;
  @Input() mtShowDeleteBtn:boolean=false;
  @Input() contentDisplay:boolean=false;
  @Input() contentHeight:number=30;
  @Input() dtSelection:string="multiple";
  @Input() dtColumns: GridColumn[]=[];
  @Input() dtDatas:Object[]=[];
  @Input() dtDataKey: string=null;
  @Input() dtShowDeleteBtn:boolean=false;

  @Output() mtDatasChange:EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() dtDatasChange:EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() mtSelectedevent = new EventEmitter();
  @Output() dtSelectedevent = new EventEmitter();
  
  private mtSelected:Object[]=[];
  private dtSelected:Object[]=[];
  private mtDataToRender:Object[];
  private dtDataToRender:Object[];
  private masterWidth:string ="";
  private rightDivWidth:string ="";
  private contentDivHeight:string ="";
  private detailHeight:string ="";

  private mtUpdateDataToRender(datasource) {    

        if(datasource) {
            this.mtDataToRender = [];
            for(let i = 0; i < datasource.length; i++) {            
                this.mtDataToRender.push(datasource[i]);
            }
        }
        else {
            this.mtDataToRender = datasource;
        }
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

  /**主檔事件 */
  public handleMtSelectAll(){//主檔全選、全部取消

    setTimeout(() => this.mtSelectedevent.emit({action:"All",selectedRow:null,selectedRows:this.mtSelected}), 0); 
  }
  public handleMtRowSelected(event){//主檔選單一筆

    setTimeout(() => this.mtSelectedevent.emit({action:"Selected",selectedRow:event.data,selectedRows:this.mtSelected}), 0); 
  }
  public handleMtRowUnselect(event){//主檔取消選單一筆

    setTimeout(() => this.mtSelectedevent.emit({action:"Cancel",selectedRow:event.data,selectedRows:this.mtSelected}), 0); 
  }
  public mtDelete(rowValue){//刪除

    let index: number = this.mtDatas.indexOf(rowValue);
    let indexSelected:number= this.mtSelected.indexOf(rowValue);
    if (index !== -1) {
      this.mtDatas.splice(index, 1);
      if(indexSelected !==-1){
        this.mtSelected.splice(indexSelected, 1);
      }
      setTimeout(() => {
          this.mtDatasChange.emit(this.mtDatas);
          this.mtUpdateDataToRender(this.mtDatas)
      } , 0); 
    }        
  }

  /**明細事件 */
  public handleDtSelectAll(){//明細全選、全部取消

    setTimeout(() => this.dtSelectedevent.emit({action:"All",selectedRow:null,selectedRows:this.dtSelected}), 0); 
  }
  public handleDtRowSelected(event){//明細選單一筆

    setTimeout(() => this.dtSelectedevent.emit({action:"Selected",selectedRow:event.data,selectedRows:this.dtSelected}), 0); 
  }
  public handleDtRowUnselect(event)  {//明細取消選單一筆

    setTimeout(() => this.dtSelectedevent.emit({action:"Cancel",selectedRow:null,selectedRows:this.dtSelected}), 0); 
  }
  public dtDelete(rowValue){//刪除

    let index: number = this.dtDatas.indexOf(rowValue);
    let indexSelected:number= this.dtSelected.indexOf(rowValue);
    if (index !== -1) {
      this.dtDatas.splice(index, 1);
      if(indexSelected !==-1){
        this.dtSelected.splice(indexSelected, 1);
      }
      setTimeout(() => {
          this.dtDatasChange.emit(this.dtDatas);
          this.dtUpdateDataToRender(this.dtDatas)
      } , 0); 
    }        
  }
  constructor() {
    
   }
  ngOnInit() {
      console.log("ngOnInit");
    this.mtUpdateDataToRender(this.mtDatas)
    this.dtUpdateDataToRender(this.dtDatas)
  }
  ngOnChanges(){
    console.log("ngOnChanges");
      this.mtUpdateDataToRender(this.mtDatas)
      this.dtUpdateDataToRender(this.dtDatas)
  }
  ngAfterViewInit()  {
    console.log("ngafterviewinit");

  }
  ngAfterViewChecked(){
      
          //設定寬高
      this.masterWidth =`${this.mtWidth}vw`;
      this.rightDivWidth=`${100-this.mtWidth-5}vw`;
      this.contentDivHeight =`${this.contentHeight}vh`;
      this.detailHeight =`${100-this.contentHeight-5}vh`;
  }
}
