import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { DialogModule, SliderModule } from 'primeng/primeng';

import { DialogModule,SliderModule } from 'primeng/primeng';
import { MasterDetailModule04 } from '../master-detail04.module';
import { MasterDetailDemoComponent04 } from './master-detail-demo04.component';
import {ToolbarModule} from '@cmuh/components/src/app/search-toolbar/toolbar';
import {SearchToolbarModule} from '@cmuh/components/src/app/search-toolbar';
import { LocationDialogModule } from "@cmuh/components/src/app/location-dialog";
import { DepartmentDialogModule } from "@cmuh/components/src/app/department-dialog";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MasterDetailModule04,
        ToolbarModule,
        DialogModule,
        SliderModule,
        LocationDialogModule,
        DepartmentDialogModule,
        SearchToolbarModule
    ],
    exports: [MasterDetailDemoComponent04],
    declarations: [MasterDetailDemoComponent04],
    providers: [],
})
export class  MasterDetailDemoModule { }
