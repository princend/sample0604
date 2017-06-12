# CMUH component for Angular 2: carousel-table

一個主檔、明細檔，有階層的資料顯示元件。
使用PrimeNG的DataTable  改寫



#參數說明
    mtWidth                    主檔區塊寬度 1-100預
    mtSelection                主檔是否可多選 multiple=多選 single=單選
    mtColumns                  主檔欄位定義
    mtDatas                    主檔資料
    mtShowDeleteBtn            主黨是否顯示刪除欄位
    contentDisplay             是否顯示內容區塊true =顯示 ;false不顯示
    contentHeight              內容區塊高度  1-100
    dtSelection                明細檔是否可多選 multiple=多選 single=單選
    dtColumns                  明細檔欄位定義
    dtDatas                    明細資料
    dtShowDeleteBtn            主黨是否顯示刪除欄位

#參數預設值

    mtWidth:30                                          
    mtSelection:"multiple"
    mtColumns:[];
    mtDatas:[];
    mtDataKey:;
    mtShowDeleteBtn:false;
    contentDisplay:false;
    contentHeight:30;
    dtSelection:"multiple";
    dtColumns: GridColumn[];
    dtDatas:=[];
    dtDataKey:null;
    dtShowDeleteBtn:false;
