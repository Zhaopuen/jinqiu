import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MymodreceiptPage } from './mymodreceipt';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MymodreceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(MymodreceiptPage),
    ComponentsModule
  ],
})
export class MymodreceiptPageModule {}
