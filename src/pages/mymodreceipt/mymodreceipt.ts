import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common"

/**
 * Generated class for the MymodreceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'mymodreceipt',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-mymodreceipt',
  templateUrl: 'mymodreceipt.html',
})
export class MymodreceiptPage {
  showOne:any = true;
  showTwo:any = false;
  showPart1:any = false;
  showPart2:any = false;
  pageType:any = 0;
  type:any = 0;
  invoiceType:any = "";
  repTitle:any = "";
  repAddr:any = "";
  repNum:any = "";
  compAddr:any = "";
  tel:any = "";
  bank:any = "";
  account:any = "";
  aid:any = "";
  timer:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
    //console.log(this.navParams);
    this.pageType = this.navParams.get("genre");
    this.aid = this.navParams.get("aid");
  }
  //个人
  showPersonal(){
    this.showOne = true;
    this.showTwo = false;
    this.showPart1 = false;
    this.showPart2 = false;
    this.type = 0;
  }
  //企业
  showPublic(){
    this.showOne = false;
    this.showTwo = true;
    this.showPart1 = true;
    this.showPart2 = false;
    this.type = 1;
  }
  //增值税普通发票
  showNormal(){
    this.showOne = false;
    this.showTwo = true;
    this.showPart1 = true;
    this.showPart2 = false;
    this.invoiceType = 0;
  }
  //增值税专用发票
  showSpecial(){
    this.showOne = false;
    this.showTwo = true;
    this.showPart1 = false;
    this.showPart2 = true;
    this.invoiceType = 1;
  }
  ionViewDidLoad() {
    //获取修改发票信息
    if(this.aid>-1){
      this.cp.getData("Invoice/getlist",{id:this.aid}).then(res=>{
        console.log(res);
        let list = (res as any).data[0];
        if(list.type==0){
          this.showOne = true;
          this.showTwo = false;
          this.showPart1 = false;
          this.showPart2 = false;
          this.type = 0;
          this.repTitle = list.name;
          this.repAddr = list.address;
        }else{
          if(list.invoice_type==0){
            this.showOne = false;
            this.showTwo = true;
            this.showPart1 = true;
            this.showPart2 = false;
            this.invoiceType = 0;
            this.repTitle = list.name;
            this.repAddr = list.address;
            this.repNum = list.tax_number;
          }else{
            this.showOne = false;
            this.showTwo = true;
            this.showPart1 = false;
            this.showPart2 = true;
            this.invoiceType = 1;
            this.repTitle = list.name;
            this.repAddr = list.address;
            this.repNum = list.tax_number;
            this.compAddr = list.company_address;
            this.tel = list.tel;
            this.bank = list.corporation_deposit_bank;
            this.account = list.account_no;
          }
        }
      })
    }
  }
  //修改发票信息
  changeInfo(){

  }
  //添加开票信息
  addInfo(){
    if(this.type==0){
      if(this.repTitle==""){
        this.cp.toast("请填写发票抬头");
        return;
      }
      if(this.repAddr==""){
        this.cp.toast("请填写收票地址");
        return;
      }
    }else if(this.type==1){
      if(this.invoiceType==0){
        if(this.repTitle==""){
          this.cp.toast("请填写发票抬头");
          return;
        }
        if(this.repAddr==""){
          this.cp.toast("请填写收票地址");
          return;
        }
        if(this.repNum==""){
          this.cp.toast("请填写公司税号");
          return;
        }
      }else{
        if(this.repTitle==""){
          this.cp.toast("请填写发票抬头");
          return;
        }
        if(this.repAddr==""){
          this.cp.toast("请填写收票地址");
          return;
        }
        if(this.repNum==""){
          this.cp.toast("请填写公司税号");
          return;
        }
        if(this.compAddr==""){
          this.cp.toast("请填写公司地址");
          return;
        }
        if(this.tel==""){
          this.cp.toast("请填写公司电话");
          return;
        }
        if(this.bank==""){
          this.cp.toast("请填写开户银行");
          return;
        }
        if(this.account==""){
          this.cp.toast("请填写银行账号");
          return;
        }
      }
    }
    this.cp.getData("invoice/add",{
      type:this.type,
      name:this.repTitle,
      address:this.repAddr,
      invoice_type:this.invoiceType,
      tax_number:this.repNum,
      company_address:this.compAddr,
      tel:this.tel,
      corporation_deposit_bank:this.bank,
      account_no:this.account
    }).then(res=>{
      console.log(res);
      if((res as any).msg == "添加成功"){
        this.cp.toast((res as any).msg);
        this.timer = setTimeout(()=>{
          if(this.pageType==2){
            this.cp.pop();
          }
          this.cp.goto({view:"myreceipt"})
        },2000);
      }else{
        this.cp.toast((res as any).msg);
      }
    })
  }
  //页面离开时清除timer
  ionViewDidLeave(){
    clearTimeout(this.timer);
  }
}
