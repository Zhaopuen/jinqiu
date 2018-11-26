import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegPage } from './reg';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RegPage,
  ],
  imports: [
    IonicPageModule.forChild(RegPage),
    ComponentsModule
  ],
})
export class RegPageModule {}
