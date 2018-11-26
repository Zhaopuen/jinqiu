import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkfinshedPage } from './workfinshed';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WorkfinshedPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkfinshedPage),
    ComponentsModule
  ],
})
export class WorkfinshedPageModule {}
