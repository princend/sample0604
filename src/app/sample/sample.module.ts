import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SampleComponent } from './sample.component';
import { SampleService } from './sample.service';
import { HttpModule } from '@cmuh/http';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: [SampleComponent],
  exports: [SampleComponent],
  providers: [SampleService]
})
export class SampleModule { }
