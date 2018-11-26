import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the MyaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'myaddress',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-myaddress',
  templateUrl: 'myaddress.html',
})
export class MyaddressPage {
  list:any = [];
  aid:any = 0;
  uaId:any = "";
  type:any = "";
  nickname = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
    this.type = this.navParams.get("type");
  }
  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded=>{
      this.nickname = this.cp.u.nickname;
      if(loaded) {
        this.cp.getData("user_address/getlist").then(res => {
          //console.log(res);
          this.list = (res as any).data;
        });
        let userInfo = this.cp.u;
        this.uaId = userInfo.user_profile.ua_id;
        //console.log(this.uaId);
      }
    })
  }
  //设为默认地址
  setDefault(aid){
    this.aid = aid;
    this.cp.getData("user_profile/edit",{ua_id:aid}).then((res:any)=>{
      //console.log(res);
      if(res.msg=="编辑成功"){
        let userInfo = this.cp.u;
        userInfo.user_profile.ua_id = aid;
        this.cp.setU(userInfo);
        this.uaId = aid;
        if(this.type==0){
          this.cp.goto({view:"myconfirmorder"});
        }
      }
    })
  }
  //删除地址
  delete(id){
    this.cp.prompt("删除","确定删除当前地址吗？","取消",()=>{},"确定",()=>{
      this.cp.getData("user_address/delete",{id:id}).then((res:any)=>{
        console.log(res);
        if(res.msg=="移动到回收站成功"){
          this.cp.toast("删除成功");
          this.cp.pop();
        }else{
          this.cp.toast(res.msg);
        }
      })
    })
  }

}
