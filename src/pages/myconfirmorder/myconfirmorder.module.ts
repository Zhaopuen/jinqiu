import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyconfirmorderPage } from './myconfirmorder';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MyconfirmorderPage,
  ],
  imports: [
    IonicPageModule.forChild(MyconfirmorderPage),
    ComponentsModule
  ],
})
export class MyconfirmorderPageModule {}
