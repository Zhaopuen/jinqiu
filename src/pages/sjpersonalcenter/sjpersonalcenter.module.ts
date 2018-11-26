import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SjpersonalcenterPage } from './sjpersonalcenter';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SjpersonalcenterPage,
  ],
  imports: [
    IonicPageModule.forChild(SjpersonalcenterPage),
    ComponentsModule
  ],
})
export class SjpersonalcenterPageModule {}
