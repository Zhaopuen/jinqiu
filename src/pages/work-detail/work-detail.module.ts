import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkDetailPage } from './work-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WorkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkDetailPage),
    ComponentsModule
  ],
})
export class WorkDetailPageModule {}
