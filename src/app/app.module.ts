import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { BannerService } from '@cmuh/core';
import { AppComponent } from './app.component';
import { MasterDetailDemoModule } from "./master-detail03/demo";

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MasterDetailDemoModule
  ],
  providers: [BannerService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
 