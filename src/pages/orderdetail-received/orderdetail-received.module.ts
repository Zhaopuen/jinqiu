import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderdetailReceivedPage } from './orderdetail-received';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OrderdetailReceivedPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderdetailReceivedPage),
    ComponentsModule
  ],
})
export class OrderdetailReceivedPageModule {}
