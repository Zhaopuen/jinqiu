import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the UserworkerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'userworker',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-userworker',
  templateUrl: 'userworker.html',
})
export class UserworkerPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider,
  ) {
  }
  
  workListInfo = [];
  workerGetId = "";
  ionViewDidLoad() {
    this.workerGetId = this.navParams.get("id");
    console.log(this.workerGetId,'workerGetIdbbbbbbbbbb')
  }

  ionViewDidEnter(){
    this.workerList();
  }

  // 用工管理列表
  workerList(){
    this.cp.getData("order_staff/getlist",{
      order_id: this.navParams.get("id"),
    }).then((res:any) => {
      this.workListInfo = res.data;
      console.log(res,"这是用工管理的列表")
    })
  }

  workerListDelete(id){
    this.cp.getData("order_staff/delete",{
      id: id
    }).then((res:any) => {
      this.workerList();
      console.log(res,"这是用工管理的删除")
    })
  }

}
