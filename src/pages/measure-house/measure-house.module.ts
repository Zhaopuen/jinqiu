import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeasureHousePage } from './measure-house';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MeasureHousePage,
  ],
  imports: [
    IonicPageModule.forChild(MeasureHousePage),
    ComponentsModule
  ],
})
export class MeasureHousePageModule {}
