import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the MydesigndetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : 'mydesigndetail',
})
@Component({
  selector: 'page-mydesigndetail',
  templateUrl: 'mydesigndetail.html',
})

export class MydesigndetailPage {

  designDetailInfo = [];
  nickname:any = "";
  gender:any = "";
  houseList:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MydesigndetailPage');
    this.designDetail();
    this.nickname = this.cp.u.nickname;
    this.gender = this.cp.u.gender==1?"男":"女";
  }
  //获取设计订单详情
  designDetail(){
    this.cp.getData("order/getlist",{
      subject_id:3,
      id:this.navParams.get("id"),
    }).then((res:any)=>{
      console.log(res.data,"design");
      let time = res.data[0].create_time.slice(0,16);
      res.data[0].time = time;
      for(let item of res.data[0].order_goods){
        let typeArr = [];
        for(let i in item.props_value_arr){
          typeArr.push(item.props_value_arr[i]);
        }
        item.typeArr = typeArr;
      }
      this.designDetailInfo = res.data;
      // let house_id = res.data[0].house_id;
    })
  }

  //确认收货并完成评论
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
