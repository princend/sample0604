import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterDetailDemoComponent05 }   from './master-detail05/demo';
import { MasterDetailDemoComponent04 } from "./master-detail04/demo";
import { MasterDetailDemoComponent03 } from "./master-detail03/demo";
const routes: Routes = [
  { path: '', redirectTo: '/mt5', pathMatch: 'full' },
  { path: 'mt5',  component: MasterDetailDemoComponent05 },
 { path: 'mt4',  component: MasterDetailDemoComponent04 },
 { path: 'mt3',  component: MasterDetailDemoComponent03 }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}