import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FavourableOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourable-order',
  templateUrl: 'favourable-order.html',
})
export class FavourableOrderPage {

  address='江苏省南京市建邺区万达B座2402室'
  addressName = '顾平生'
  addressTel = '1831236454'
  designOrderNum = '123456789'
  designOrderTime = '2017-10-22 18:20'

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavourableOrderPage');
  }

}
