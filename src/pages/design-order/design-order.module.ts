import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignOrderPage } from './design-order';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DesignOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignOrderPage),
    ComponentsModule
  ],
})
export class DesignOrderPageModule {}
