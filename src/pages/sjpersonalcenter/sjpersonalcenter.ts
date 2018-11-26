import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the SjpersonalcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  priority: 'off',
  name : 'sjpersonalcenter',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-sjpersonalcenter',
  templateUrl: 'sjpersonalcenter.html',
})
export class SjpersonalcenterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SjpersonalcenterPage');
  }

  logout() {
    let actionSheet = this.cp.actionSheetCtrl.create({
      title: '真的要退出吗？',
      buttons: [{
        text: '退出登录',
        role: 'destructive',
        handler: () => {
          this.cp.logout().then(() => {
            this.cp.toast('您已退出登录！');
            this.cp.gotoRoot();
          })
        }
      }, {
        text: '取消',
        role: 'cancel',
      }]
    });
    actionSheet.present()
  }

}
