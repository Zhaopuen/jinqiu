import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the PopularizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'popularize',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-popularize',
  templateUrl: 'popularize.html',
})
export class PopularizePage {
  imgUrl:any = "";
  // nickname:any = "";
  // sign:any = "";
  // uid:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded=>{
      if(loaded){
        // this.nickname = this.cp.u.nickname;
        // this.sign = this.cp.u.sign;
        // this.uid = this.cp.u.id;
        // console.log("http://jinqiu.fengsh.cn/api/user/qrcode/user_id/"+this.uid+"/sign/"+this.sign);
        /*this.cp.getData("user/qrcode",{user_id:this.uid,sign:this.sign}).then((res:any)=>{
          console.log(res,"推广二维码")
        })*/
        this.imgUrl = this.cp.BASE_URL + "user/qrcode/user_id/" + this.cp.u.id + "/sign/" + this.cp.u.sign;
      }
    })

  }

}
