import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BannerService } from '@cmuh/core';

import { SampleModule } from './sample/sample.module';
import { AppComponent } from './app.component';
import { MasterDetailComponent } from './master-detail/master-detail.component';
import { MasterDetailDemoModule } from "./master-detail01/demo";

@NgModule({
  declarations: [
    AppComponent,
    MasterDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SampleModule,
    MasterDetailDemoModule
  ],
  providers: [BannerService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  @ViewChild('md') masterDetail: MasterDetailComponent;
  addmt(){
    //do something
    // this.masterDetail
  }
}
 