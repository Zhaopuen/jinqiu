import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HardcoverPage } from './hardcover';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HardcoverPage,
  ],
  imports: [
    IonicPageModule.forChild(HardcoverPage),
    ComponentsModule
  ],
})
export class HardcoverPageModule {}
