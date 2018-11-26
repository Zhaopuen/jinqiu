import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewPage } from './user-view';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    UserViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewPage),
    ComponentsModule
  ],
})
export class UserViewPageModule {}
