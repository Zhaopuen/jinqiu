import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkziliaoPage } from './workziliao';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    WorkziliaoPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkziliaoPage),
    ComponentsModule
  ],
})
export class WorkziliaoPageModule {}
