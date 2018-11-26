import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserRefundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-refund',
  templateUrl: 'user-refund.html',
})
export class UserRefundPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  userRefund = ["不满意","质量太差","尺码太小","跟商家的图片差距太大"];

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRefundPage');
  }

}
