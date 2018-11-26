import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SjinformationPage } from './sjinformation';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SjinformationPage,
  ],
  imports: [
    IonicPageModule.forChild(SjinformationPage),
    ComponentsModule
  ],
})
export class SjinformationPageModule {}
