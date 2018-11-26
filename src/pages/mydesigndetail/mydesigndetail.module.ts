import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MydesigndetailPage } from './mydesigndetail';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MydesigndetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MydesigndetailPage),
    ComponentsModule
  ],
})
export class MydesigndetailPageModule {}
