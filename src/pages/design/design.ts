import { Component,ViewChild } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import { IonicPage ,AlertController,NavParams,ToastController,Content,InfiniteScroll} from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

@IonicPage({
  priority: 'off',
  name : 'design',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-design',
  templateUrl: 'design.html',
})
export class DesignPage {
  items = [];
  pageForm = this.formBuilder.group({
      province: [this.cp.u.province, [Validators.required]],
      city: [this.cp.u.city, [Validators.required]],
      district: [this.cp.u.district, [Validators.required]],
      gender: [this.cp.u.gender, [Validators.required]],
  });

  provinces; cities; districts;
  nickname:any = "";
  imgId:any = -1;
  constructor(
    public alertCtrl: AlertController,
    public cp: CommonProvider,
    public formBuilder:FormBuilder,
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {
    if (!this.cp.u.id){}
      else {
        this.region(1),
        this.cp.u.city && this.region(this.cp.u.province),
        this.cp.u.district && this.region(this.cp.u.city)
      }
  }
  // 选择地墙顶的造型
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  page = 0;
  res:any = [];
  params: any = {};
  infiniteScrollState = !0;
  size = 10;
  style="地中海";
  styleClick=1;
  select = false;
  workList = [];
  designOrderData = null;
  designandData = [];
  landShow = false;
  Plist = [];
  sexCitySelect = [];
  articleP = [];
  articleC = [];
  city = [];
  sex = '';
  designOrderDataxs = null;
  designRadio = 100;
  designPlace = "";
  workListData = [];
  designCommentimgData = [];
  designCommentData = [];
  designping = "";
  designxzhi = "";
  addId = "";
  name = "";
  designrwall = 100;
  house:any = "";
  houseList:any = [];
  gender = "";
  articalId = "";
  articalIdc = "";
  genderId = "";
  btnVal:any = "下一步";
  citysex = true;
  // 省市联动
  change(t) {
    console.log(t)
    this.region(t)
    console.log(this.city.length,'pppp')
    if(t <= 34  ){
        for(let i = 0;i< this.Plist.length;i++){
            if(this.Plist[i].region_id == t){
                console.log( this.Plist[i].region_name)
                this.articleP = this.Plist[i].region_name;
                this.articalId = this.Plist[i].region_id;
                console.log(this.articleP)
            }
        }
    }else if(t>34){
        for(let i =0;i< this.city.length;i++){
            if(this.city[i].region_id == t){
                console.log( this.city[i].region_name)
                this.articleC = this.city[i].region_name;
                this.articalIdc = this.city[i].region_id;
                console.log(this.articleC)
            }
        }
    }
}

  sexChange(){
    this.sexCitySelect = [this.sex];
    if(this.sex == "男"){
      this.genderId = "1"
    }else if(this.sex == "女"){
      this.genderId = "2"
    }
    console.log(this.sex,'90909090909')
  }
  region(t) {
      this.cp.getData("region/children", {
          parent_id: t
      }).then((t: any) => {
          this.city = t;
          2 == t[0].region_type ? this.cities = t : 3 == t[0].region_type ? this.districts = t : this.provinces = t
      })
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

  // 上拉加载
  doInfinite() {
    this.params = {
      p: ++this.page,
      numPerPage: this.size,
    }
    this.cp.getData("user/getlist?type=1", this.params).then((e: any) => {
      if (e.data.length > 0) {
        this.res = e;
        this.workListData = this.workListData.concat(this.res.data);
        this.infiniteScroll.complete();
        if (this.workListData.length == this.res.total) {
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

  clickStyle($event,item,index){
    console.log(index);
    this.style = item;
    this.styleClick = index;
  }

  //默认显示第一个标签页
  pet: string="kittens";
  custom: string="design";
  showAlert() {
    const alert = this.alertCtrl.create({
      title: '友情提示',
      subTitle: '已成功加入到我的订单!',
      buttons: ['去我的订单结算']
    });
    alert.present();
  }

  // 选择地顶墙的造型点击span选中图片
  hardSelected($event,j){
    $event.stopPropagation();
    this.designrwall = j;
  }

  // 筛选点击显示隐藏
  chooseClick(){
    this.select = !this.select;
  }

  ionViewDidLoad(){
    // this.page == 0 && this.doInfinite();
    // this.cp.init().then(loaded=>{
    //   this.name = this.cp.u.nickname;
    //   if(loaded){
    //     this.name = this.cp.u.nickname;
    //   }else{
    //     this.name = "注册/登录"
    //   }
    // })
    // if(this.articleP.length == 0 || this.articleC.length == 0 || this.sex == ""){
    //   this.citysex = false;
    // }else if(this.articleP.length !== 0 || this.articleC.length !== 0 || this.sex !== ""){
    //   this.citysex = true;
    // }
    this.designOrder();
    
    this.designxzhi = localStorage.getItem("designP");
    this.cp.getData("region/children", {
        parent_id: 1
    }).then((t: any) => {
        this.Plist = t;
        console.log(t);
    });
    this.getMyHouse();
    // this.nickname = this.cp.u.nickname;
    return
  }
  //获取房屋列表
  getMyHouse(){
    this.cp.getData("house/getlist",{}).then((res:any)=>{
      console.log(res,"houseList");
      this.houseList = res.data;
    })
  }
  landClick(i,j){
    // this.landShow = true;
    console.log(this.selectValue[i].value,'555757575757')
    this.selectValue[i].value.forEach(function(item,itemIndex){
      item.landShow = false;
    })
    this.selectValue[i].value[j].landShow = true;
  }

  // 设计师列表
  designerList(){
    this.cp.getData("user/getlist?type=1",{}).then((n:any)=>{
        this.workListData = n.data;
        // this.provice = this.articleP,
        this.city = this.articleC;
        console.log(this.articleC,'zgeshiathis.articleC')
    })
  }

  // 设计师通过省市和性别筛选列表
  designerSelect() {
    this.select = false;
    this.cp.getData("user/getlist",{
      type:1,
      provice: this.articalId,
      city: this.articalIdc,
      gender: this.genderId
    }).then((n:any)=>{
      this.workListData = n.data;
    })
  }

   // 设计下单和介绍
  designOrder(){
    this.cp.getData("goods/getlist", {
      subject_id:3
    }).then((n:any) => {
      let id = n.data[0].id;
      this.designerOrders(id);
    })
  }

  videoShow = true;
  quanjingImg = true;
  // 设计下单和介绍二次调用
  designerOrders(id){
    console.log(333)
    this.cp.getData("goods/getlist",{
       subject_id:3,
       id:id
    }).then((n:any) => {
      this.designOrderData = n.data[0];
      if(n.data[0].video == ""){
        this.videoShow = false;
      }
      if(n.data[0].panorama == ""){
        this.quanjingImg = false;
      }else{
        this.quanjingImg = true;
      }
      this.addId = n.data[0].id;
      this.designOrderDataxs = n.data[0].props_arr[0].value;
    })
  }

  // 指定设计师
  forDesign(){
    this.pet ="puppies";
    this.designerList();
  }

  //设计师评价
  designComment(){
    this.cp.getDataInfo("goods_comment/getlist", {
      goods_id: 5,
      // :this.navParams.get("id"),
      has_pic:1
    }).then((n:any) => {
      this.designCommentData = n.data;
      this.designCommentimgData = n.data[0].pics_arr;
    })
  }

  // 加入购物车
  designaddShopping(){
    this.cp.checkLogin2().then(loaded=>{
      if(loaded) {
        let price = "";
        if(this.designxzhi==""){
          price = this.designPlace;
        }else{
          price = this.designxzhi;
        }
        let wall = JSON.parse(localStorage.getItem("wallList"));
        let props = {"单价":price,"面积":this.designping};
        if(wall){
          Object.assign(props,wall);
        }
        if(!price || !this.designping){
          this.cp.toast("请选择或填写房屋属性");
          return;
        }
        if(this.house==""){
          this.cp.toast("请选择要设计的房屋");
          return;
        }
        localStorage.setItem("houseId",this.house)
        let su_id = localStorage.getItem("designId");
        let type:any = 0;
        let suId:any = 0;
        if(su_id){
          type = 1;
          suId = su_id;
        }else{
          type = 0;
          suId = 0;
        }
        this.cp.getData("cart/add",{
          subject_id:3,
          goods_id:this.addId,
          props_value:props,
          num:1,
          type:type,
          staff_user_id:suId,
          house_id:this.house
        }).then((n:any) => {
          if(n.msg = "添加成功"){
            this.cp.toast("添加成功");
            setTimeout(()=>{
              this.cp.goto({},"mycart");
            },2000);
            localStorage.removeItem("designId");
            localStorage.removeItem("wallList");
            localStorage.removeItem("designP");
          }
        })
      }else{
        this.cp.goto({},'login')
      }
    })
  }

  cComment = [];
  cCommentPic = [];
  nocomment = false;
  houseInfoShow = true;
  houseInfoArr = [];
  houseInfo = "";
  // 顾客评论
  custormComment(){
    this.cp.getDataInfo("goods_comment/getlist",{
      goods_id: 5
    }).then((res:any) => {
      // for(var i=0;i<res.data.length;i++){
      //   if(res.data[i].order.house_info_arr == null){
      //     console.log(11111)
      //     this.houseInfoShow = false; 
      //     return false;
      //   }else{
      //     console.log(222222)
      //     this.houseInfoShow = true;
      //     this.houseInfoArr = res.data;
      //   }
      //   this.houseInfoArr = res.data;
      // }
      
      if(res.data.length>0){
        this.cComment = res.data;
      }else if(res.data.length == 0){
        this.nocomment = true;
        return false
      }else{
        this.cCommentPic = res.data;
      }
      this.cCommentPic = res.data;
    })
  }

  // 选择地顶墙的造型
  selectStyle(){
    this.cp.getData("goods/getlist",{
      subject_id:3,
    }).then((res:any) => {
      let id = res.data[0].id;
      this.selectStyleAgain(id);
      console.log(res.data,'这是选择地顶墙的造型')
    })
  }

  selectValue = [];
  listArr:any = [];
  rowArr:any = [];
  listLen:any = 0;
  curIndex:any = 0;
  selectStyleAgain(id){
    this.cp.getData("goods/getlist",{
      subject_id:3,
      id:id
    }).then((res:any) => {
      // this.selectValue = res.data[0].props_arr;
      var array = res.data[0].props_arr;
      var listArr = [];
      for(var i=2;i<array.length;i++){
        listArr.push(
          array[i],
        )
        this.listArr.push(array[i].name)
      }
      console.log(this.listArr,"listArr")
      this.listLen = listArr.length;
      let afterData = [];
      for (let i in listArr) {
        this.rowArr.push(i);
        let group = [];
        for (let j in listArr[i].pic_url) {
          group.push({name:listArr[i].name,pic: listArr[i].pic_url[j], value:listArr[i].value[j],checked:false})
        }
        afterData.push(group);
      }
      this.selectValue = afterData;
      console.log(afterData,'这事啊364836748')
    })
  }
  imgList:any = [];
  nameList:any = [];
  allList:any = [];
   //地墙顶点击选中图片
  chooseImg(i){
    this.imgId = i;
    let len = this.selectValue[this.curIndex].length;
    for(let j=0;j<len;j++){
      if(i==j){
        this.selectValue[this.curIndex][j].checked = true;
      }else{
        this.selectValue[this.curIndex][j].checked = false;
      }
    }
  }
  //地墙顶点击下一步
  saveInfo(){
    if(this.curIndex < this.listLen-1){
      let checkedImg = this.selectValue[this.curIndex].filter(ele=>{
        return ele.checked == true;
      })
      if(checkedImg.length>0){
        /*this.cp.toast("请选择"+this.selectValue[this.curIndex][0].name);
        return;*/
        this.nameList.push(checkedImg[0].name);
        this.imgList.push(checkedImg[0].value);
      }
      this.curIndex++;
      this.imgId = -1;
      if(this.curIndex == this.listLen-1){
        this.btnVal = "确定";
      }
    }else{
      let checkedImg = this.selectValue[this.curIndex].filter(ele=>{
        return ele.checked == true;
      })
      if(checkedImg.length>0){
        /*this.cp.toast("请选择"+this.selectValue[this.curIndex][0].name);
        return;*/
        this.nameList.push(checkedImg[0].name);
        this.imgList.push(checkedImg[0].value);
      }
      let every = {};
      for(let i=0;i<this.imgList.length;i++){
        every[this.nameList[i]] = this.imgList[i];
      }
      localStorage.setItem("wallList",JSON.stringify(every));
      this.pet = "kittens";
    }
  }

  designradio(i,item){
    this.designRadio = i;
    this.designPlace = item;
    this.designxzhi = "";
  }
  getPrice(){
    this.designRadio = 100;
    
  }
  
}
