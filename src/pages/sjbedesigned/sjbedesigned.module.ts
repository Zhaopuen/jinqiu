import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SjbedesignedPage } from './sjbedesigned';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SjbedesignedPage,
  ],
  imports: [
    IonicPageModule.forChild(SjbedesignedPage),
    ComponentsModule
  ],
})
export class SjbedesignedPageModule {}
