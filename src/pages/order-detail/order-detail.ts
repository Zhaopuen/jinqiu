import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common"
/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'order-detail',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  order_id:any = "";
  orderDetail:any = "";
  nickname:any = "";
  flowList:any = "";
  tracking_number:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
    //console.log(this.navParams)
    this.order_id = this.navParams.data.id;
  }

  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded=>{
      if(loaded){
        this.nickname = this.cp.u.nickname;
        this.cp.getData("order/getlist",{subject_id:1,id:this.order_id}).then((res:any)=>{
          console.log(res,"normal");
          let data = res.data[0];
          let time = "";
          //console.log(data.create_time)
          time = data.create_time.slice(0,16);
          //console.log(time,'00000000')
          data.time = time;
          for(let ol of data.order_goods){
            let types = ol.props_value_arr;
            let typeList = [];
            for(let i in types){
              typeList.push(types[i]);
            }
            ol.typeArr = typeList;
          }
          if(data.tracking_number!=null){
            this.myView(data.tracking_number);
          }
          this.orderDetail = data;
        })
      }
    })
  }

  myView(no){
    this.cp.getData("order/logisticsInformation",{
      no:no
    }).then((res:any)=>{
      console.log(res,"物流");
      this.flowList = res.data;
      this.tracking_number = res.nu
    })
  }

}
