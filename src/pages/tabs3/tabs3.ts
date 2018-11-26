import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the Tabs3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'tabs3',
  priority: 'off'
})
@Component({
  selector: 'page-tabs3',
  templateUrl: 'tabs3.html',
})
export class Tabs3Page {
  tab1Root = "index";
  tab2Root = "cooperate";
  tab3Root = "style";
  tab4Root = "measure-house";
  tab5Root = "design";
  tab6Root = "work";
  tab7Root = "hardcover";
  tab8Root = "decorationmall";
  tab9Root = "my-home";

  showMe:any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs3Page');
  }
  toPersonal(){
    this.cp.goto({},"personal");
  }

}
