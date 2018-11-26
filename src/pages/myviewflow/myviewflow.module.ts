import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyviewflowPage } from './myviewflow';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyviewflowPage,
  ],
  imports: [
    IonicPageModule.forChild(MyviewflowPage),
    ComponentsModule
  ],
})
export class MyviewflowPageModule {}
