import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the SjbedesignedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'sjbedesigned',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-sjbedesigned',
  templateUrl: 'sjbedesigned.html',
})
export class SjbedesignedPage {
  uploadList = [];
  orderList = [];
  ishardShowedit = false;
  addstartdate = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.waitDesign();
    console.log('ionViewDidLoad SjbedesignedPage');
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

  // 待设计
  waitDesign(){
    this.cp.getData("order_staff/getlist",{
      status:1,
      pay_status:1,
      shipping_status:0,
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

  wId = "";

  editWorkClick(id) {
    this.ishardShowedit = !this.ishardShowedit;
    this.wId = id;
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
