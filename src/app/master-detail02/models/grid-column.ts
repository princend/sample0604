
/**
 *field             欄位名稱
 *editTable         是否可編輯
 *header             標題
 *editorType        編輯模式   目前有textbox,checkbox
 *width             欄位寬度
 *sortable          是否可排序
 *hidden            是否顯示
 */

export class GridColumn {
  field: string;
  editable: boolean =false;
  header:string ="";
  editorType:string="textbox";
  width:string|number;
  sortable:boolean=false;
  hidden:boolean=false;
}
