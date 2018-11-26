import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the MyHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'my-home',
})
@Component({
  selector: 'page-my-home',
  templateUrl: 'my-home.html',
})
export class MyHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyHomePage');
  }

}
