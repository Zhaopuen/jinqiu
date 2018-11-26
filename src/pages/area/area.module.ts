import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AreaPage } from './area';
import { IonAlphaScrollModule } from '../../components/ion-alpha-scroll/ion-alpha-scroll.module';

@NgModule({
  declarations: [
    AreaPage,
  ],
  imports: [
    IonicPageModule.forChild(AreaPage),
    IonAlphaScrollModule,
  ],
})
export class AreaPageModule {}
