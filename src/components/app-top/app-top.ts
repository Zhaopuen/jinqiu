import { Component, Input } from '@angular/core';
import { CommonProvider } from "../../providers/common/common";
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'app-top',
  templateUrl: 'app-top.html'
})

export class AppTopComponent {
  routers = ""

  @Input() title: any;
  @Input() currentPage: any;

  list=[
    {name:'公司简介',route:'index',id:0},
    {name:'装修问答',route:'cooperate',id:1},
    {name:'风格案例',route:'style',id:2},
    {name:'量房预约(免费)',route:'measure-house',id:3},
    {name:'设计',route:'design',id:4},
    {name:'施工',route:'work',id:5},
    {name:'精选套餐',route:'hardcover',id:6},
    {name:'装饰商城',route:'decorationmall',id:7},
    {name:'进入我的',route:'personal',id:8}
  ]
  clickNum = this.navParams.get("num") ? this.navParams.get("num") : 0;
  index:any = "";
  constructor(public cp: CommonProvider,public navParams: NavParams) {
  }

  ionViewDidLoad(){
    console.log(this.cp.u,'这是top的登录信息')
  }

  toIndex($event){
    console.log($event)
  }
  witchCity(){
    let areaModal = this.cp.modalCtrl.create('area',{});
    areaModal.present();
    //this.cp.toast('当前仅开放杭州，尽请期待');
  }
}
