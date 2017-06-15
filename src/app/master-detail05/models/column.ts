export class Column {
    field: string | Object;
    header: string = "";
    editable?: boolean = false;
    sortable?: boolean = false;
    hidden?: boolean = false;
    frozen?: boolean = false;
    editorType?: string = "textbox";
    width?: string;
}