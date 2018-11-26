import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

@IonicPage({
  name: 'index',
  priority: 'off',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  @Input() title: any;
  @Input() currentPage: any;
  @Input() nickname: any;
  i: Number = 0;
  cooperate = [];
  company = [];
  compantyimg = [];
  mainImg = '';
  mainImgNum = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
  }

  toggle(i) {
    if (this.i == i)
      this.i = null;
    else
      this.i = i;
  }

  getItems(e) {
    //console.log(e);
  }

  frofile: string = "main";

  test($event) {
  }

  ionViewDidLoad() {
    /*if (sessionStorage.getItem("company")) {
      // 公司简介
      this.company = JSON.parse(sessionStorage.getItem("company"));
      //公司证照
      this.compantyimg = JSON.parse(sessionStorage.getItem("compantyimg"));
      this.mainImg = JSON.parse(sessionStorage.getItem("mainImg"));
      //合作品牌
      this.cooperate = JSON.parse(sessionStorage.getItem("cooperate"));
    } else {*/
      this.cp.getData("article/detail", {id: 3}).then((n: any) => {
        this.company = n;
        // sessionStorage.setItem("company", JSON.stringify(this.company));
      });
      this.indexCompany();
      this.indexCooperate();
    //}
  }

  ionViewWillEnter() {
    this.getPerHour()
  }

  getPerHour() {
    let timestamp = Date.parse(new Date() + "") / 1000;
    if (this.cp.u.id) {
      if (!this.cp.temp.sysmsg_time || timestamp - this.cp.temp.sysmsg_time > 3600) {
        this.cp.getData("sys_msg/count", {silent: 1}).then((r: any) => {
          // this.sysMsgCount = r.count;
        });

        this.cp.temp.sysmsg_time = timestamp;
      }
    }
  }

  // 合作品牌
  indexCooperate() {
    this.cp.getData("article/detail", {id: 4}).then((n: any) => {
      console.log(n, "合作品牌");
      this.cooperate = n;
      // sessionStorage.setItem("cooperate", JSON.stringify(n));
    })
  }

  //公司证照
  indexCompany() {
    this.cp.getData("Photo_cate/getlist", {pc_id: 9}).then((n: any) => {
      console.log(n, "公司证照");
      this.compantyimg = n.data;
      this.mainImg = n.data[0].photo.pic_url;
      // sessionStorage.setItem("compantyimg", JSON.stringify(n.data));
      // sessionStorage.setItem("mainImg", JSON.stringify(n.data[0].photo.pic_url));
    })
  }

  // 公司证照
  mainImgclick($event, item, index) {
    this.mainImg = item
  }

  mainImgRight() {
    console.log(this.mainImgNum);
    if (this.mainImgNum >= this.compantyimg.length - 1) {

    } else {
      this.mainImgNum += 1;
      this.mainImg = this.compantyimg[this.mainImgNum].photo.pic_url;
    }
  }

  mainImgLeft() {
    if (this.mainImgNum <= 0) {

    } else {
      this.mainImgNum -= 1;
      this.mainImg = this.compantyimg[this.mainImgNum].photo.pic_url;
    }
  }

}
