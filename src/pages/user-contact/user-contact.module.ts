import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserContactPage } from './user-contact';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserContactPage,
  ],
  imports: [
    IonicPageModule.forChild(UserContactPage),
    ComponentsModule
  ],
})
export class UserContactPageModule {}
