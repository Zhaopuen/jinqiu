import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkuserinfoPage } from './workuserinfo';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    WorkuserinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkuserinfoPage),
    ComponentsModule
  ],
})
export class WorkuserinfoPageModule {}
