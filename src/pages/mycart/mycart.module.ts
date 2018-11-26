import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycartPage } from './mycart';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MycartPage,
  ],
  imports: [
    IonicPageModule.forChild(MycartPage),
    ComponentsModule
  ],
})
export class MycartPageModule {}
