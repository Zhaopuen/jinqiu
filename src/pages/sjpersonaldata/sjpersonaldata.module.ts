import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SjpersonaldataPage } from './sjpersonaldata';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SjpersonaldataPage,
  ],
  imports: [
    IonicPageModule.forChild(SjpersonaldataPage),
    ComponentsModule
  ],
})
export class SjpersonaldataPageModule {}
