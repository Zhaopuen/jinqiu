import { Component,ViewChild } from '@angular/core';
import { IonicPage,InfiniteScroll } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  priority: 'off',
  name : 'withdrawlog',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-withdrawlog',
  templateUrl: 'withdrawlog.html',
})
export class WithdrawlogPage {
  @ViewChild(InfiniteScroll) infiniteScroll : InfiniteScroll;
  
  tabs = "0";items = [[],[],[]];page = [0, 0, 0];params:any = {};infiniteScrollState = [!0, !0, !0];
  constructor(public cp: CommonProvider) {
  }

  ionViewWillEnter(){
      this.cp.checkLogin().then(loaded=>{
        if(loaded){
          this.params.status = -1, this.page[this.tabs]==0 && this.doInfinite()
        }
      })
  }

  changeSeg() {
      this.params.status = parseInt(this.tabs)-1,
      0 == this.page[this.tabs] && this.doInfinite(),
      this.infiniteScroll.enable(this.infiniteScrollState[this.tabs])
  }
  doInfinite() {
      this.params.p = ++this.page[this.tabs],
      this.cp.getData("withdraw/getlist", this.params).then((n:any) => {
          this.items[this.tabs] = this.items[this.tabs].concat(n.data),
          this.infiniteScroll.complete()
          
          Math.ceil(n.total / n.per_page) <= this.page[this.tabs] && (this.infiniteScrollState[this.tabs] = !1, this.infiniteScroll.enable(this.infiniteScrollState[this.tabs]))
      })
  }
}
