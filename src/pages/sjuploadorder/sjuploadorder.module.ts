import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SjuploadorderPage } from './sjuploadorder';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SjuploadorderPage,
  ],
  imports: [
    IonicPageModule.forChild(SjuploadorderPage),
    ComponentsModule
  ],
})
export class SjuploadorderPageModule {}
