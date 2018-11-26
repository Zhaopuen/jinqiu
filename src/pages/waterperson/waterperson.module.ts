import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaterpersonPage } from './waterperson';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    WaterpersonPage,
  ],
  imports: [
    IonicPageModule.forChild(WaterpersonPage),
    ComponentsModule
  ],
})
export class WaterpersonPageModule {}
