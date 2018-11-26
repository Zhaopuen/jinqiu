import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesigncommentPage } from './designcomment';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DesigncommentPage,
  ],
  imports: [
    IonicPageModule.forChild(DesigncommentPage),
    ComponentsModule
  ],
})
export class DesigncommentPageModule {}
