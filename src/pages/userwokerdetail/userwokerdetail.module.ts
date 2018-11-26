import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserwokerdetailPage } from './userwokerdetail';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    UserwokerdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserwokerdetailPage),
    ComponentsModule
  ],
})
export class UserwokerdetailPageModule {}
