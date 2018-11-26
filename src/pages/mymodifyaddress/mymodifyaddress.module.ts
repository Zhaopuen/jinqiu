import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MymodifyaddressPage } from './mymodifyaddress';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MymodifyaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(MymodifyaddressPage),
    ComponentsModule
  ],
})
export class MymodifyaddressPageModule {}
