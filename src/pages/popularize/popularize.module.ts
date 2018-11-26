import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularizePage } from './popularize';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PopularizePage,
  ],
  imports: [
    IonicPageModule.forChild(PopularizePage),
    ComponentsModule
  ],
})
export class PopularizePageModule {}
