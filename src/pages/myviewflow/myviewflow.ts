import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the MyviewflowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'myviewflow',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-myviewflow',
  templateUrl: 'myviewflow.html',
})
export class MyviewflowPage {
  no:any = "";
  tracking_num:any = "";
  flowList:any = "";
  id:any = "";
  carrier:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
    this.no = this.navParams.data.no;
    this.id = this.navParams.data.id;
  }

  ionViewDidLoad() {
    this.myView(this.no);
    this.getOrder(this.id);
  }
  //物流信息
  myView(no){
     this.cp.getData("order/logisticsInformation",{no:no}).then((res:any) => {
       console.log(res,12121212);
       this.tracking_num = res.nu;
       this.flowList = res.data;
     })
  }
  //订单信息
  getOrder(id){
    this.cp.getData("order/getlist",{id:id}).then((res:any)=>{
      this.carrier = res.data[0].carrier;
    })
  }

}
