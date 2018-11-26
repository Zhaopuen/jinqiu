import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the WorkusersureorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'workusersureorder',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-workusersureorder',
  templateUrl: 'workusersureorder.html',
})
export class WorkusersureorderPage {

  nickname = "";
  sureOrders = [];
  orderList = [];
  noShow = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    this.nickname = this.cp.u.nickname;
    this.sureOrder();
    console.log('ionViewDidLoad WorkusersureorderPage');
  }

  sureOrder(){
    this.cp.getData("order_staff/getlist",{
      status:1,
      pay_status:1,
      subject_id:4,
      shipping_status:2
    }).then((res:any) => {
      this.sureOrders = res.data;
      if(res.data.length == 0){
        this.noShow = true;
        console.log(this.noShow,'this.noShow3333')
      }
      for(var i=0;i<res.data.length;i++){
        this.orderList = res.data[i].order.order_goods;
        console.log(res.data[i].order.order_goods[0].goods_info_arr.create_time,'这是ordergoods')
      }
      
      
      console.log(res.data,'这是已确认的施工订单')
    })
  }

}
