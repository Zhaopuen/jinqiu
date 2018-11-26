import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

@IonicPage({
  name: 'qa'
})
@Component({
  selector: 'page-qa',
  templateUrl: 'qa.html',
})
export class QaPage {
  i: Number = 0;

  constructor(public cp: CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  toggle(i){
    if(this.i == i)
      this.i = null;
    else
      this.i = i;
  }

  getItems(e){
    console.log(e);
  }
}
