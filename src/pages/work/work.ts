import {Component,ViewChild} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {IonicPage, NavController, NavParams, AlertController, ToastController,InfiniteScroll,Content} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the WorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'work',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  page = 0;
  res:any = [];
  params: any = {};
  infiniteScrollState = !0;
  size = 10;
  type = "一居室";
  style = "地中海风格";
  items = ['一居室', '二居室', '三居室', '四居室', '别墅'];
  itemStyle = ['现代风格', '地中海风格', '欧式风格', '美式风格', '中式风格'];
  typeClick = 0;
  styleClick = 1;
  displayClick = 0;
  select = false;
  workInfo = null;
  workList = [];
  flagStyle = '';
  flags = -1;
  price = 0;
  Plist = [];
  sexCitySelect = [];
  articleP = [];
  articleC = [];
  city = [];
  sex = '';
  workxjs = null;
  designRadio = 100;
  designPlace = '';
  workerListData = [];
  inputx = '';
  addWorkId = "";
  pageForm = this.formBuilder.group({
    province: [this.cp.u.province, [Validators.required]],
    city: [this.cp.u.city, [Validators.required]],
    district: [this.cp.u.district, [Validators.required]],
    gender: [this.cp.u.gender, [Validators.required]],
  });

  provinces;
  cities;
  districts;
  nickname:any = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public cp: CommonProvider,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,) {
    if (!this.cp.u.id){}
    else {
      this.region(1),
      this.cp.u.city && this.region(this.cp.u.province),
      this.cp.u.district && this.region(this.cp.u.city)
    }
  }

  work: string = "workproduct";
  house: any = "";
  houseList: any = [];
  name = "";
  articalId = "";
  articalIdc = "";
  genderId = "";

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

  ionViewDidLoad() {
    // this.cp.init().then(loaded=>{
    //   this.name = this.cp.u.nickname;
    //   if(loaded){
    //     this.name = this.cp.u.nickname;
    //   }else{
    //     this.name = "注册/登陆"
    //   }
    // })
    this.workinfoList();
    this.cp.getData("region/children", {
      parent_id: 1
    }).then((t: any) => {
      this.Plist = t;
      console.log(t);
    });
    this.getMyHouse();
    this.nickname = this.cp.u.nickname;
  }

  // 省市联动
  change(t) {
    this.region(t);
    console.log(this.city.length, 'pppp')
    if (t <= 34) {
      for (let i = 0; i < this.Plist.length; i++) {
        if (this.Plist[i].region_id == t) {
          console.log(this.Plist[i].region_name)
          this.articleP = this.Plist[i].region_name;
          this.articalId = this.Plist[i].region_id;
          console.log(this.articleP,this.articalId,'这是省')
        }
      }
    } else if (t > 34) {
      for (let i = 0; i < this.city.length; i++) {
        if (this.city[i].region_id == t) {
          console.log(this.city[i].region_name)
          this.articleC = this.city[i].region_name;
          this.articalIdc = this.city[i].region_id;
          console.log(this.articleC, this.articalIdc,'这是城市')
        }
      }
    }
  }
  

  //获取房屋信息
  getMyHouse() {
    this.cp.getData("house/getlist", {}).then((res: any) => {
      this.houseList = res.data;
      console.log(res, "house")
    })
  }

  // 改变性别
  sexChange() {
    this.sexCitySelect = [this.sex];
    console.log(this.sexCitySelect, '1212121')
    if(this.sex == "男"){
      this.genderId = "1";
    }else if(this.sex == "女"){
      this.genderId = "2"
    }
  }

  // 省市联动数据
  region(t) {
    this.cp.getData("region/children", {
      parent_id: t
    }).then((t: any) => {
      this.city = t;
      2 == t[0].region_type ? this.cities = t : 3 == t[0].region_type ? this.districts = t : this.provinces = t
    })
  }

  typeStyle($event, item, index) {
    console.log(index)
    this.type = item;
    this.typeClick = index;
    console.log(this.type)
  }

  clickStyle($event, item, index) {
    console.log(index);
    this.style = item;
    this.styleClick = index;
  }

  // 筛选点击显示隐藏
  chooseClick() {
    this.select = !this.select;
  }

  modelBlock() {
    this.displayClick = 1;
  }

  modelNone() {
    this.displayClick = 0;
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '友情提示',
      subTitle: '已成功加入到我的订单!',
      buttons: ['去我的订单结算']
    });
    alert.present();
  }

  workVideoAlert() {
    const alert = this.alertCtrl.create({
      title: '友情提示',
      subTitle: '您的房屋尚未在我公司施工!',
      buttons: ['确定']
    });
    alert.present();
  }

  // 通过省市和性别筛选施工长列表
  workerSelected() {
    this.select = false;
    this.cp.getData("user/getlist", {
      type: 2,
      provice: this.articalId,
      city: this.articalIdc,
      gender: this.genderId
    }).then((n: any) => {
      console.log (n,'这是施工长通过城市性别筛选出来的')
      this.workerListData = n.data;
    })
  }

  //施工长列表
  workerList() {
    this.cp.getData("user/getlist", {
      type: 2
    }).then((n: any) => {
      this.workerListData = n.data;
      console.log(n.data, '0000')
    })
  }

  // 施工下单和设计
  workinfoList() {
    // this.cp.checkLogin().then(loaded => {
    //   if (loaded) {
        this.cp.getData("goods/getlist", {
          subject_id: 4
        }).then((n: any) => {
          let id = n.data[0].id;
          this.workerLists(id);
          // this.workInfo = n.data[0];
          // this.workxjs = n.data[0].props_arr[0].value;
          // this.price = n.data[0].props_arr[0].value[0];
          // this.addWorkId = n.data[0].id;
        })
    //   }
    // })
  }

  // 施工和下单二次调用
  videoShow = true;
  quanjingImg = true;
  workerLists(id) {
    this.cp.getData("goods/getlist", {
      subject_id: 4,
      id: id
    }).then((n: any) => {
      this.workInfo = n.data[0];
      if(n.data[0].video == ""){
        this.videoShow = false;
      }
      if(n.data[0].panorama == ""){
        this.quanjingImg = false;
      }else{
        this.quanjingImg = true;
      }
      this.workxjs = n.data[0].props_arr[0].value;
      this.price = n.data[0].props_arr[0].value[0];
      this.addWorkId = n.data[0].id;
    })
  }

  // 加入购物车
  workaddShopping() {
    this.cp.checkLogin2().then(loaded => {
      if (loaded) {
        let props = {"单价": this.designPlace, "面积": this.inputx};
        if (!this.designPlace || !this.inputx) {
          const toast = this.toastCtrl.create({
            message: '请选择商品属性',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          return
        }
        // if(this.house==""){
        //   this.cp.toast("请选择要施工的房屋");
        //   return;
        // }
        let su_id = localStorage.getItem("workerId");
        let type: any = 0;
        let suId: any = 0;
        if (su_id) {
          type = 2;
          suId = su_id;
        } else {
          type = 0;
          suId = 0;
        }
        this.cp.getData("cart/add", {
          subject_id: 4,
          goods_id: this.addWorkId,
          props_value: props,
          num: 1,
          type: type,
          staff_user_id: suId,
          house_id:this.house
        }).then((n: any) => {
          localStorage.removeItem("workerId");
          console.log(n);
          if (n.msg = "添加成功") {
            this.cp.toast("添加成功");
            setTimeout(() => {
              this.cp.goto({}, "mycart");
            }, 2000)
          }
        })
      }else{
        this.cp.goto({},'login')
      }
    })
  }


  designradio(i, item) {
    this.designRadio = i;
    this.designPlace = item;
  }

  // 上拉加载
  doInfinite() {
    this.params = {
      p: ++this.page,
      numPerPage: this.size,
    }
    this.cp.getData("user/getlist?type=2", this.params).then((e: any) => {
      if (e.data.length > 0) {
        this.res = e;
        this.workerListData = this.workerListData.concat(this.res.data);
        this.infiniteScroll.complete();
        if (this.workerListData.length == this.res.total) {
          this.infiniteScrollState = !1;
          this.infiniteScroll.enable(this.infiniteScrollState);
        }else {
          this.infiniteScrollState = !0;
          this.infiniteScroll.enable(this.infiniteScrollState);
        }
      } else {
        this.infiniteScrollState = !1;
        this.infiniteScroll.enable(this.infiniteScrollState);
      }
    })
  }

}
