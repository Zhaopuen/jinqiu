import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
import {Validators, FormBuilder} from '@angular/forms';
/**
 * Generated class for the UserworklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'userworklist'
})
@Component({
  selector: 'page-userworklist',
  templateUrl: 'userworklist.html',
})
export class UserworklistPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider,
    public formBuilder: FormBuilder
  ) {
    if (!this.cp.u.id) this.cp.pop();
    else {
      // if(this.cp.u.keyid || this.cp.u.tel)
      // addController()
      //s.auth = [this.cp.settings.auth, Validators.minLength(3)],

      this.region(1),
      this.cp.u.city && this.region(this.cp.u.province),
      this.cp.u.district && this.region(this.cp.u.city);
    }
  }

  Plist = [];

  change(t) {
    console.log(t)
    this.region(t)
    console.log(this.city.length, 'pppp')
    if (t <= 34) {
      for (let i = 0; i < this.Plist.length; i++) {
        if (this.Plist[i].region_id == t) {
          //console.log(this.Plist[i].region_name)
          this.articleP = this.Plist[i].region_name
          //console.log(this.articleP)
        }
      }
    } else if (t > 34) {
      for (let i = 0; i < this.city.length; i++) {
        if (this.city[i].region_id == t) {
          //console.log(this.city[i].region_name)
          this.articleC = this.city[i].region_name
          //console.log(this.articleC)
        }
      }
    }
  }

  region(t) {
    this.cp.getData("region/children", {
      parent_id: t
    }).then((t: any) => {
      this.city = t
      2 == t[0].region_type ? this.cities = t : 3 == t[0].region_type ? this.districts = t : this.provinces = t
    })
  }

  ionViewDidLoad() {
    this.userWorkList();
    console.log('ionViewDidLoad UserworklistPage');
  }

  userTypeInfo = [];
  usertypeName = "";
  staffUserId = "";
  city = [];
  articleP = '1';
  articleC = '2';
  pageForm = this.formBuilder.group({
    province: [this.cp.u.province, [Validators.required]],
    city: [this.cp.u.city, [Validators.required]],
    district: [this.cp.u.district, [Validators.required]],
    gender: [this.cp.u.gender, [Validators.required]],
    receive_money_qrcode: [this.cp.u.user_profile.receive_money_qrcode, [Validators.required]],
    nickname: [this.cp.u.nickname, [Validators.required, Validators.minLength(this.cp.u.nickname ? 1 : 2)]],
    keyid: [this.cp.u.keyid, [Validators.required, Validators.pattern('(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)')]],
    real_name: [this.cp.u.real_name, [Validators.required, Validators.pattern('^[\u4E00-\u9FA5A-Za-z]{2,}$')]]
  });

  provinces;
  cities;
  districts;
  // 水电工type：3    瓦工type:4   木工type:5   油工type：6    小工type:7
  userWorkList(){
    console.log(this.navParams.get("type"),'this.navParams.get("type")222222')
    if(this.navParams.get("type") == 3){
      this.usertypeName = "水电工"
    }else if(this.navParams.get("type") == 4){
      this.usertypeName = "瓦工"
    }else if(this.navParams.get("type") == 5){
      this.usertypeName = "木工"
    }else if(this.navParams.get("type") == 6){
      this.usertypeName = "油工"
    } else if(this.navParams.get("type") == 7){
      this.usertypeName = "小工"
    }
    this.cp.getData("user/getlist",{
      type: this.navParams.get("type"),
    }).then((res:any) => {
      this.userTypeInfo = res.data;
      for(var i = 0;i<res.data.length;i++){
        this.staffUserId = res.data[i].id;
      }
    })
  }


  workerListAdd(id){
    this.cp.getData("order_staff/add",{
      order_id: this.navParams.get("id"),     //订单id
      type: this.navParams.get("type"),
      staff_user_id: id      //员工的用户ID
    }).then((res:any) => {
      if(res.msg == "添加成功"){
        this.cp.goto({view:'userworker'});
      }
    })
  }
  

}
