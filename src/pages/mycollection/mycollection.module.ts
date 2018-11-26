import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycollectionPage } from './mycollection';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MycollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(MycollectionPage),
    ComponentsModule
  ],
})
export class MycollectionPageModule {}
