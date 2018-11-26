import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SjsuerorderPage } from './sjsuerorder';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SjsuerorderPage,
  ],
  imports: [
    IonicPageModule.forChild(SjsuerorderPage),
    ComponentsModule
  ],
})
export class SjsuerorderPageModule {}
