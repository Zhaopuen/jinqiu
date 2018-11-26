import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyevaluatePage } from './myevaluate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyevaluatePage,
  ],
  imports: [
    IonicPageModule.forChild(MyevaluatePage),
    ComponentsModule
  ],
})
export class MyevaluatePageModule {}
