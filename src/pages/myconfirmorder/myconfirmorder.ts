import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the MyconfirmorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'myconfirmorder',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-myconfirmorder',
  templateUrl: 'myconfirmorder.html',
})
export class MyconfirmorderPage {
  ids: any = [];
  province: any = "";
  city: any = "";
  district: any = "";
  address: any = "";
  mobile: any = "";
  tel: any = "";
  name: any = "";
  list: any = [];
  brandList: any = [];
  otherList: any = [];
  total: any = [];
  showMe: any = false;
  addressId: any = "";
  totalPrice: any = 0;
  returnPrice: any = 0;
  returnIds: any = [];
  payType: any = [
    {
      id: 0,
      pic: "../../assets/imgs/pay1.png",
      title: "支付宝",
      checkImg: "../../assets/imgs/check.png",
      checkedImg: "../../assets/imgs/checked1.png"
    },
    {
      id: 1,
      pic: "../../assets/imgs/pay2.png",
      title: "微信支付",
      checkImg: "../../assets/imgs/check.png",
      checkedImg: "../../assets/imgs/checked1.png"
    },
    /*{id:2,pic:"../../assets/imgs/pay3.png",title:"银行卡支付",checkImg:"../../assets/imgs/check.png",checkedImg:"../../assets/imgs/checked1.png"},*/
  ];
  //是否开具发票
  isReceipt: any = false;
  defaultReceipt: any = "";

  payId: any = 0;
  brandVal: any = {};
  otherVal: any = {};
  showMask: any = false;
  codeImg: any = "";
  timer: any = null;
  goods: any = {};
  //待支付订单
  bePaidId:any = "";
  brandList1:any = [];
  showReceipt:any = false;
  //house_id
  houseId1:any = {};
  houseId2:any = {};

