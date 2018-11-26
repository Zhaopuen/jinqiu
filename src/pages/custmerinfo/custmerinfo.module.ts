import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustmerinfoPage } from './custmerinfo';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CustmerinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CustmerinfoPage),
    ComponentsModule
  ],
})
export class CustmerinfoPageModule {}
