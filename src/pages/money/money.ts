import { Component,ViewChild } from '@angular/core';
import { IonicPage,InfiniteScroll } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  priority: 'off',
   name: 'money',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-money',
  templateUrl: 'money.html',
})
export class MoneyPage {
  @ViewChild(InfiniteScroll) infiniteScroll : InfiniteScroll;
  
  tabs = "0";
  items = [[],[],[]];
  page = [0, 0, 0];
  infiniteScrollState = [!0, !0, !0];

  constructor(public cp: CommonProvider) {
  }
  
  ionViewWillEnter(){
    this.cp.checkLogin().then(loaded=>{
      if(loaded){
        this.page[this.tabs]==0 && this.doInfinite()
      }
    })
  }
  ionViewDidEnter(){
    if(this.cp.plt.is("cordova"))
      this.cp.styleLightContent();
  }
  withdraw() {
      this.cp.u.wechat_unionid ? this.cp.goto({view:"withdraw"}) : (this.cp.toast("请先绑定微信号，后续微信直接到账"), this.cp.goto({view:"settings"}))
  }
  changeSeg() {
      0 == this.page[this.tabs] && this.doInfinite(),
      this.infiniteScroll.enable(this.infiniteScrollState[this.tabs])
  }
  doInfinite() {
      this.cp.getData("user_money_log/getlist", {
          type: this.tabs,
          p: ++this.page[this.tabs]
      }).then((t:any) => {
          this.items[this.tabs] = this.items[this.tabs].concat(t.data),
          this.infiniteScroll.complete(),
          Math.ceil(t.total / t.per_page) <= this.page[this.tabs] && (this.infiniteScrollState[this.tabs] = !1, this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]))
      })
  }
}
