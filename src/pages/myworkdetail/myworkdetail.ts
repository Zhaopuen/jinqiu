import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the MyworkdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'myworkdetail'
})
@Component({
  selector: 'page-myworkdetail',
  templateUrl: 'myworkdetail.html',
})

export class MyworkdetailPage {
  @ViewChild(Slides) slides: Slides;

  nickname = "";
  gender: any = "";
  showSlides: boolean = false;
  slideImgs: any = [];
  workDetailInfo = [];
  imgs:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyworkdetailPage');
    this.workDetail();
    this.nickname = this.cp.u.nickname;
    this.gender = this.cp.u.gender == 1 ? "男" : "女";
    let house_id = localStorage.getItem("house_id");
    this.cp.getData("house/getlist",{id:house_id}).then((res:any)=>{
      console.log(res,"house");
    })
  }

  //获取施工订单详情
  workDetail() {
    this.cp.getData("order/getlist", {
      subject_id: 4,
      id: this.navParams.get("id"),
    }).then((res: any) => {
      console.log(res.data, "施工详情");
      let time = res.data[0].create_time.slice(0, 16);
      res.data[0].time = time;
      for (let item of res.data[0].order_goods) {
        let typeArr = [];
        for (let i in item.props_value_arr) {
          typeArr.push(item.props_value_arr[i]);
        }
        item.typeArr = typeArr;
      }
      this.workDetailInfo = res.data;
      this.imgs = res.data[0].project_pics_arr;
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

  showSlide(imgs: any, index: number = 0) {
    this.showSlides = true;
    setTimeout(() => this.slideImgs = imgs, 20);
    if (this.slides.length() && this.slides.length() == this.slideImgs.length)
      this.slides.slideTo(index, 0, true);
    else {
      let timer = setInterval(() => {
        //slides加载完毕后 再滑到指定slide
        this.slides.length() == this.slideImgs.length && (clearInterval(timer), this.slides.slideTo(index, 0, true))
      }, 25)
    }
  }
  toggleSlide(){
    this.showSlides = false;
  };
}
