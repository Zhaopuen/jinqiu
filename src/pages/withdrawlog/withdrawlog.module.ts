import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawlogPage } from './withdrawlog';

@NgModule({
  declarations: [
    WithdrawlogPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawlogPage),
  ],
})
export class WithdrawlogPageModule {}
