import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the WorkingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'workings',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-workings',
  templateUrl: 'workings.html',
})
export class WorkingsPage {
  sureOrders = [];
  orderList = [];
  noShow = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkingsPage');
    this.sureOrder();
  }

  // 在施工订单
  sureOrder(){
    this.cp.getData("order_staff/getlist",{
      status:1,
      pay_status:1,
      subject_id:4,
      shipping_status:1
    }).then((res:any) => {
      this.sureOrders = res.data;
      if(res.data.length == 0){
        this.noShow = true;
      }
      for(var i=0;i<res.data.length;i++){
        this.orderList = res.data[i].order.order_goods;
        console.log(res.data[i].order.order_goods[0].goods_info_arr.create_time,'这是ordergoods')
      }
      console.log(this.sureOrders,'这是在施工的施工订单')
    })
  }

  wId = "";
  ishardShowedit = false;
  addstartdate = "";
  editWorkClick(id) {
    this.ishardShowedit = !this.ishardShowedit;
    this.wId = id;
  }
 // 弹窗提示
 presentToast() {
  let toast = this.toastCtrl.create({
    message: '请输入地址',
    duration: 3000,
    position: 'middle'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
  // 设计方案
  caeUpload(){
    if(this.addstartdate == ""){
      this.presentToast()
    }else{
      this.cp.getData("order/edit",{
        id: this.wId,
        url: this.addstartdate
      }).then((res:any) =>{
        console.log(res,'这是设计全景与')
        this.ishardShowedit = false;
        
      })
    }
  }

}
