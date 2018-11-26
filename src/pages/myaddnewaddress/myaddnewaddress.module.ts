import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyaddnewaddressPage } from './myaddnewaddress';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MyaddnewaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(MyaddnewaddressPage),
    ComponentsModule
  ],
})
export class MyaddnewaddressPageModule {}
