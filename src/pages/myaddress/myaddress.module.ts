import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyaddressPage } from './myaddress';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(MyaddressPage),
    ComponentsModule
  ],
})
export class MyaddressPageModule {}
