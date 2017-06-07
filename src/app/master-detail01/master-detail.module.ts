import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {DialogModule, DataListModule, DataTableModule, SharedModule, OrderListModule} from 'primeng/primeng';
import { MasterDetailComponent }   from './master-detail.component';
import { LocationDialogModule } from "@cmuh/components/src/app/location-dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {ToolbarModule} from '@cmuh/components/src/app/search-toolbar/toolbar';
import { ToastModule } from '@cmuh/components/src/app/toast/toast.module';
@NgModule({
    imports: [CommonModule,ToastModule,BrowserAnimationsModule,FormsModule,ToolbarModule,DataListModule,DataTableModule,SharedModule,LocationDialogModule,OrderListModule,DialogModule],
    exports: [MasterDetailComponent],
    declarations: [MasterDetailComponent],
    providers: [],
})
export class MasterDetailModule { }
