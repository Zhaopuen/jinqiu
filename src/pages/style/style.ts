import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the StylePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'style',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-style',
  templateUrl: 'style.html',
})
export class StylePage {
  @Input() nickname: any;
  type='';
  area='';
  style='';
  typeId='';
  styleId='';
  items=['一居室','二居室','三居室','四居室','别墅'];
  itemStyle=['现代风格','地中海风格','欧式风格','美式风格','中式风格'];
  threeImgList = [];
  nothreeImgList=false;
  threeImgListArticle = [];
  testLikeStyleImg=[];
  itemImgNum=0;
  testLikeStyleImgLength=0;
  itemImgFirst=[];
  itemImgSecond=[];
  typeClick=-1;
  styleClick=-1;
  displayClick:any = 0
  displayClick3D:any = 0
  checked=false;
  radio:any = -1;
  selectlist = [];
  showImgList = [];
  showImgNum = 0;
  Button = '下一步';
  submit = true;
  submitT = false;
  bottonList= ['现代风格','地中海风格','欧式风格','美式风格','中式风格'];
  ButtonClickNum = 0;
  buttonImgList=['../../assets/imgs/fir01.jpg','../../assets/imgs/fir02.jpg','../../assets/imgs/fir03.jpg','../../assets/imgs/fir04.jpg','../../assets/imgs/fir05.jpg','../../assets/imgs/fir06.jpg'];
  planeStyleList=['现代风格','地中海风格','欧式风格','美式风格','中式风格'];
  planeAreaList=['电视背景墙','沙发背景墙','玄关背景墙','客厅餐厅','主卧室'];
  planeStyle='';
  planeArea = '';
  planeStyleClick = -1;
  planeAreaClick = -1;
  planeContentImgList=['../../assets/imgs/plane.jpg','../../assets/imgs/plane.jpg','../../assets/imgs/plane.jpg','../../assets/imgs/plane.jpg'];
  styleAboutArticleF:any = {};
  showBigImgNum = 0;
  showBigImgSrc = '';
  threedInfo = null;
  disId = "";
  distypeId = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    this.threeGetData();
    // 3d全景图集请求筛选数据
    this.cp.getData("photo_category/cates/id/1", {
    }).then((n:any) => {
     this.items = (n[0].children);
     this.itemStyle = (n[1].children);
    })
    // 猜你喜欢请求数据
    this.cp.getData("photo_category/getlist/parent_id/10/photo/1", {}).then((n:any) => {
      this.testLikeStyleImg = n.data;
      this.testLikeStyleImgLength = n.data.length;
      this.itemImgFirst = n.data[0].photos;
    });

    // 平面效果图集请求数据
    this.planeGetData();
    this.cp.getData("photo_category/cates/id/1", {}).then((n:any) => {
     this.planeStyleList = (n[0].children);
     this.planeAreaList = (n[1].children);
    })
    //风格介绍
    this.styleAboutGetData();
    this.buttonStyleAbout(this.ButtonClickNum);
    // 测试你喜欢的风格
    this.cp.getData("photo_category/getlist/parent_id/10/photo/1", {}).then((n:any) => {
      this.testLikeStyleImg = n.data;
      this.testLikeStyleImgLength = n.data.length;
      this.itemImgFirst = n.data[0].photos;
    });
  }
// 3D全景图集
  zstyle: string ="3D";
  typeStyle($event,name,id,index){
    this.type = name;
    this.typeId = id;
    this.typeClick = index;
  }
  clickStyle($event,name,id,index){
    this.style = name;
    this.styleId = id;
    this.styleClick = index;
  }
  modelBlock3D(){
    this.displayClick3D = !this.displayClick3D;
  }
  modelNone3D(){
    this.displayClick3D = 0;
    let a = this.typeId;
    var d = this.distypeId;
    this.cp.getData("photo_cate/getlist?pc_id=1,"+a+','+d , {}).then((n:any) => {
      if( n.data.length <= 0){
        this.nothreeImgList = true;
        return
      }
      this.threeImgList = []
      for(let i = 0;i< n.data.length ; i++){
        var item = {photo:{ name:'',prc_url:'',extra_arr:{} } }
        item.photo.name = n.data[0].name;
        item.photo.prc_url = n.data[0].pic_url;
        item.photo.extra_arr = n.data[0].extra_arr;
        this.threeImgList.push(item);
        console.log(this.threeImgList,'3d全景图集筛选数据遍历取数据')
      }
      console.log(this.threeImgList,'3d全景图集筛选数据遍历取数据222222')
    })
  }
  // 平面效果图集
  modelBlock(){
    this.displayClick = !this.displayClick;
  }
  modelNone(){
    this.displayClick = 0;
    let a = this.typeId;
    var d = this.distypeId;
    this.cp.getData("photo_cate/getlist?id=2,"+a+','+d , {}).then((n:any) => {
      this.threeImgListArticle = n.data;
    })
  }
  // 猜你喜欢
  listLike($event, item,index){
    this.radio = index
  }
  toNext(){
    this.itemImgNum += 1;
    if(this.itemImgNum <= this.testLikeStyleImgLength-1){
      let obj = {name:'',pic:''}
      obj.name = this.itemImgFirst[this.radio].name;
      obj.pic = this.itemImgFirst[this.radio].pic_url;
      this.itemImgSecond.push(obj);
      this.cp.getData("photo_category/getlist/parent_id/10/photo/1", {}).then((n:any) => {
        this.itemImgFirst = n.data[this.itemImgNum].photos;
      })
      this.radio = -1;
    }else{
      let obj1 = {name:'',pic:''};
      obj1.name = this.itemImgFirst[this.radio].name;
      obj1.pic = this.itemImgFirst[this.radio].pic_url;
      this.itemImgSecond.push(obj1);
      console.log(this.itemImgSecond);
      this.itemImgFirst = this.itemImgSecond;
      this.Button = '提交';
      this.submitT = true;
      this.submit = false;
    }

  }

  showBigImgBlock(item){
    this.showBigImgNum = 1;
    this.showBigImgSrc = item;
  }
  showBigImgNone(){
    this.showBigImgNum = 0;
  }
  // 风格介绍
  buttonStyleAbout(index){
    this.ButtonClickNum = index;
    let a = index + 6;
    this.cp.getData("article/detail", {id:a}).then((n:any) => {
      this.styleAboutArticleF = n;
    })
  }
  // 平面效果图集
  planetypeStyle($event, item,index){
    this.planeStyle = item;
    this.planeStyleClick = index;
  }
  planeclickStyle($event, item,index){
    this.planeArea = item;
    this.planeAreaClick = index;
  }

  // 3D全景图集数据请求
  threeGetData(){
    this.cp.getData("photo_cate/getlist", {pc_id:1}).then((n:any) => {
      this.threeImgList = n.data;
      console.log(n.data[0].photo.extra_arr['全景链接'],'3dcccccccccc')
     })
  }
  // 平面效果图集
  planeGetData(){
    this.cp.getData("photo_cate/getlist", {pc_id:8}).then((n:any) => {
      this.planeContentImgList = n.data;
    })
  }
  // 风格介绍
  styleAboutGetData(){
    this.cp.getData("article/detail", {id:6}).then((n:any) => {
      this.styleAboutArticleF = n;
    })
  }

  // 3d全景图浏览数
  viewCount(id){
    this.cp.getData("photo/view",{
      id: id
    }).then((n:any) => {
      console.log(22222)
      console.log(n,'oooooooo')
    })
  }
}
