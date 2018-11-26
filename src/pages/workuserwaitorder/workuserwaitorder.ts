import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the WorkuserwaitorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'workuserwaitorder',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-workuserwaitorder',
  templateUrl: 'workuserwaitorder.html',
})
export class WorkuserwaitorderPage {
  
  nickname = "";
  waitWork = [];
  orderList = [];
  ishardShowedit = false;
  noShow = false;
  addstartdate = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.nickname = this.cp.u.nickname;
    this.waitOrder();
    console.log('ionViewDidLoad WorkuserwaitorderPage');
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

  waitOrder(){
    this.cp.getData("order_staff/getlist",{
       status:1,
       pay_status:1,
       subject_id:4,
       shipping_status:0
    }).then((res:any) => {
      this.waitWork = res.data;
      if(res.data.length == 0){
        this.noShow = true;
      }
      for(var i=0;i<res.data.length;i++){
        this.orderList = res.data[i].order.order_goods;
        console.log(res.data[i].order.order_goods[0].goods_info_arr.create_time,'这是ordergoods')
      }
      console.log(res,'这是待施工的订单')
    })
  }

  editWorkClick() {
    this.ishardShowedit = !this.ishardShowedit;
  }

  caseWork(){
    if(this.addstartdate == ""){
      this.presentToast()
    }else{
      this.ishardShowedit = false;
    }
  }

}
