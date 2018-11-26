import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,InfiniteScroll,Content } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";


@Component({
  selector: 'page-decorationmall',
  templateUrl: 'decorationmall.html',
})
@IonicPage({
  priority: 'off',
  name : 'decorationmall',
  defaultHistory : ['tabs']
})
export class DecorationmallPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider,
    public toastCtrl: ToastController,
  ) {
  }
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;
  page = 0;
  res:any = [];
  params: any = {};
  infiniteScrollState = !0;
  sizes = 10;
  typeClick = 0;
  type = "yijishu";
  isShow = false;
  isShowtwo = false;
  isShowthree = false;
  classStyle = 1;
  typeClickT = 100;
  orderStyle=2;
  buttonStyle = false;
  mallListData = [];
  inputVal = "";
  dataArray = [];
  isFlags = false;
  mallClassData = [];
  mallClassDataone = [];
  mallClassDataTwo = [];
  mallClassDataThree = [];
  mallClassDataFour = [];
  colorShow = false;
  screenData = [];
  classData = [];
  mallClasstitle = [];
  malladdShopInfo = false;
  addShopInfo = null;
  addShopClassInfo = {};
  addShopRightInfo = null;
  addShopRightpicInfo = null;
  addShopSizeInfo = null;
  addShopMaterialInfo = null;
  mallNum = 1;
  mallColor = "白色";
  mallColorClick = -1;
  mallColorPic = 1;
  mallSize = '尺寸1';
  mallSizeClick = -1;
  selectColorImg = 0;
  mallMaterial = "材质1";
  mallMaterialClick = -1;
  isbuyShow = false;
  color = '';
  size = '';
  material = '';
  mallRightname = "";
  mallSizename = "";
  mallMaterialname = "";
  mallValue = [];
  chooseAttr = []; //选择的商品参数名
  chooseAttrIndex = []; //选择的商品参数index
 //分类筛选的字段
  classification = [];
  attrId = [];
  pet:string = "promotionmall";
  nickname:any = "";
  // 点击切换颜色
  typeStyle($event,items,index){
    this.type = items;
    this.typeClick = index;
  }

  orderClick($event,item,index){
    this.type = item;
    this.orderStyle = index;
  }
  // 选择商品属性
  choseStyle(name, val, arrIndex) {
    console.log(name,val,arrIndex,'22222')
    this.attrId[name] = val;
    this.chooseAttr[name] = name;
    this.chooseAttrIndex[name] = arrIndex;
  }
  // 分类筛选显示隐藏
  showClick(){
    this.isShow = !this.isShow;
    this.isShowtwo = false;
    this.isShowthree = false;
  }

  // 分类筛选点击切换颜色
  aClick(i,j){
    this.classification[i].children.forEach(function(item,index){
      item.isShow = false;   //分类下面的isShow都为false
    })
    this.classification[i].children[j].isShow = true;  //选中的为true
  }

  showClicktwo(){
    this.isShowtwo =  !this.isShowtwo;
    this.isShow = false;
    this.isShowthree = false;
  }
  showClickthree(){
    this.isShowthree = !this.isShowthree;
    this.isShow = false;
    this.isShowtwo = false;
  }

  // 加入购物车
  rightBuy(id){
    this.cp.checkLogin2().then(loaded=>{
      if(loaded) {
        this.isbuyShow = !this.isbuyShow;
        this.cp.getData("goods/getlist", {
          id:id
        }).then((n:any) => {
          let malls = n.data[0].props_arr;
          console.log(n.data[0].props_arr)
          let proArr = [];
          for (var i in malls) {
            proArr.push(malls[i]);
            this.chooseAttr[this.chooseAttr.length] = this.chooseAttr.length;
            this.chooseAttrIndex[this.chooseAttrIndex.length] = 0;
            this.attrId[this.attrId.length] = malls[i].value[0].id;
          }
          this.mallValue = proArr;

          console.log(this.mallValue,'这是列表的mallList')
          this.addShopInfo = n.data[0];
          this.addShopClassInfo = n.data[0].attrs_arr;
          this.addShopRightInfo = n.data[0].props_arr[0].value;
          this.addShopRightpicInfo = n.data[0].props_arr[0].pic_url;
          this.addShopSizeInfo = n.data[0].props_arr[2].value;
          this.addShopMaterialInfo = n.data[0].props_arr[1].value;
          this.mallRightname = n.data[0].props_arr[0].name;
          this.mallMaterialname = n.data[0].props_arr[1].name;
          this.mallSizename = n.data[0].props_arr[2].name;
        })
      }
    })
  }

  // 关闭加入购物车弹窗
  closerightBuy(){
    this.isbuyShow = false;
  }

  // 点击确定加入购物车
  addShopping(id){
    let props = {"颜色":this.color,"尺寸":this.size,"材质":this.material};
    if(!this.color || !this.size || !this.material){
      const toast = this.toastCtrl.create({
        message: '请选择商品属性',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return
    }
    this.cp.getData("cart/add",{
      goods_id:id,
      props_value:props,
      num:this.mallNum
    }).then((n:any) => {
      if(n.msg=="添加成功"){
        this.isbuyShow = false;
        const toast = this.toastCtrl.create({
          message: '成功加入购物车',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.cp.goto({view:'mycart'})
      }
    })
  }

  // 加入购物车
  addShopClick(){
    this.malladdShopInfo = !this.malladdShopInfo;
  }

    // 立即购买选择颜色
    mallColorStyle($event, item,index){
      console.log(item,'888888')
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

  // 综合排序
  orderData = [
    {order:'按销量优先'},
    {order:'价格由低到高'},
    {order:'按信用评价'},
    {order:'价格由高到低'}
  ]

  i: Number = 0;
  name = "";

  ionViewDidLoad() {
    this.nickname = this.cp.u.nickname;
    this.mallClass();
    //条件筛选的点击切换颜色
    var lists = [];
    let classDataText = [
        {class:'卫浴',classdetailData : [
          {id:'1',name:'坐便器',},
          {id:'2',name:'男士小便器',},
          {id:'3',name:'浴室柜',},
          {id:'5',name:'浴缸',},
          {id:'4',name:'花洒',},
        ]},
        {class:'灯具',classdetailData : [
          {id:'1', name:'坐便器',},
          {id:'2',name:'男士小便器',},
          {id:'3',name:'浴室柜',},
          {id:'5',name:'浴缸',},
          {id:'4', name:'花洒',},
        ]}
    ];

    classDataText.forEach(function(item,index){
        var listText = []
        item.classdetailData.forEach(function(itemText,indexText){
            listText.push({
                id:itemText.id,
                name:itemText.name,
                isShowtwo: false
            })
        })
        lists.push({
            class:item.class,
            classdetailData:listText
        })
    })
    this.classData = lists
  }

  // 条件分类点击变色
  classClicks(i,j){
    this.classData[i].classdetailData.forEach(function(item,itemIndex){
      item.isShowtwo = false;
    })
    this.classData[i].classdetailData[j].isShowtwo = true;
  }

  //商品分类 装修主材 成品家具
  mallClass(){
    this.cp.getData("goods_category/cates", {

    }).then((n:any) => {
      let list = [];
      n.forEach(function(item,index){
        let listChildren = [];
        item.children.forEach(function(itemIndex,index){
          let listChildrenChildren = [];
          itemIndex.children.forEach(function(itemChildren,indexChildren){
            listChildrenChildren.push({
              buy_guide:itemChildren.buy_guide,
              children:itemChildren.children,
              id:itemChildren.id,
              name:itemChildren.name,
              parent_id:itemChildren.parent_id,
              sort:itemChildren.sort,
              status:itemChildren.status,
              isShow:false
            })
          })
          listChildren.push({
            buy_guide:itemIndex.buy_guide,
            children:listChildrenChildren,
            id:itemIndex.id,
            name:itemIndex.name,
            parent_id:itemIndex.parent_id,
            sort:itemIndex.sort,
            status:itemIndex.status,
          })
        })
        list.push({
          status:item.status,
          id: item.id,
          name:item.name,
          parent_id:item.parent_id,
          sort:item.sort,
          buy_guide:item.buy_guide,
          children:listChildren,
          isSelect:false,       //这里是让颜色选择颜色的
        })
      })
      this.mallClasstitle = list;
      this.mallClasstitle[0].isSelect = true;    //让第一个颜色选择
      this.classification = this.mallClasstitle[0].children;   //让第一个分类筛选
      let id = this.mallClasstitle[0].id;
      this.getData(id);
    })
  }

  //促销商品列表
  mallList(i){
    this.mallClasstitle.forEach(function(item,index){
      item.isSelect = false;    //这里是点击标题让isSelect=false
    })
    this.mallClasstitle[i].isSelect = true;  //当前按钮显示颜色
    let id = this.mallClasstitle[i].id;
    this.classification = this.mallClasstitle[i].children;   //这里是让分类筛选变换
    this.getData(id);
  }

  getData(id){
    this.cp.getData("goods/getlist", {
      gc_id:id
    }).then((n:any) => {
      this.mallListData = n.data;
      this.mallClassDataone = n.data;
      this.mallClassDataTwo = n.data;
      this.mallClassDataThree = n.data;
      this.mallClassDataFour = n.data;
    })
  }

  // 筛选商品列表
  mallSelected(){
    this.isShow = false;
    this.cp.getData("goods/getlist",{

    }).then((n:any) => {
        console.log(n.data)
        // this.mallListData = n.data;
    })

  }

  //促销商品搜索
  mallSearch(){
    this.cp.getData("goods/getlist", {
      title:this.inputVal,
    }).then((n:any) => {
      this.mallListData = n.data;
      this.mallClassDataone = n.data;
      this.mallClassDataTwo = n.data;
      this.mallClassDataThree = n.data;
      this.mallClassDataFour = n.data;
    })
  }

  // 上拉加载
  // doInfinite() {
  //   this.params = {
  //     p: ++this.page,
  //     numPerPage: this.sizes,
  //   }
  //   this.cp.getData("user/getlist?type=2", this.params).then((e: any) => {
  //     if (e.data.length > 0) {
  //       this.res = e;
  //       this.workerListData = this.workerListData.concat(this.res.data);
  //       this.infiniteScroll.complete();
  //       if (this.workerListData.length == this.res.total) {
  //         this.infiniteScrollState = !1;
  //         this.infiniteScroll.enable(this.infiniteScrollState);
  //       }else {
  //         this.infiniteScrollState = !0;
  //         this.infiniteScroll.enable(this.infiniteScrollState);
  //       }
  //     } else {
  //       this.infiniteScrollState = !1;
  //       this.infiniteScroll.enable(this.infiniteScrollState);
  //     }
  //   })
  // }

}
