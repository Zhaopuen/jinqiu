import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  priority: 'off',
  name: 'pay',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  params:any = {};
  subjects:any = [];
  subject:any = {icon:'./assets/imgs/logo_primary.png', price:0};
  promo_code:any = {amount:0, discount:0};
  amount = '0';
  last_code = '';
  last_code_id = 0;
  suc = !1;

  constructor(public cp: CommonProvider, public navParams: NavParams) {
  }

  ionViewWillEnter(){
    this.cp.checkLogin().then(loaded=>{
      this.params = this.navParams.data;
      if(this.cp.isWechat())
        this.params.type = 'wechat_pay';
      else
        this.params.type = this.params.type || 'alipay';
      if(typeof this.params.pocket_type != 'undefined'){
        this.subject = {
          name: '塞红包',
          intro: this.params.remark,
          icon: 'https://img.alicdn.com/imgextra/i3/1771102060/TB2z55pcr9YBuNjy0FgXXcxcXXa_!!1771102060.jpg',
          price: this.params.amount
        };
        this.params.money = Math.min(this.cp.u.money, this.subject.price);
        this.format();
      }else if(this.params.id){
        this.cp.getData('subject/detail',{id: this.params.id}).then((res:any)=>{
          if(!res[0].price) return this.cp.pop();
          
          //会自动调用 subjectChange
          this.params.id = res[0].id;
          this.subjects = res;
          
          //只有1个时 手动调用 subjectChange
          if(res.length == 1)
            this.subjectChange()
        })
      }else
        return this.cp.pop();
    })
  }
  ionViewDidLeave(){
    if(!this.suc && this.last_code_id){
      this.cp.getData("promo_code/unlock", {silent:1, id: this.last_code_id}).then(res=>{})
    }
  }
  subjectChange(){
    let subject_select = this.subjects.filter((v)=>{return v.id == this.params.id});
    this.subject = subject_select[0];
    if(typeof this.params.money == 'undefined') //第一次默认填上
      this.params.money = Math.min(this.cp.u.money, this.subject.price);
    this.format();
  }
  moneyChange(){
    this.params.money = this.params.money || 0;
    if(this.params.money > this.subject.price - this.promo_code.amount)
      this.params.money = this.subject.price - this.promo_code.amount;
    else if(this.params.money > this.cp.u.money)
      this.params.money = this.cp.u.money;
    this.params.money = parseFloat(this.params.money).toFixed(2);
    this.format();
  }
  promoCode(){
    this.params.promo_code = this.params.promo_code || this.params.promo_code.trim();
    if(this.last_code == this.params.promo_code) return;
    
    this.last_code = this.params.promo_code;
    if(!this.params.promo_code)
      return this.promo_code = {amount:0, discount:0}, this.format();
    
    this.params.amount = this.subject.price; //接口里面用 amount 接收的 所以 这里赋值给 amount
    this.cp.getData("promo_code/check", this.params).then((n:any)=>{
      //切换优惠码，将上一个优惠码unlock
      if(this.last_code_id)
        this.cp.getData("promo_code/unlock", {silent:1, id: this.last_code_id}).then(res=>{}), this.last_code_id = 0
        
      if(n.status){
        this.promo_code = n.data;
        this.last_code_id = this.promo_code.id;
      }else
        this.promo_code = {amount:0, discount:0, msg:n.msg};
      
      this.format()
    })
  }
  format(){
    //先计算优惠码
    if(this.promo_code.discount > 0)
      this.promo_code.amount = (this.subject.price * (10 - this.promo_code.discount) / 10).toFixed(2)

    if(this.promo_code.amount - 0 > this.subject.price){
      this.promo_code.amount_used = this.subject.price;
    }else
      this.promo_code.amount_used = this.promo_code.amount;
    
    //再计算money
    this.params.money = Math.min(this.params.money, this.cp.u.money, this.subject.price - this.promo_code.amount_used);
    if(this.params.money < 0)
      this.params.money = 0;
    
    // + 0.0001 让精度计算时 变为正数 不然 会得到 -0.00
    this.amount = (this.subject.price - this.params.money - this.promo_code.amount_used + 0.0001).toFixed(2);
  }
  pay(){
    let callback = ()=>{
      this.suc = !0;
      this.cp.pop(),
      this.params.callback()
    }
    switch(this.params.type){
      case 'wechat_pay':
        this.params.gateway = this.cp.plt.is('cordova') ? 'WechatPay_App' : 'WechatPay_Js';
      break;
      case 'alipay':
        this.params.gateway = this.cp.plt.is('cordova') ? 'Alipay_AopApp' : (this.cp.plt.is('mobileweb') ? 'Alipay_AopWap' : 'Alipay_AopPage');
      break;
      case 'union_pay':
        this.params.gateway = 'Union_Express';
        this.params.app = this.cp.plt.is('cordova') ? 1 : 0;
      break;
    }
    this.params.amount = this.subject.price; //接口里面用 amount 接收的 所以 这里赋值给 amount
    this.params.promo_code_id = this.promo_code.id;
    this.params.promo_code_amount = this.promo_code.amount_used;
    this.cp.pay(this.params, callback)
  }

  ionViewDidEnter(){
    this.cp.temp.dl = 0;
    document.getElementById("dl") && this.cp.addClass(document.getElementById("dl"), 'hide');
  }
  ionViewWillLeave(){
    this.cp.temp.dl = 1;
    document.getElementById("dl") && this.cp.removeClass(document.getElementById("dl"), 'hide');
  }
}
