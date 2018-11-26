import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage({
  priority: 'off',
  name : 'reg',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {
  isShow=true;
  regModel = false;
  regSelect = 100;
  Plist = [];
  articleP = '';
  articleC = '';
  articleq = '';
  city = [];

  pageForm=this.formBuilder.group({
    province: [this.cp.u.province, [Validators.required]],
    city: [this.cp.u.city, [Validators.required]],
    district: [this.cp.u.district, [Validators.required]],
    tel: ["", [Validators.required, Validators.pattern('^[1][3,4,5,7,6,8][0-9]{9}$')]],
    pwd: ["", [Validators.required, Validators.minLength(6)]],
    confirm_pwd: ["", [Validators.required, Validators.minLength(6)]],
    captcha: ["", [Validators.required, Validators.minLength(4)]],
    auth: [this.cp.global.auth]
  }, {validator: this.matchingPasswords('pwd', 'confirm_pwd')});

  provinces; cities; districts;
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  constructor(
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public cp: CommonProvider) {
      this.region(1),
      this.cp.u.city && this.region(this.cp.u.province),
      this.cp.u.district && this.region(this.cp.u.city)
    }
    change(t) {
      this.region(t)
      if(t <= 34  ){
        for(let i = 0;i< this.Plist.length;i++){
            if(this.Plist[i].region_id == t){
                this.articleP = this.Plist[i].region_id
                console.log(this.articleP)
            }
        }
      }else if(t > 34 && t < 500){
          for(let i =0;i< this.city.length;i++){
              if(this.city[i].region_id == t){
                  this.articleC = this.city[i].region_id
                  console.log(this.articleC)
              }
          }
      }else{
        for(let i =0;i< this.city.length;i++){
          if(this.city[i].region_id == t){
              this.articleq = this.city[i].region_id
              console.log(this.articleq)
          }
        }
      }
    }
    ionViewDidLoad(){
      this.cp.getData("region/children", {
          parent_id: 1
      }).then((t: any) => {
          this.Plist = t
      })
    }
    changeIs(){
      this.isShow = !this.isShow;
    }

    region(t) {
      if( t < 500 ){
        this.cp.getData("region/children", {
          parent_id: t
        }).then((t: any) => {
          this.city = t
          console.log(t)
          2 == t[0].region_type ? this.cities = t : 3 == t[0].region_type ? this.districts = t : this.provinces = t
        })
      }
    }

    ionViewDidEnter(){
      if(this.cp.plt.is("cordova"))
        this.cp.styleLightContent();
    }

    ionViewWillEnter(){
      this.cp.init().then(()=>{
        if(this.cp.u.id){
          this.cp.pop()
        }
      })
    }

    captcha(t){
      var u=typeof u == 'undefined'?0:u;
      if (!u) {
          var n, i = this.pageForm.controls.tel;
          if (!i.valid) return void this.cp.toast("手机号填写错误");
          n = i.value,
          u = 60;
          var r = setInterval(() => {
            u--,
            0 == u ? (t.target.innerText = "重新发送", clearInterval(r)) : t.target.innerText = "重新发送(" + u + ")"
          },
          1000);
          this.cp.getData("captcha/index", {
            type: 'register',
            tel: n
          }).then((n:any) => {
            this.cp.toast(n.msg),
            n.status || (u = 1)
          })
      }
    }
  regNone(){
    this.regModel = false
  }
  regselect(i){
    this.regSelect = i
    this.regModel = false
  }
  modelblock(){
    this.regModel = true
  }

  sub(){
    if(this.pageForm.controls.tel.value == ''){
      this.cp.toast("请输入手机号");
    }else if(this.pageForm.controls.pwd.value == ''){
      this.cp.toast("请输入密码");
    }else if(this.pageForm.controls.confirm_pwd.value == ''){
      this.cp.toast("请再次输入密码");
    }else if(this.articleP == ''){
      this.cp.toast("请选择省份");
    }else if(this.articleC == ''){
      this.cp.toast("请选择城市");
    }else if(this.articleq == ''){
      this.cp.toast("请选择区/县");
    }else if(this.regSelect == 100){
      this.cp.toast("请选择注册身份");
    }else{
      this.cp.getData("user/reg" , {
        tel:this.pageForm.controls.tel.value,
        pwd:this.pageForm.controls.pwd.value,
        confirm_pwd:this.pageForm.controls.confirm_pwd.value,
        captcha:this.pageForm.controls.captcha.value,
        type:this.regSelect,
        province:this.articleP,
        city:this.articleC,
        district:this.articleq,
        auth:this.pageForm.controls.auth.value
      }).then((n:any) => {
        if(n.status == "1"){
          // this.cp.goto({view: "login",})
          this.cp.pop();
        }
        console.log(n)
      })
    }

     //obj.tel = this.pageForm.controls.tel.value
    //this.cp.getData("user/reg",t).then((n:any) => {n.status?(this.cp.setU(n.data),this.cp.toast(n.msg),this.cp.pop()):this.cp.toast(n.msg)})
  }
}
