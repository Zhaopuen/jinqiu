import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
import {Validators, FormBuilder,FormGroup } from '@angular/forms';
/**
 * Generated class for the WorkuserpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'workuserpassword'
})
@Component({
  selector: 'page-workuserpassword',
  templateUrl: 'workuserpassword.html',
})
export class WorkuserpasswordPage {
  nickname = "";
  pageForm = this.formBuilder.group({
    org_pwd: ["", [Validators.required, Validators.minLength(6)]],
    pwd: ["", [Validators.required, Validators.minLength(6)]],
    confirm_pwd: ["", [Validators.required, Validators.minLength(6)]]
  }, {validator: this.matchingPasswords('pwd', 'confirm_pwd')})
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

  constructor(public formBuilder:FormBuilder, public cp: CommonProvider) {
  }

  ionViewWillEnter(){
    this.nickname = this.cp.u.nickname;
    this.cp.checkLogin().then(loaded=>{
    })
  }
  ionViewDidLoad() {
    this.cp.checkLogin().then(loaded=>{
      if(loaded){
        this.nickname = this.cp.u.nickname;
      }
    })
  }
  sub() {
      this.cp.getData("user/mod", this.pageForm.value).then((n:any) => {
          n.status ? (this.cp.setU({}), this.cp.toast(n.msg), this.cp.gotoRoot()) : this.cp.toast(n.msg);
          this.cp.goto({view: "login"})
      })
  }
}
