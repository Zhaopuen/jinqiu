import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserworkerPage } from './userworker';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserworkerPage,
  ],
  imports: [
    IonicPageModule.forChild(UserworkerPage),
    ComponentsModule
  ],
})
export class UserworkerPageModule {}
