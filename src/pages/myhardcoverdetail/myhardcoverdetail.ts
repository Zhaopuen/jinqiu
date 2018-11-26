import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the MyhardcoverdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"myhardcoverdetail"
})
@Component({
  selector: 'page-myhardcoverdetail',
  templateUrl: 'myhardcoverdetail.html',
})
export class MyhardcoverdetailPage {
  hardCoverInfo = [];
  nickname = "";
  gender:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    this.nickname = this.cp.u.nickname;
    this.gender = this.cp.u.gender == 1 ? "男" : "女";
    this.hardcoverDetail();
  }

  hardcoverDetail(){
    var that = this;
    this.cp.getData("order/getlist",{
      subject_id:2,
      id:this.navParams.get("id"),
    }).then((res:any)=>{
      console.log(res.data,"套餐详情");
      let time = "";
      for (let item of res.data) {
        time = item.create_time.slice(0, 16);
        item.time = time;
        for (let ol of item.order_goods) {
          let typeList = [];
          let types = ol.props_value_arr;
          for (let i in types) {
            typeList.push(types[i]);
          }
          ol.typeArr = typeList;
        }
      }
      that.hardCoverInfo = res.data;
    })
  }
  toMyInfo(){
    if (this.cp.u) {
      if (this.cp.u.type == 0) {
        this.cp.goto({view: "personal"})
      } else if (this.cp.u.type == 1) {
        this.cp.goto({view: "sjpersonalcenter"})
      } else if (this.cp.u.type == 2) {
        this.cp.goto({view: "workuser"})
      }
    } else {
      this.cp.goto({view: "login"})
    }
  }
  //确认收货
  goodsReceived(order_id, sid) {
    this.cp.prompt(
      "确认收货",
      "请确认收到货物<br>点击确定后订单完成",
      "取消",
      () => {
      },
      "确定",
      () => {
        this.cp.getData("order/edit", {id: order_id, status: 4}).then((res: any) => {
          console.log(res);
          if(res.msg=="编辑成功"){
            this.cp.goto({id:order_id,subject_id:sid},"myevaluate");
          } else {
            this.cp.toast(res.msg)
          }
        })
      }
    )
  };

}
