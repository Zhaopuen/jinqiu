import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignDetailPage } from './design-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DesignDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignDetailPage),
    ComponentsModule
  ],
})
export class DesignDetailPageModule {}
