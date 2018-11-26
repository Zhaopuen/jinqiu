import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the DesignDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'design-detail',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-design-detail',
  templateUrl: 'design-detail.html',
})
export class DesignDetailPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  designDetailInfo = null;
  designerCommentData = [];
  workExprice = [
    // {workTime:'2016-2017',workgsName:'玫瑰家装',workContent:'射界谁会跌回到好似'},
    // {workTime:'2017-2018',workgsName:'玫瑰家装玫瑰家装',workContent:'射界谁会跌回到好似纱卡刷卡或刷卡或是喀什'}
  ];
  worke = false;
  pagedetail:string = 'pages';
  pet:string = 'puppies';
  strengths:any = [];
  designpins = [];
  nickname:any = "";
  ionViewDidLoad() {
    console.log('ionViewDidLoad DesignDetailPage');
    this.designDetail();
    this.nickname = this.cp.u.nickname;
  }

  //设计师详情
  designDetail(){
    this.cp.getDataInfo("user/detail", {
      type:1,
      user_id:this.navParams.get("id"),
    }).then((n:any) => {
      this.designDetailInfo = n.data;
      console.log(n,"detail");
      console.log(n);
      if(n.data.workExperience == null){
        this.worke = false;
      }else{
        this.worke = true;
        this.workExprice = n.data.workExperience;
      }
      
      console.log(this.workExprice,'xxxxxxxxx11111')
      console.log(n);
      this.designpins = n.data.user_profile.case_pics_arr;
      let designP = n.data.user_profile.price
      this.cp.setGlobal({"designprice":designP})
      localStorage.setItem("designP",designP);
    })
  }

  mallCommentimgData = [];
  nocomment = false;

  // 设计师评论
  designerComment(){
    this.cp.getDataInfo("goods_comment/getlist",{
      designer_id:this.navParams.get("id"),
      has_pic:""
    }).then((n:any) => {
      console.log(n.data,'这是设计师详情的评价');
      if(n.data.length == 0){
        this.nocomment = true;
        return false
      }else{
        this.designerCommentData = n.data;
        this.mallCommentimgData = n.data[0].pics_arr;
      }
    })
  }
  //保存选定设计师信息
  saveDesigner(designId){
    localStorage.setItem("designId",designId);
    this.cp.goto({'view':'design'});
  }
}
