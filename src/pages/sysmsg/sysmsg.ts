import { Component,ViewChild } from '@angular/core';
import { IonicPage,InfiniteScroll,ViewController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  priority: 'off',
  name : 'sysmsg',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-sysmsg',
  templateUrl: 'sysmsg.html',
})
export class SysmsgPage {
  @ViewChild(InfiniteScroll) infiniteScroll : InfiniteScroll;

  items=[];page=0;
  constructor(public cp: CommonProvider,public viewCtrl:ViewController) {}

  ionViewWillEnter(){
    this.cp.checkLogin().then(loaded=>{
      if(loaded){
          this.cp.temp.sysmsg_time = 0;
          this.page==0 && this.doInfinite();
        }
      })
  }
  ionViewDidEnter(){
    if(this.cp.plt.is("cordova"))
      this.cp.styleLightContent();
  }
  doInfinite(){
    this.page++;
    this.cp.getData("sys_msg_user_read/getList",{p:this.page}).then((n:any)=>{
      this.items=this.items.concat(n.data),this.infiniteScroll.complete(),
      Math.ceil(n.total/n.per_page) <= this.page && this.infiniteScroll.enable(!1);
      setTimeout(()=>{
        Array.prototype.forEach.call(this.viewCtrl.contentRef().nativeElement.querySelectorAll("a"),n => {
            n.addEventListener("click",n=>{
                if(n.target.title && n.target.title.indexOf("{")===0){
                  this.cp.parseJson(n.target.title.replace(/'/g,'"')).then(j=>{
                    this.cp.goto(j);
                  }).catch(err => {
                    this.cp.toast("链接失效啦，请联系客服");
                  })
                  n.preventDefault();
                }else if(n.target.href){
                  // this.cp.plt.is("cordova") && (n.preventDefault(), this.cp.openBrowser(n.target.href, {title:{staticText:this.cp.APP_NAME}}));
                }
            })
        })
      },
      300)
    })
  }
}
