import { Component } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  priority: 'off',
   name: 'withdraw',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {
  amount;show=!1;active=!1;
  pageForm = this.formBuilder.group({
      amount: ["", [Validators.required]]
  });
  constructor(public formBuilder:FormBuilder, public cp: CommonProvider) {
  }

  ionViewWillEnter(){
    this.cp.checkLogin().then(loaded=>{
      if(!this.cp.u.user_profile.receive_money_qrcode)
        this.cp.toast('请先完善收款信息'), this.cp.goto({view:'account'});
    })
  }

  sub(t) {
    if(!this.cp.u.wechat_nickname)
      this.cp.toast("请先绑定微信，通过微信直接到账咯"),this.cp.goto({view:'settings'})
    else if(this.cp.u.money < t.amount)
      this.cp.toast("余额不足")
    else
      this.cp.getData("user/withdraw", t).then((n:any) => {
          if (n.status) {
              this.cp.setU(n.data),
              this.show = !0,
              setTimeout(()=>this.active = !0,200), setTimeout(()=>this.active = !1,3200)
          } else {
            if(n.msg.indexOf('余额不足') != -1)
              this.cp.u.money = n.data;
            this.cp.toast(n.msg)
          }
      })
  }

  // toWechat(){
  //   if(this.cp.plt.is("cordova")){
  //     this.cp.shareToOpt({
  //       pic: this.cp.SITE_URL+"assets/imgs/qr.jpg",
  //     }, 'wechat')
  //   }else if(this.cp.isWechat()){
  //     this.cp.toast("请长按识别二维码进入")
  //   }else{
  //     this.cp.toast("请长按二维码保存后到微信内识别")
  //   }
  // }
  hide(){
    this.show=!1;
  }
  all(){
    this.amount = this.cp.u.money;
  }
}
