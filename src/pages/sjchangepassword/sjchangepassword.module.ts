import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SjchangepasswordPage } from './sjchangepassword';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SjchangepasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(SjchangepasswordPage),
    ComponentsModule
  ],
})
export class SjchangepasswordPageModule {}
