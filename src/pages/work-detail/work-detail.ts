import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the WorkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  priority: 'off',
  name : 'work-detail',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-work-detail',
  templateUrl: 'work-detail.html',
})
export class WorkDetailPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public cp: CommonProvider) {
  }
  work: string="workleader";
  workDetailInfo = null;
  workImgs = [];
  worke = false;
  name = "";
  workExprice = [
    // {workTime:'2016-2017',workgsName:'玫瑰家装',workContent:'射界谁会跌回到好似'},
    // {workTime:'2017-2018',workgsName:'玫瑰家装玫瑰家装',workContent:'射界谁会跌回到好似纱卡刷卡或刷卡或是喀什'}
  ];
  nickname:any = "";
  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkDetailPage');
    this.workDetail();
    this.nickname = this.cp.u.nickname;
  }

  //施工长详情
  workDetail(){
    this.cp.getDataInfo("user/detail", {
      type:2,
      user_id:this.navParams.get("id"),
    }).then((n:any) => {
      this.workDetailInfo = n.data;
      if(n.data.workExperience == null){
        this.worke = false;
      }else{
        this.worke = true;
        this.workExprice = n.data.workExperience;
      }
      this.workImgs = n.data.user_profile.case_pics_arr;
      console.log(this.workImgs,"detail")
      console.log(n.data);
    })
  }


  //保存指定施工长id
  saveWorker(id){
    localStorage.setItem("workerId",id)
  }
}
