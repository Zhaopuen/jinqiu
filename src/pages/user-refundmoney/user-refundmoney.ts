import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserRefundmoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-refundmoney',
  templateUrl: 'user-refundmoney.html',
})
export class UserRefundmoneyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  userRefund = ["不满意","质量太差","尺码太小","跟商家的图片差距太大"];

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRefundmoneyPage');
  }

}
