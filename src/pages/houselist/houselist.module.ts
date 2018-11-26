import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouselistPage } from './houselist';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    HouselistPage,
  ],
  imports: [
    IonicPageModule.forChild(HouselistPage),
    ComponentsModule
  ],
})
export class HouselistPageModule {}
