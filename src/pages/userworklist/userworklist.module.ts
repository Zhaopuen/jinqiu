import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserworklistPage } from './userworklist';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    UserworklistPage,
  ],
  imports: [
    IonicPageModule.forChild(UserworklistPage),
    ComponentsModule
  ],
})
export class UserworklistPageModule {}
