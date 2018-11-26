import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyworkdetailPage } from './myworkdetail';
import { ComponentsModule } from '../../components/components.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    MyworkdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyworkdetailPage),
    ComponentsModule,
    LazyLoadImageModule
  ],
})
export class MyworkdetailPageModule {}
