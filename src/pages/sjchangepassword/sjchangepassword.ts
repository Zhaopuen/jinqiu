import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the SjchangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'sjchangepassword',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-sjchangepassword',
  templateUrl: 'sjchangepassword.html',
})
export class SjchangepasswordPage {
  oldCipher:'';
  newCipher:'';
  argeeCipher:'';
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SjchangepasswordPage');
  }
  //保存
  bcClick($event){
    this.cp.getData("user/mod", {
      type: 0,
    }).then((n:any) => {
      this.cp.toast(n.msg)
    })
  }

}
