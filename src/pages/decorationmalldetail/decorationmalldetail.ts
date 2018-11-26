import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,ToastController} from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

@Component({
  selector: 'page-decorationmalldetail',
  templateUrl: 'decorationmalldetail.html',
})
@IonicPage({
  priority: 'off',
  name : 'decorationmalldetail',
  defaultHistory : ['tabs']
})
export class DecorationmalldetailPage {
  nickname:any = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public cp: CommonProvider,
    public toastCtrl: ToastController
  ) {

}

  mall :string = "mallproduct";
  malldetail :string = "malldetailall";
  isbuyShow = false;
  isbuyright = false;
  mallInfo = null;
  commentInfo = [];
  mallClassInfo = {};
  mallRightInfo = null;
  mallSizeInfo = null;
  mallRightpicInfo = null;
  mallColor = "白色";
  mallColorClick = null;
  mallColorPic = 1;
  mallSize = '尺寸1';
  mallSizeClick = null;
  selectColorImg = 0;
  mallMaterial = "材质1";
  mallMaterialClick = 2;
  mallMaterialInfo = null;
  mallCommentData = [];
  mallCommentimgData = [];
  mallNum = 1;
  props_value = [];  //加入购物车
  color = "";
  size = "";
  material = "";
  mallRatings = "";
  mallClasstitle = [];
  mallShopLeader = null;
  mallRightname = "";
  mallSizename = "";
  mallMaterialname = "";
  malls = [];
  name = "";
  designOrderData = null;
  ceshi = null;
  swiperImg = [];
  //立即购买弹窗
  rightBuy(){
    this.isbuyShow = !this.isbuyShow;
  }

  rightBuybuy(){
    this.isbuyright = !this.isbuyright;
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
  
  // 立即购买选择颜色
  mallColorStyle($event, item,index){
    this.mallColor = item;
    this.mallColorPic = item;
    this.mallColorClick = index;
    this.selectColorImg = index;
    this.color = item;
  }

  //立即购买选择尺寸
  mallSizeStyle($event, item,index){
    console.log(index);
    this.mallSize = item;
    this.mallSizeClick = index;
    this.size = item;
  }

  // 立即购买选择材质
  mallMaterialStyle($event,item,index){
     this.mallMaterial = item;
     this.mallMaterialClick = index;
     this.material = item;
  }

  // 商品数量增加减少
  mallAdd(index){
    this.mallNum++;
  }
  mallReduce(index){
    if(this.mallNum<2) return
    this.mallNum--;
  }

  // 进入页面的生命周期函数
  ionViewDidLoad() {
    this.malldetailList();
    this.mallComment();
    this.nickname = this.cp.u.nickname;
  }

  mallVideo = "";
  // 促销商品详情
  malldetailList(){
    this.cp.getData("goods/getlist", {
      id:this.navParams.get("id")
    }).then((n:any) => {
      this.malls = n.data[0].props_arr;
      this.mallInfo = n.data[0];
      this.mallVideo = n.data[0].video;
      this.swiperImg = n.data[0].pics_arr;
      this.mallShopLeader = n.data[0].buy_guild;   //购物指南
      this.ceshi = n.data[0].manufacturer.intro;    //厂家介绍
      this.designOrderData = n.data[0];
      this.mallClassInfo = n.data[0].attrs_arr;
      this.mallRightInfo = n.data[0].props_arr[0].value;
      this.mallRightname = n.data[0].props_arr[0].name;
      this.mallRightpicInfo = n.data[0].props_arr[0].pic_url;
      this.mallSizeInfo = n.data[0].props_arr[2].value;
      this.mallSizename = n.data[0].props_arr[2].name;
      this.mallMaterialInfo = n.data[0].props_arr[1].value;
      this.mallMaterialname = n.data[0].props_arr[1].name;
      // 判断是否收藏
      if(n.data[0].has_collected == "1"){
        this.starShow = false;
      }else if(n.data[0].has_collected == "0"){
        this.starShow = true;
      }
    })
  }

  starShow = true;
  // 收藏商品
  collectMall(){
    this.cp.getData("collection/toggle",{
      collection_id:this.navParams.get("id")
    }).then((res:any) => {
      console.log("这是收藏的商品")
      if(res.msg == "恢复成功" || res.msg == "添加成功"){
        this.starShow = false;
        const toast = this.toastCtrl.create({
          message: '收藏成功',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }else if(res.msg == "移动到回收站成功"){
        this.starShow = true;
        const toast = this.toastCtrl.create({
          message: '取消收藏',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }
    })
  }

  // 点击确定加入购物车
  addShopping(){
    this.cp.checkLogin2().then(loaded=>{
      if(loaded) {
        let props = {"颜色":this.color,"尺寸":this.size,"材质":this.material};
        if(!this.color || !this.size || !this.material){
          const toast = this.toastCtrl.create({
            message: '请选择商品属性',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          return
        }
        this.cp.getData("cart/add",{
          goods_id:this.navParams.get("id"),
          id:this.navParams.get("id"),
          props_value:props,
          num:this.mallNum
        }).then((n:any) => {
          console.log(n.data);
          if(n.msg=="添加成功"){
            this.isbuyShow = false;
            const toast = this.toastCtrl.create({
                message: '成功加入购物车',
                duration: 3000,
                position: 'middle'
            });
            toast.present();
          }
        })
      }else{
        this.cp.goto({},'login')
      }
    })
  }

  buyShopping(){
    this.cp.checkLogin2().then(loaded=>{
      if(loaded) {
        let props = {"颜色":this.color,"尺寸":this.size,"材质":this.material};
        if(!this.color || !this.size || !this.material){
          const toast = this.toastCtrl.create({
            message: '请选择商品属性',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          return
        }
        this.cp.getData("cart/add",{
          goods_id:this.navParams.get("id"),
          id:this.navParams.get("id"),
          props_value:props,
          num:this.mallNum
        }).then((n:any) => {
          console.log(n.data);
          if(n.msg=="添加成功"){
            this.isbuyright = false;
            const toast = this.toastCtrl.create({
                message: '成功加入购物车',
                duration: 3000,
                position: 'middle'
            });
            toast.present();
            this.cp.goto({},"mycart")
          }
        })
      }else{
        this.cp.goto({},'login')
      }
    })
  }

  nocomment = false;

  getDatas(){

  }
 
  
  
  houseInfoShow = true;
  houseInfo = "";
  //商品评价  全部
  mallComment(){
    this.cp.getDataInfo("goods_comment/getlist", {
      goods_id:this.navParams.get("id"),
      rating: "",
      has_pic:""
    }).then((n:any) => {
      console.log(n,"comment");
      if(n.data.length>0){
        this.mallCommentData = n.data;
        if(n.data[0].house_info_arr == null){
          this.houseInfoShow = false;
        }else{
          this.houseInfoShow = true;
          this.houseInfo = n.data[0].house_info_arr;
        }
        if(n.data.length == 0){
          // this.nocomment = !this.nocomment;
          return false
        }else{
          this.mallCommentimgData = n.data[0].pics_arr;
          this.mallRatings = n.data[0].ratings.replace(/&quot;/g, "").replace(/\{|}/g,'');   //评论评分截取字符串
        }
        // console.log(n.data[0].ratings.replace(/&quot;{}/g, ""),'服务评分');
      }
    })
  }

  // 好评 满意
  mallCommentGood(){
    this.cp.getDataInfo("goods_comment/getlist", {
      goods_id:this.navParams.get("id"),
      rating: 0,
      has_pic:""
    }).then((n:any) => {
      this.mallCommentData = n.data;
      console.log(n.data[0].ratings_arr,'这是商品详情的评分')
      if(n.data.length == 0){
        // this.nocomment = !this.nocomment;
        return false
      }else{
        this.mallCommentimgData = n.data[0].pics_arr;
        this.mallRatings = n.data[0].ratings.replace(/&quot;/g, "").replace(/\{|}/g,'');   //评论评分截取字符串
      }
    })
  }

  // 图片
  mallCommentPic(){
    this.cp.getDataInfo("goods_comment/getlist", {
      goods_id:this.navParams.get("id"),
      rating: "",
      has_pic:1
    }).then((n:any) => {
      this.mallCommentData = n.data;
      // console.log(n.data[0].ratings_arr['质量'],'这是商品详情的评分11111')
      if(n.data.length == 0){
        // this.nocomment = !this.nocomment;
        return false
      }else{
        this.mallCommentimgData = n.data[0].pics_arr;
        this.mallRatings = n.data[0].ratings.replace(/&quot;/g, "").replace(/\{|}/g,'');   //评论评分截取字符串
      }

    })
  }

  // 一般
  mallCommentJust(){
    this.cp.getDataInfo("goods_comment/getlist", {
      goods_id:this.navParams.get("id"),
      rating: 1,
    }).then((n:any) => {
      this.mallCommentData = n.data;
      console.log(this.mallCommentData,'这是一般的评价')
      if(n.data.length == 0){
        // this.nocomment = !this.nocomment;
        return false
      }else{
        this.mallCommentimgData = n.data[0].pics_arr;
      }
    })
  }

  //  差评
  mallCommentPoor(){
    this.cp.getDataInfo("goods_comment/getlist", {
      goods_id:this.navParams.get("id"),
      rating: 2,
    }).then((n:any) => {
      this.mallCommentData = n.data;
      console.log(this.mallCommentData,'这是差评的评价')
      if(n.data.length == 0){
        // this.nocomment = !this.nocomment;
        return false
      }else{
        this.mallCommentimgData = n.data[0].pics_arr;
      }
    })
  }

  // 购物指南
  shopLeader(){
    let mallShop = [];
    this.cp.getData("goods_category/cates", {
      id:this.navParams.get("id")
    }).then((n:any) => {
      //let id = this.navParams.get("id");
      // console.log(id);
      for(let i=0;i<n.length;i++){
        mallShop.push(n[i].buy_guide);
      }
      this.mallShopLeader = mallShop;
      // console.log(this.mallShopLeader);
    })
  }
}

