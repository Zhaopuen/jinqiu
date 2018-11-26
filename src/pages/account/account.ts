import {Component} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {IonicPage, NavParams} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';

@IonicPage({
  priority: 'off',
  name: 'account',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  Plist = [];
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
  type: any = "";


  constructor(public navParams: NavParams, public cp: CommonProvider, public formBuilder: FormBuilder) {
    this.type = this.cp.u.type;
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

  ionViewDidLoad() {
    this.cp.getData("region/children", {
      parent_id: 1
    }).then((t: any) => {
      this.Plist = t
      //console.log(t)
    })
    console.log(this.cp.u,"u");
  }

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

  sub() {
    var t = this.pageForm.value;
    this.cp.getData("user/account", t).then((n: any) => {
      n.status ? (this.cp.setU(n.data), this.cp.toast(n.msg), this.cp.pop()) : this.cp.toast(n.msg)
    })
  }
}
