import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the SjfinishedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'sjfinished'
})
@Component({
  selector: 'page-sjfinished',
  templateUrl: 'sjfinished.html',
})
export class SjfinishedPage {
  uploadList= [];
  orderList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    this.waitDesign()
    console.log('ionViewDidLoad SjfinishedPage');
  }
  // 已完成
  waitDesign(){
    this.cp.getData("order_staff/getlist",{
      status:8,
      // pay_status:1,
      // shipping_status:0,
      subject_id:3
    }).then((res:any) => {
      this.uploadList = res.data;
      for(var i=0;i<res.data.length;i++){
        this.orderList = res.data[i].order.order_goods;
        console.log(res.data[i].order.order_goods[0].goods_info_arr.create_time,'这是ordergoods')
      }
      console.log(res,'这是待设计的订单')
    })
  }

}
