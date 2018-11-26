import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkuserPage } from './workuser';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    WorkuserPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkuserPage),
    ComponentsModule
  ],
})
export class WorkuserPageModule {}
