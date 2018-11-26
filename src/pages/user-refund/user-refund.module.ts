import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRefundPage } from './user-refund';

@NgModule({
  declarations: [
    UserRefundPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRefundPage),
  ],
})
export class UserRefundPageModule {}
