import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SysmsgPage } from './sysmsg';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    SysmsgPage,
  ],
  imports: [
    IonicPageModule.forChild(SysmsgPage),
    ComponentsModule
  ],
})
export class SysmsgPageModule {}
