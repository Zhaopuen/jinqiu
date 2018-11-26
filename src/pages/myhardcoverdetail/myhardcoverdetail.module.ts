import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyhardcoverdetailPage } from './myhardcoverdetail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyhardcoverdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyhardcoverdetailPage),
    ComponentsModule
  ],
})
export class MyhardcoverdetailPageModule {}
