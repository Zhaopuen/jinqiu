import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkuserwaitorderPage } from './workuserwaitorder';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    WorkuserwaitorderPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkuserwaitorderPage),
    ComponentsModule
  ],
})
export class WorkuserwaitorderPageModule {}
