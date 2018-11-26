import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QaPage } from './qa';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    QaPage,
  ],
  imports: [
    IonicPageModule.forChild(QaPage),
    ComponentsModule,
  ],
})
export class QaPageModule {}
