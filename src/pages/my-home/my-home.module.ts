import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyHomePage } from './my-home';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MyHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MyHomePage),
    ComponentsModule
  ],
})
export class MyHomePageModule {}
