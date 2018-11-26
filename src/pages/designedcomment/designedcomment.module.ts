import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignedcommentPage } from './designedcomment';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DesignedcommentPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignedcommentPage),
    ComponentsModule
  ],
})
export class DesignedcommentPageModule {}
