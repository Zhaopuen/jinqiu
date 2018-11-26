import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common"
/**
 * Generated class for the MyaddnewaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority:"off",
  name:"myaddnewaddress",
  defaultHistory:["tabs"]
})
@Component({
  selector: 'page-myaddnewaddress',
  templateUrl: 'myaddnewaddress.html',
})
export class MyaddnewaddressPage {
  uname:any = "";
  mobile:any = "";
  tel:any = "";
  province:any = "";
  city:any = "";
  district:any = "";
  addrDetails:any = "";
  //省市区
  provinces:any = [];
  cities:any = [];
  districts:any = [];
  defaultAdd:any = false;
  timer:any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded=>{
      if(loaded) {
        //获取省
        this.cp.getData("region/children/parent_id/1").then(res=>{
          //console.log(res);
          this.provinces = res;
        });
        console.log(this.cp.u)
      }
    })
  };
  //选择省
  chooseProvince(){
    let cid = this.province;
    this.getCity(cid)
  }
  //选择市
  chooseCity(){
    let did = this.city;
    this.getDistrict(did);
  }
  //获取市
  getCity(c){
    this.cp.getData("region/children",{parent_id:c}).then(res=>{
      //console.log(res);
      this.cities = res;
    })
  }
  //获取区
  getDistrict(d){
    this.cp.getData("region/children",{parent_id:d}).then(res=>{
      //console.log(res);
      this.districts = res;
    })
  }
  //设置默认地址
  setDefault(){
    if(this.defaultAdd){
      this.cp.getData("user_profile/edit").then(res=>{
        console.log(res);
      })
    }
  }
  //提交信息
  subAddress(){
    let phoneReg = /^1[34578][0-9]{9}$/;
    // let telReg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if(this.mobile!==""){
      if(!phoneReg.test(this.mobile)){
        this.cp.toastPositionDuration("请填写正确的手机格式","top","2000");
        return;
      }
    }
    if(this.uname==""){
      this.cp.toastPositionDuration("请填写收货人姓名","top","2000");
    }else if(this.mobile=="" && this.tel==""){
      this.cp.toastPositionDuration("请至少填写一个联系方式","top","2000");
    }else if(this.province==""){
      this.cp.toastPositionDuration("请选择省","top","2000");
    }else if(this.city==""){
      this.cp.toastPositionDuration("请选择市","top","2000");
    }else if(this.district==""){
      this.cp.toastPositionDuration("请选择区","top","2000");
    }else if(this.addrDetails==""){
      this.cp.toastPositionDuration("请填写详细地址","top","2000");
    }else{
      this.cp.getData("user_address/add",{
        consignee:this.uname,
        mobile:this.mobile,
        tel:this.tel,
        province:this.province,
        city:this.city,
        district:this.district,
        address:this.addrDetails,
      }).then(res=>{
        console.log(res);
        if((res as any).msg=="添加成功"){
          this.cp.toast("添加成功");
          if(this.defaultAdd){
            this.cp.getData("user_address/getlist").then((res:any)=>{
              console.log(res);
              let aid = res.data[0].id;
              let userInfo = this.cp.u;
              userInfo.userProfile.ua_id = aid;
              this.cp.setU(userInfo);
            });
          }
          this.timer = setTimeout(()=>{
            this.cp.goto({view:'myaddress'})
          },2000)
        }else{
          this.cp.toast((res as any).msg);
        }
      })
    }
  }
  //页面离开时清除timer
  ionViewDidLeave(){
    clearTimeout(this.timer);
  }
}
