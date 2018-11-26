import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';
import { BackButtonService } from "../../providers/common/backButtonService";
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  name: 'tabs',
  segment: 'tabs',
  priority: 'off'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Tabs) tabs: Tabs;
  tab1Root = "tabs3";
  tab2Root = "mycart";
  tab3Root = "myorder";
  tab4Root = "user-contact";
  tab5Root = "user-view";
  tab6Root = "sysmsg";

  constructor(public cp: CommonProvider, public backButtonService: BackButtonService) {
    this.cp.plt.ready().then(() => {
      this.backButtonService.registerBackButtonAction(this.tabs);
    });
  }

  ionViewDidLoad(){
    //console.log(this.cp.u,'tabs的登录信息')
  }
}
