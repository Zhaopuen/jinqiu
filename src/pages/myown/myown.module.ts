import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyownPage } from './myown';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyownPage,
  ],
  imports: [
    IonicPageModule.forChild(MyownPage),
    ComponentsModule
  ],
})
export class MyownPageModule {}
