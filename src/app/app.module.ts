import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { BannerService } from '@cmuh/core';
import { AppComponent } from './app.component';
;
import { MasterDetailDemoModule } from "./master-detail05/demo";
import { MasterDetailDemoComponent05 } from "./master-detail05/demo";
import { MasterDetailModule } from "./master-detail05";
import { MasterDetailModule04 } from "./master-detail04";
import { AppRoutingModule } from './app-routing.module';
import { MasterDetailDemoComponent04 } from "./master-detail04/demo";
import {ToolbarModule} from '@cmuh/components/src/app/search-toolbar/toolbar';
import {SearchToolbarModule} from '@cmuh/components/src/app/search-toolbar';
import { LocationDialogModule } from "@cmuh/components/src/app/location-dialog";
import { DepartmentDialogModule } from "@cmuh/components/src/app/department-dialog";
import { DialogModule ,DataListModule, DataTableModule, SharedModule, OrderListModule} from "primeng/primeng";
import { MasterDetailModule03 } from "./master-detail03";
import { MasterDetailDemoComponent03 } from "./master-detail03/demo";
@NgModule({
  declarations: [
    AppComponent,
    MasterDetailDemoComponent05,
MasterDetailDemoComponent04,
MasterDetailDemoComponent03
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MasterDetailModule,
    MasterDetailModule04,
    MasterDetailModule03,
    AppRoutingModule,
    ToolbarModule,
    SearchToolbarModule,
    DialogModule,
     DataListModule, DataTableModule, SharedModule, OrderListModule
  ],
  providers: [BannerService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
