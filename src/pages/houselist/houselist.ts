import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the HouselistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'houselist'
})
@Component({
  selector: 'page-houselist',
  templateUrl: 'houselist.html',
})
export class HouselistPage {
  houseList = [];
  nickname = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded=>{
      this.nickname = this.cp.u.nickname;
    })
    this.houselist();
  }
  
  houselist(){
    this.cp.getData("house/getlist",{}).then((res:any)=>{
      this.houseList = res.data;
    })
  }

  deteleHouse(id){
    this.cp.getData("house/delete",{
      id: id
    }).then((res:any)=>{
      if(res.code == 0){
        this.houselist();
        this.cp.toast("删除成功！");
      }
      console.log(res,'这是删除房屋')
    })
  }

}
