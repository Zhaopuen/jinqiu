import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the UserContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'user-contact',
  priority: 'off',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-user-contact',
  templateUrl: 'user-contact.html',
})
export class UserContactPage {

  contactsCity:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    this.contactCity();
  }

  contactCity(){
    this.cp.getData('branch_office/getlist',{
      numPerPage: 1000
    }).then((res:any) => {
      this.contactsCity = res.data;
      console.log(res.data,'这是联系我们的城市')
    })
  }

}
