import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { DialogModule, SliderModule } from 'primeng/primeng';

import { DialogModule,SliderModule } from 'primeng/primeng';
import { MasterDetailModule03 } from '../master-detail03.module';
import { MasterDetailDemoComponent03 } from './master-detail-demo03.component';
import {ToolbarModule} from '@cmuh/components/src/app/search-toolbar/toolbar';
import {SearchToolbarModule} from '@cmuh/components/src/app/search-toolbar';
import { LocationDialogModule } from "@cmuh/components/src/app/location-dialog";
import { DepartmentDialogModule } from "@cmuh/components/src/app/department-dialog";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MasterDetailModule03,
        ToolbarModule,
        DialogModule,
        SliderModule,
        LocationDialogModule,
        DepartmentDialogModule,
        SearchToolbarModule
    ],
    exports: [MasterDetailDemoComponent03],
    declarations: [MasterDetailDemoComponent03],
    providers: [],
})
export class  MasterDetailDemoModule03 { }
