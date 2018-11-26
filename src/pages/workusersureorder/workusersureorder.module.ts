import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkusersureorderPage } from './workusersureorder';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    WorkusersureorderPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkusersureorderPage),
    ComponentsModule
  ],
})
export class WorkusersureorderPageModule {}
