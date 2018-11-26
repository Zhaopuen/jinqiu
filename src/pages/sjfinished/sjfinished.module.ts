import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SjfinishedPage } from './sjfinished';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SjfinishedPage,
  ],
  imports: [
    IonicPageModule.forChild(SjfinishedPage),
    ComponentsModule
  ],
})
export class SjfinishedPageModule {}
