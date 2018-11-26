import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the MyreceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'myreceipt',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-myreceipt',
  templateUrl: 'myreceipt.html',
})
export class MyreceiptPage {
  showLeft:any = true;
  showRight:any = false;
  alreadyList:any = [];
  infoList:any = [];
  aid:any = 0;
  default:any = 0;
  timer:any = null;
  //分页信息
  loading:any = true;
  showTip:any = false;
  p:any = 1;
  perPage:any = 10;
  totalPage:any = 0;
  nickname = "";
  pageTimer:any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
  }
  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded=>{
      this.nickname = this.cp.u.nickname;
      if(loaded) {
        //获取已开发票
        this.getInvoice(this.p,this.perPage);
        //获取开票信息
        this.cp.getData("Invoice/getlist").then((res:any)=>{
          console.log(res);
          this.infoList = res.data;
        });
        //获取默认抬头
         //console.log(this.cp.u);
        this.default = this.cp.u.user_profile.invoice_id;
      }
    })
  }
  //获取已开发票
  getInvoice(page,perPage){
    this.cp.getData("Order/getlist",{invoice_status:-2,p:page,numPerPage:perPage}).then((res:any)=>{
      console.log(res);
      this.totalPage = Math.ceil(res.total/this.perPage);
      for(let item of res.data){
        let time = item.create_time.slice(0,16);
        item.time = time;
      }
      let nowList = this.alreadyList;
      let addList = res.data;
      nowList = nowList.concat(addList);
      this.alreadyList = nowList;
    });
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.p<this.totalPage){
      this.p++;
      this.pageTimer = setTimeout(() => {
        this.getInvoice(this.p,this.perPage);
        infiniteScroll.complete();
      }, 500);
    }else{
      this.loading = false;
      this.showTip = true;
    }
  }
  changeLeft(){
    if(this.showLeft==false){
      this.showLeft = true;
      this.showRight = false;
    }
    this.getInvoice(this.p,this.perPage);
  }
  changeRight(){
    if(this.showRight==false){
      this.showRight = true;
      this.showLeft = false;
    }
    //获取开票信息
    this.cp.getData("Invoice/getlist").then((res:any)=>{
      console.log(res,"开票信息");
      this.infoList = res.data;
    });
    //获取默认抬头
    console.log(this.cp.u,"userInfo");
    this.default = this.cp.u.user_profile.invoice_id;
    console.log(this.default)
  }
  //设置默认抬头
  setDefTit(id){
    this.aid = id;
    let userInfo = this.cp.u;
    userInfo.user_profile.invoice_id = id;
    this.cp.setU(userInfo);
  }
  //删除开票信息
  deleteRep(id){
    this.cp.prompt("删除","确认删除当前开票信息吗","取消",()=>{},"确定",()=>{
      this.cp.getData("invoice/delete",{id:id}).then((res:any)=>{
        console.log(res);
        if(res.msg=="移收到回收站成功"){
          this.cp.toast("删除成功");
          // this.changeRight();
          this.timer = setTimeout(()=>{
            //this.cp.pop();
          },2000);
        }
      })
    })
  }
  //页面离开时清除timer
  ionViewDidLeave(){
    clearTimeout(this.timer);
    clearTimeout(this.pageTimer);
  }

}
