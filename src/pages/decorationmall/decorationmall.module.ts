import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DecorationmallPage } from './decorationmall';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DecorationmallPage,
  ],
  imports: [
    IonicPageModule.forChild(DecorationmallPage),
    ComponentsModule
  ],
})
export class DecorationmallPageModule {}
