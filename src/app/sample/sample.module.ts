import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleComponent } from './sample.component';

import { ItemBoxComponent } from '@cmuh/components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SampleComponent,
    ItemBoxComponent
  ],
  exports: [
    SampleComponent
  ]
})
export class SampleModule { }
