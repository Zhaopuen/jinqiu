import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ToastController} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

// import { ModalPage } from './hardcover';

/**
 * Generated class for the HardcoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'hardcover',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-hardcover',
  templateUrl: 'hardcover.html',
})
export class HardcoverPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public cp: CommonProvider,
              public toastCtrl: ToastController,) {
  }

  pet: string = "promotionmall";
  ishardShow = false;
  hardStyle = 0;
  type = "xd";
  hardInfo = null;
  hardcoverping = '';  //套餐待施工的面积
  price = '';    //套餐的价格
  addHardId = "";  //套餐的id
  designRadio = 100;
  hardData = [];
  hardContent = "";
  roomDetail: any = [];
  rowArr:any = [];
  row:any = -1;
  col:any = -1;
  nickname:any = "";
  videoShow = true;
  quanjingImg = true;
  mallList(id, i) {
    this.hardInfo = this.hardData[i];
    if(this.hardData[i].video == ""){
      this.videoShow = false;
    }
    if(this.hardData[i].panorama == ""){
      this.quanjingImg = false;
    }else{
      this.quanjingImg = true;
    }
    this.hardData.forEach(function (item, index) {
      item.isSelect = false;
    })
    this.hardData[i].isSelect = true;  //当前按钮显示颜色
    this.hardListajaxSecond(id, i);
  }

  showBigImgNum = 0;
  showBigImgSrc = '';
  // 点击放大图片
  showBigImgBlock(item){
    console.log("HHHHHHHHHH")
    this.showBigImgNum = 1;
    this.showBigImgSrc = item;
  }
  showBigImgNone(){
    this.showBigImgNum = 0;
  }
  //精装套餐
  hardListajax() {
    this.cp.getData("goods/getlist", {
      subject_id: 2,
    }).then((n: any) => {
      console.log(n, "1213245");
      let id = n.data[0].id;
      this.hardData = n.data;
      this.hardInfo = this.hardData[0];
      if(this.hardData[0].video == ""){
        this.videoShow = false;
      }
      if(this.hardData[0].panorama == ""){
        this.quanjingImg = false;
      }else{
        this.quanjingImg = true;
      }
      this.hardData[0].isSelect = true;
      this.hardListajaxSecond(id, 0)
    })
  }

  //精装套餐二次调用  类型选择
  hardListajaxSecond(id, i) {
    this.cp.getData("goods/getlist", {
      subject_id: 2,
      id: id
    }).then((res: any) => {
      console.log(res, "精装套餐");
      let datas = res.data[0];
      let afterData = [];
      for (let i in datas.props_arr) {
        this.rowArr.push(i);
        let group = [];
        for (let j in datas.props_arr[i].pic_url) {
          group.push({name:datas.props_arr[i].name,pic: datas.props_arr[i].pic_url[j], value: datas.props_arr[i].value[j]})
        }
        afterData.push(group);
      }
      datas.afterArr = afterData;
      console.log(datas,"afterArr");
      this.roomDetail = datas;
      this.addHardId = datas.id;
      this.hardContent = datas.content;
    })
  }

  //点击选中图片
  checkedImg(i,j) {
    for(let k in this.roomDetail.afterArr){
      if(k==i){
        for(let l in this.roomDetail.afterArr[k]){
          if(l==j){
            this.roomDetail.afterArr[k][l].checked = true;
          }else{
            this.roomDetail.afterArr[k][l].checked = false;
          }
        }
      }
    }
  }

  // 套餐介绍的弹窗
  hardcoverClick($event, items, index) {
    this.hardStyle = index;
    this.type = items;
    this.ishardShow = !this.ishardShow;
  }

  // 生命周期  进入页面的时候调取数据
  ionViewDidLoad() {
    this.hardListajax();
    this.nickname = this.cp.u.nickname;
  }

  // 加入购物车
  designaddShopping() {
    this.cp.checkLogin2().then(loaded=>{
      if(loaded) {
        if (this.hardcoverping=="") {
          this.cp.toast("请填写房屋面积");
          return;
        }
        let imgs:any = [];
        for(let item of this.roomDetail.afterArr){
          for(let every of item){
            if(every.checked==true){
              console.log(every);
              imgs.push(every)
            }
          }
        }
        console.log(imgs);
        if(imgs.length<this.roomDetail.afterArr.length){
          this.cp.toast("请选择房屋的造型及材料");
          return
        }

        let props = {"单价": this.roomDetail.price, "面积": this.hardcoverping,"图片":imgs};
        this.cp.getData("cart/add", {
          subject_id: 2,
          goods_id: this.addHardId,
          props_value: props,
          num: 1
        }).then((n: any) => {
          if (n.msg = "添加成功") {
            this.cp.toast("添加成功");
            this.hardcoverping = "";
            setTimeout(()=>{
              this.cp.goto({},"mycart")
            },2000)
          }
        })
      }else{
        this.cp.goto({},'login')
      }
    })
  }

}
