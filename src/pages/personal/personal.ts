import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'personal',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  nickname:any = "";
  isShow = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    console.log(this.cp.u)
    if(this.cp.u.type==0){
      this.isShow = this.isShow;
    }else if(this.cp.u.type==1){
      this.isShow = !this.isShow;
    }else if(this.cp.u.type==2){
      this.isShow = !this.isShow;
    }

  }

  // 进入员工中心
  yuangong(){
    if(this.cp.u.type==1){
      this.cp.goto({},"sjpersonalcenter")
    }else if(this.cp.u.type == 2){
      this.cp.goto({},"workuser")
    }else{
      this.cp.goto({},"otherpersoninfo")
    }
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
