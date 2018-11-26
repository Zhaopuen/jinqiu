import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgreenmentPage } from './agreenment';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AgreenmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AgreenmentPage),
    ComponentsModule
  ],
})
export class AgreenmentPageModule {}