  addressInfo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
    this.ids = navParams.get("ids");
    this.totalPrice = navParams.get("total");
    this.bePaidId = navParams.get("payId");
  }

  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded => {
      if (loaded) {
        //从购物车跳转过获取列表
        if(this.ids){
          this.cp.getData("cart/getlist", {ids: this.ids}).then((res: any) => {
          console.log("toBePaid", res);
          let allList = res.data;
          let list = [];
          for (let key in allList) {
            if (key[0] == "1") {
              let brand = allList[key];
              let every = 0;
              let group1 = [];
              for (let item of brand) {
                item.total = item.num * item.goods.now_price;
                list.push(item);
                let typeArr = [];
                for (let i in item.props_value_arr) {
                  typeArr.push(item.props_value_arr[i]);
                }
                item.typeArr = typeArr;
                item.checked = false;
                every += item.total;
                group1.push({id: item.goods.id, num: item.num, props_value: item.props_value_arr,type:item.type,staff_user_id:item.staff_user_id});
              }
              this.total.push(every);        //商品价格
              this.brandList.push(brand);    //商品列表
              this.brandVal[key] = "";       //商品留言
              this.goods[key] = group1;      //提交订单时所需的数据
              this.houseId1[key] = 0;
            } else {
              let others = allList[key];
              let group2 = [];
              for (let item of others) {
                list.push(item);
                let typeArr = [];
                for (let i in item.props_value_arr) {
                  typeArr.push(item.props_value_arr[i]);
                }
                item.typeArr = typeArr;
                item.checked = false;
                item.total = typeArr[0] * typeArr[1];
                group2.push({id: item.goods.id, num: item.num, props_value: item.props_value_arr,type:item.type,staff_user_id:item.staff_user_id});
              }
              this.otherList.push(others);   //其他列表
              this.otherVal[key] = "";       //订单留言
              this.goods[key] = group2;      //提交订单时所需的数据
              this.houseId2[key] = others[0].house_id
            }
          }
          this.list = list;
          //console.log(this.types,this.su_ids)
        });
        }
        //从支付页面跳转过来获取列表
        if(this.bePaidId){
          this.cp.getData("order/getlist",{subject_id:1,id:this.bePaidId}).then((res:any)=>{
            console.log(res,"pay");
            let time = "";
            for(let item of res.data){
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
            this.brandList1 = res.data;
            this.showReceipt = true;
          })
        }
        //获取默认收货地址
        let aid;
        if(this.cp.u.user_profile.ua_id){
           aid = this.cp.u.user_profile.ua_id;
        }
        this.cp.getData("user_address/getlist", {id: aid}).then((res: any) => {
          console.log("address", res);
          if(res.data.length>0){
            this.addressInfo = res.data;
            let addressInfo = res.data[0];
            this.province = addressInfo.region_province.region_name;
            this.city = addressInfo.region_city.region_name;
            this.district = addressInfo.region_district.region_name;
            this.address = addressInfo.address;
            this.mobile = addressInfo.mobile;
            this.tel = addressInfo.tel;
            this.name = addressInfo.consignee;
            this.addressId = addressInfo.id;
          }
        });
        //获取默认发票抬头
        let defaultId = this.cp.u.user_profile.invoice_id;
        this.cp.getData("Invoice/getlist", {id: defaultId}).then((res: any) => {
          console.log(res, "默认发票");
          this.defaultReceipt = res.data[0];
        })
      }
    })
  }

  changePayType(id) {
    this.payId = id;
  }

  //开具发票
  chooseReceipt() {
    this.isReceipt = !this.isReceipt;
  }

  //隐藏二维码
  hideMask() {
    this.showMask = false;
    clearInterval(this.timer);
  }
  //生成订单
  orderPay() {
    let invoiceId = "";
    if (this.isReceipt) {
      invoiceId = this.defaultReceipt.id;
    } else {
      invoiceId = "";
    }
    let remark = {};
    for (let i in this.brandVal) {
      remark[i] = this.brandVal[i];
    }
    for (let i in this.otherVal) {
      remark[i] = this.otherVal[i];
    }
    let house_id = {};
    for (let i in this.houseId1) {
      house_id[i] = this.houseId1[i];
    }
    for (let i in this.houseId2) {
      house_id[i] = this.houseId2[i];
    }
    console.log(house_id);
    this.cp.getData("order_goods/add", {
      orders: this.goods,
      address_id: this.addressId,
      invoice_id: invoiceId,
      remark: remark,
      house_id:house_id
    }).then((res: any) => {
      if (res.status == 1) {
        let return_url = 'http://jinqiu.fengsh.cn/mobile/index.html#/myorder/';
        let price = res.data.price;
        let ids = res.data.order_ids;
        this.returnPrice = price;
        this.returnIds = ids;
        this.cp.getData("order/pay", {
          ids: res.data.order_ids,
          id: 5,
          address_id: this.addressId,
          invoice_id: invoiceId,
          type: "aduer",
          gateway: this.cp.isWechat() ? "Aduer_Wechat" : "Aduer_Native",
          // price:this.totalPrice,
          return_url: return_url
        }).then((res: any) => {
          if (res.status) {
            if (this.cp.isWechat()) {
              location.href = res.data;
            } else {
              this.codeImg = res.data;
              this.showMask = true;
              this.timer = setInterval(() => {
                this.cp.getData('tradelist/check', {id: res.msg, silent: 1}).then((res: any) => {
                  if (res.msg) {
                    clearInterval(this.timer);
                    this.cp.goto({all:"2"},"myorder");
                  }
                })
              }, 1000);
            }
          } else {
            this.cp.toast("支付失败")
          }
        })
      }
    })
  }
  //从待支付页面跳转过来直接走支付
  toPay(){
    let invoiceId = "";
    if (this.isReceipt) {
      invoiceId = this.defaultReceipt.id;
    } else {
      invoiceId = "";
    }
    let ids:any = [];
    ids.push(this.bePaidId);
    let return_url = 'http://jinqiu.fengsh.cn/mobile/index.html#/myorder/';
    this.cp.getData("order/pay", {
      ids: ids,
      id: 5,
      address_id: this.addressId,
      invoice_id: invoiceId,
      type: "aduer",
      gateway: this.cp.isWechat() ? "Aduer_Wechat" : "Aduer_Native",
      return_url: return_url
    }).then((res: any) => {
      if (res.status) {
        if (this.cp.isWechat()) {
          location.href = res.data;
        } else {
          this.codeImg = res.data;
          this.showMask = true;
          this.timer = setInterval(() => {
            this.cp.getData('tradelist/check', {id: res.msg, silent: 1}).then((res: any) => {
              if (res.msg) {
                clearInterval(this.timer);
                // this.showMask = false;
                // window.location.href = return_url;
                this.cp.goto({all:2},"myorder");
              }
            })
          }, 1000);
        }
      } else {
        this.cp.toast("支付失败")
      }
    })
  }
}
