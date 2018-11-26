import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, InfiniteScroll} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the MyorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'myorder',
  segment: 'myorder/:status',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  titleList = [
    {name: "购物订单", value: "0", sid: "1"},
    {name: "设计订单", value: "1", sid: "3"},
    {name: "施工订单", value: "2", sid: "4"},
    {name: "精装套餐订单", value: "3", sid: "2"}
  ];
  order: any = "0";
  all: any = "0";
  brandList: any = [];
  brandList1: any = [];
  brandList2: any = [];
  brandList3: any = [];
  brandList4: any = [];
  brandList5: any = [];
  otherList: any = [];
  nickname: any = "";
  timer: any = null;
  params: any = {};
  paramsArr: any = [
    {subject_id: 1},
    {subject_id: 1, status: 0, pay_status: 0, shipping_status: 0},
    {subject_id: 1, status: 1, pay_status: 1, shipping_status: 0},
    {subject_id: 1, status: 1, pay_status: 1, shipping_status: 1},
    // {subject_id:1,status:1,pay_status:1,shipping_status:2},
    {subject_id: 1, status: 4}
  ];
  page: any = 1;
  page0: any = 1;
  page1: any = 1;
  page2: any = 1;
  page3: any = 1;
  page4: any = 1;
  totalPage: any = 1;
  nowOrderType: any = 0;
  //设计、施工、套餐按钮文字
  btnVal:any = "确认并完成评价"
  showTxt:any = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
    /*let status = parseInt(navParams.get('status'));
    Object.assign(this.params, this.paramsArr[status ? status : 0])*/
    this.all = this.navParams.get('all') || '0';
  }

  ionViewDidLoad() {
    this.cp.checkLogin2().then(loaded => {
      if (loaded) {
        if(this.all=="2"){
          this.getProducts(2);
        }else{
          this.getProducts(0);
        }
        this.nickname = this.cp.u.nickname;
      }
    })
  }

  /*changeSeg() {
    Object.assign(this.params, this.paramsArr[this.all]);
    0 == this.page[this.all] && this.doInfinite(),
      this.infiniteScroll.enable(this.infiniteScrollState[this.all])
  }*/
  /*doInfinite() {
    this.params.p = ++this.page[this.all];
    this.cp.getData("order/getlist", this.params).then((t:any) => {
      let time = "";
      for(let item of t.data){
        time = item.create_time.slice(0,16);
        item.time = time;
        for(let ol of item.order_goods){
          let typeList = [];
          let types = ol.props_value_arr;
          for(let i in types){
            typeList.push(types[i]);
          }
          ol.typeArr = typeList;
        }
      }
      this.brandList[this.all] = this.brandList[this.all].concat(t.data),
        this.infiniteScroll.complete(),
      Math.ceil(t.total / t.per_page) <= this.page[this.all] && (this.infiniteScrollState[this.all] = !1, this.infiniteScroll.enable(this.infiniteScrollState[this.all]))
    })
  }*/

  //获取商品列表
  getProducts(index) {
    let params: any = {};
    if (index == 0) {
      // params = {p:this.page0};
      this.nowOrderType = 0;
    } else if (index == 1) {
      // params = {p:this.page1};
      this.nowOrderType = 1;
    } else if (index == 2) {
      // params = {p:this.page2};
      this.nowOrderType = 2;
    } else if (index == 3) {
      // params = {p:this.page3};
      this.nowOrderType = 3;
    } else if (index == 4) {
      // params = {p:this.page4};
      this.nowOrderType = 4;
    }
    this.page = 1;
    params = {p: this.page};
    Object.assign(params, this.paramsArr[index]);
    this.cp.getData("order/getlist", params).then((res: any) => {
      let time = "";
      for (let item of res.data) {
        time = item.create_time.slice(0, 16);
        item.time = time;
        for (let ol of item.order_goods) {
          let typeList = [];
          let types = ol.props_value_arr;
          for (let i in types) {
            typeList.push(types[i]);
          }
          ol.typeArr = typeList;
        }
      }
      this.totalPage = Math.ceil(res.total / res.per_page);
      this.brandList = res.data
      /*if(index==0){
        this.brandList1 = res.data;
      }else if(index==1){
        this.brandList2 = res.data;
      }else if(index==2){
        this.brandList3 = res.data;
      }else if(index==3){
        this.brandList4 = res.data;
      }else if(index==4){
        this.brandList5 = res.data;
      }*/
    })
  }

  getMore(index) {
    let params: any = {};

    Object.assign(params, this.paramsArr[index]);
    this.cp.getData("order/getlist", params).then((res: any) => {
      let time = "";
      for (let item of res.data) {
        time = item.create_time.slice(0, 16);
        item.time = time;
        for (let ol of item.order_goods) {
          let typeList = [];
          let types = ol.props_value_arr;
          for (let i in types) {
            typeList.push(types[i]);
          }
          ol.typeArr = typeList;
        }
      }
      this.brandList = this.brandList.concat(res.data);
      /*if(index==0){
        this.brandList1 = this.brandList1.concat(res.data);
      }else if(index==1){
        this.brandList2 = this.brandList2.concat(res.data);
      }else if(index==2){
        this.brandList3 = this.brandList3.concat(res.data);
      }else if(index==3){
        this.brandList4 = this.brandList4.concat(res.data);
      }else if(index==4){
        this.brandList5 = this.brandList5.concat(res.data);
      }*/
    })
  }

  //上拉加载
  doInfinite(infiniteScroll) {
    if (this.nowOrderType == 0) {
      /*if(this.page0<this.totalPage){
        this.page0++;
        this.getProducts(0);
      }*/
      if (this.page < this.totalPage) {
        this.page++;
        this.getMore(0);
      }
    } else if (this.nowOrderType == 1) {
      /*if(this.page1<this.totalPage){
        this.page1++;
        this.getProducts(1);
      }*/
      if (this.page < this.totalPage) {
        this.page++;
        this.getMore(1);
      }
    } else if (this.nowOrderType == 2) {
      /*if(this.page2<this.totalPage){
        this.page2++;
        this.getProducts(2);
      }*/
      if (this.page < this.totalPage) {
        this.page++;
        this.getMore(2);
      }
    } else if (this.nowOrderType == 3) {
      /*if(this.page3<this.totalPage){
        this.page3++;
        this.getProducts(3);
      }*/
      if (this.page < this.totalPage) {
        this.page++;
        this.getMore(3);
      }
    } else if (this.nowOrderType == 4) {
      /*if(this.page4<this.totalPage){
        this.page4++;
        this.getProducts(4);
      }*/
      if (this.page < this.totalPage) {
        this.page++;
        this.getMore(4);
      }
    }
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

  //获取设计、施工、精装套餐订单列表
  getOthers(sid) {
    this.cp.getData("order/getlist", {subject_id: sid}).then((res: any) => {
      console.log(res.data, 'design');
      let time = "";
      for (let item of res.data) {
        time = item.create_time.slice(0, 16);
        item.time = time;
        for (let ol of item.order_goods) {
          let typeList = [];
          let types = ol.props_value_arr;
          for (let i in types) {
            typeList.push(types[i]);
          }
          ol.typeArr = typeList;
        }
      }
      this.otherList = res.data;
    })
  }

  //退款
  refund(order_id) {
    this.cp.prompt(
      "友情提示",
      "确定要退款吗",
      "取消",
      () => {
      },
      "确定",
      () => {
        this.cp.getData("order_return/add", {order_id: order_id, type: 0}).then((res: any) => {
          //console.log(res);
          if (res.msg == "添加成功") {
            this.cp.toast("退款成功，如有疑问可联系客服");
            for (let i in this.brandList) {
              if (this.brandList[i].id == order_id) {
                this.brandList.splice(i, 1)
              }
            }
          } else {
            this.cp.toast(res.msg)
          }
        })
      }
    )
  };

  //退货退款
  returnGoods(order_id) {
    this.cp.prompt(
      "友情提示",
      "确定要退货退款吗",
      "取消",
      () => {
      },
      "确定",
      () => {
        this.cp.getData("order_return/add", {order_id: order_id, type: 2}).then((res: any) => {
          //console.log(res,"退货退款");
          if (res.msg == "添加成功") {
            this.cp.toast("退货退款成功，如有疑问可联系客服");
            for (let i in this.brandList) {
              if (this.brandList[i].id == order_id) {
                this.brandList.splice(i, 1)
              }
            }
          } else {
            this.cp.toast(res.msg)
          }
        })
      }
    )
  };

  //确认收货
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
            if(sid==1){
              this.cp.toast("收货成功");
              this.all = "4";
              this.getProducts(4)
            }else{
              this.btnVal = "待评价";
              this.showTxt = 2;
              this.cp.goto({id:order_id,subject_id:sid},"myevaluate");
            }
          } else {
            this.cp.toast(res.msg)
          }
        })
      }
    )
  };
  //取消订单
  cancelOrder(id) {
    this.cp.prompt("取消订单", "确定取消当前订单吗", "取消", () => {
    }, "确定", () => {
      this.cp.getData("order/edit", {id: id, status: 3}).then((res: any) => {
        console.log(res);
        if (res.msg == "编辑成功") {
          this.cp.toast("订单已取消");
          for (let i in this.brandList) {
            if (this.brandList[i].id == id) {
              this.brandList.splice(i, 1)
            }
          }
        } else {
          this.cp.toast(res.msg)
        }
      })
    })
  }

  //立即付款
  pay(id) {
    this.cp.goto({payId: id}, "myconfirmorder")
  }

  //跳转到个人中心
  toMyInfo() {
    if (this.cp.u) {
      if (this.cp.u.type == 0) {
        this.cp.goto({view: "personal"})
      } else if (this.cp.u.type == 1) {
        this.cp.goto({view: "sjpersonalcenter"})
      } else if (this.cp.u.type == 2) {
        this.cp.goto({view: "workuser"})
      }
    } else {
      this.cp.goto({view: "login"})
    }
  }
}
