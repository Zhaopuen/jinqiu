import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StylePage } from './style';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StylePage,
  ],
  imports: [
    IonicPageModule.forChild(StylePage),
    ComponentsModule
  ],
})
export class StylePageModule {

}
