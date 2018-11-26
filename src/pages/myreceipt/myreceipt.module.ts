import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyreceiptPage } from './myreceipt';
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [
    MyreceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(MyreceiptPage),
    ComponentsModule
  ],
})
export class MyreceiptPageModule {}
