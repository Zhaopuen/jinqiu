import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the MymodifyaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'mymodifyaddress',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-mymodifyaddress',
  templateUrl: 'mymodifyaddress.html',
})
export class MymodifyaddressPage {
  uname:any = "";
  mobile:any = "";
  tel:any = "";
  province:any = "";
  city:any = "";
  district:any = "";
  provinces:any = "";
  cities:any = "";
  districts:any = "";
  addrDetails:any = "";
  proId:any = 0;
  cityId:any = 0;
  disId:any = 0;
  aid:any = "";
  timer:any = null;
  nickname = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
    console.log(this.navParams);
    this.aid = this.navParams.get("aid");
  }

  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded=>{
      this.nickname = this.cp.u.nickname;
      if(loaded) {
        this.cp.getData("user_address/getlist",{id:this.aid}).then(res => {
          //console.log(res);
          let list = (res as any).data[0];
          this.uname = list.consignee;
          this.mobile = list.mobile;
          this.tel = list.tel;
          this.province = list.region_province.region_name;
          this.city = list.region_city.region_name;
          this.district = list.region_district.region_name;
          this.addrDetails = list.address;
          this.proId = list.region_province.region_id;
          this.cityId = list.region_city.region_id;
          this.proId = list.region_district.region_id;
        })
      }
    });
    //获取省
    this.cp.getData("region/children/parent_id/1").then(res=>{
      //console.log(res);
      this.provinces = res;
    })
  }
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
  //提交修改信息
  subMsg(){
    let phoneReg = /^1[34578][0-9]{9}$/;
    // let telReg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if(this.mobile!==""){
      if(!phoneReg.test(this.mobile)){
        this.cp.toastPositionDuration("请填写正确的手机格式","middle","2000");
        return;
      }
    }
    if(this.uname==""){
      this.cp.toastPositionDuration("请填写收货人姓名","middle","2000");
    }else if(this.mobile=="" && this.tel==""){
      this.cp.toastPositionDuration("请至少填写一个联系方式","middle","2000");
    }else if(this.province==""){
      this.cp.toastPositionDuration("请选择省","middle","2000");
    }else if(this.city==""){
      this.cp.toastPositionDuration("请选择市","middle","2000");
    }else if(this.district==""){
      this.cp.toastPositionDuration("请选择区","middle","2000");
    }else if(this.addrDetails==""){
      this.cp.toastPositionDuration("请填写详细地址","middle","2000");
    }else{
      this.cp.getData("user_address/edit",{
        consignee:this.uname,
        mobile:this.mobile,
        tel:this.tel,
        province:this.province,
        city:this.city,
        district:this.district,
        address:this.addrDetails,
        id:this.aid
      }).then(res=>{
        console.log(res);
        if((res as any).msg=="编辑成功"){
          this.cp.toast("修改成功");
          this.timer = setTimeout(()=>{
            this.cp.goto({view:"myaddress"})
          },2000)
        }else{
          this.cp.toast((res as any).msg)
        }
      })
    }
  }
  //页面离开时清除timer
  ionViewDidLeave(){
    clearTimeout(this.timer);
  }
}
