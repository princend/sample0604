import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { DialogModule, SliderModule } from 'primeng/primeng';

import { DialogModule,SliderModule } from 'primeng/primeng';
import { MasterDetailModule } from '../master-detail.module';
import { MasterDetailDemoComponent05 } from './master-detail-demo.component05';
import {ToolbarModule} from '@cmuh/components/src/app/search-toolbar/toolbar';
import {SearchToolbarModule} from '@cmuh/components/src/app/search-toolbar';
import { LocationDialogModule } from "@cmuh/components/src/app/location-dialog";
import { DepartmentDialogModule } from "@cmuh/components/src/app/department-dialog";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MasterDetailModule,
        ToolbarModule,
        DialogModule,
        SliderModule,
        LocationDialogModule,
        DepartmentDialogModule,
        SearchToolbarModule
    ],
    exports: [MasterDetailDemoComponent05],
    declarations: [MasterDetailDemoComponent05],
    providers: [],
})
export class  MasterDetailDemoModule { }
