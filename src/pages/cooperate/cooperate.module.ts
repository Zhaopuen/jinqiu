import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CooperatePage } from './cooperate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CooperatePage,
  ],
  imports: [
    IonicPageModule.forChild(CooperatePage),
    ComponentsModule
  ],
})
export class CooperatePageModule {}
