import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {DataListModule,DataTableModule,SharedModule,OrderListModule} from 'primeng/primeng';
import { MasterDetailComponent }   from './master-detail.component';
import { LocationDialogModule } from "@cmuh/components/src/app/location-dialog";

@NgModule({
    imports: [CommonModule,FormsModule,DataListModule,DataTableModule,SharedModule,LocationDialogModule,OrderListModule],
    exports: [MasterDetailComponent],
    declarations: [MasterDetailComponent],
    providers: [],
})
export class MasterDetailModule { }
