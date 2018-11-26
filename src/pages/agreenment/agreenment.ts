import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the AgreenmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'agreenment'
})
@Component({
  selector: 'page-agreenment',
  templateUrl: 'agreenment.html',
})
export class AgreenmentPage {
  agreenment = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgreenmentPage');
    this.cp.getData("article/detail",{
      id: 10
    }).then((res:any) => {
      this.agreenment = res;
      console.log(res,'res')
    })
  }

}
