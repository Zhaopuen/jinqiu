import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavourableOrderPage } from './favourable-order';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FavourableOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(FavourableOrderPage),
    ComponentsModule
  ],
})
export class FavourableOrderPageModule {}
