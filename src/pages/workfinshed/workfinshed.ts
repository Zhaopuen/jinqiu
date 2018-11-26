import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the WorkfinshedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'workfinshed',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-workfinshed',
  templateUrl: 'workfinshed.html',
})
export class WorkfinshedPage {
  nickname = "";
  sureOrders = [];
  orderList = [];
  noShow = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkfinshedPage');
    this.sureOrder();
  }

  // 已结算订单
  sureOrder(){
    this.cp.getData("order_staff/getlist",{
      status:8,
      subject_id:4,
    }).then((res:any) => {
      this.sureOrders = res.data;
      if(res.data.length == 0){
        this.noShow = true;
      }
      for(var i=0;i<res.data.length;i++){
        this.orderList = res.data[i].order.order_goods;
        console.log(res.data[i].order.order_goods[0].goods_info_arr.create_time,'这是ordergoods')
      }
      console.log(this.sureOrders,'这是已确认的施工订单')
    })
  }

}
