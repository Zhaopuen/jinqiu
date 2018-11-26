import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkuserpasswordPage } from './workuserpassword';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    WorkuserpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkuserpasswordPage),
    ComponentsModule
  ],
})
export class WorkuserpasswordPageModule {}
