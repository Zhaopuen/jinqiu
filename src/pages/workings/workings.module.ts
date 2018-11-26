import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkingsPage } from './workings';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WorkingsPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkingsPage),
    ComponentsModule
  ],
})
export class WorkingsPageModule {}
