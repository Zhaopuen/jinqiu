import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the WorkziliaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'workziliao',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-workziliao',
  templateUrl: 'workziliao.html',
})
export class WorkziliaoPage {
  
  nickname = ""; 
  shejiInformation = "";
  shejiInfo = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider ) {
  }

  ionViewDidLoad() {
    this.designziliao();
    this.nickname = this.cp.u.nickname;
    console.log('ionViewDidLoad WorkziliaoPage');
  }

  designziliao(){
    this.cp.getData("house/getlist",{
      id:this.navParams.get("id"),
    }).then((res:any) => {
      if(res.data.length!=0){
        this.shejiInformation = res.data[0];
        if(res.data[0].type == 0){
          this.shejiInfo = "新房"
        }else if(res.data[0].type == 1){
          this.shejiInfo = "翻新"
        }
        console.log(res,'客户资料')
      }
      
    })
  }

}
