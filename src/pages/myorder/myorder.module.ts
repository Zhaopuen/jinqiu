import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyorderPage } from './myorder';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyorderPage,
  ],
  imports: [
    IonicPageModule.forChild(MyorderPage),
    ComponentsModule
  ],
})
export class MyorderPageModule {}
