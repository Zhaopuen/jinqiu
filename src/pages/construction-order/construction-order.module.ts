import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionOrderPage } from './construction-order';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ConstructionOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionOrderPage),
    ComponentsModule
  ],
})
export class ConstructionOrderPageModule {}
