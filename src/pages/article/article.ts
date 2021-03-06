import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { WechatApi } from '../../providers/common/wechatApi';
import { DatePipe } from '@angular/common';

@IonicPage({
  priority: 'off',
  name : 'article',
  segment: 'article/:id',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
  id=parseInt(this.navParams.get("id"));
  video;
  item:any={title:"加载中",content:"",extra:{}};
  btnText;

  constructor(public navParams: NavParams, public cp: CommonProvider, public api:WechatApi, public viewCtrl:ViewController, public datePipe: DatePipe) {
    if(!this.id) this.cp.pop();
    
    this.cp.init().then(()=>{
      if(this.cp.temp.logining){
        let timer = setInterval(()=>{
          if(!this.cp.temp.logining)
            clearInterval(timer), this.init()
        },200)
      }else
        this.init()
    })
  }

  init(){
    this.cp.getData("article/detail", {
      id: this.id, silent: 1
    }).then((s:any) => {
      if (s && s.title) {
        let ele = this.viewCtrl.contentRef().nativeElement;
          this.item = s, this.item.extra = this.item.extra ? this.item.extra : {}, 
          this.item.content = this.cp.sanitizer.bypassSecurityTrustHtml(this.item.content),
          setTimeout(()=>{
              Array.prototype.forEach.call(ele.querySelectorAll("a"),
              n => {
                  n.addEventListener("click",n=>{
                      if(n.target.title && n.target.title.indexOf("{")===0){
                        this.cp.parseJson(n.target.title.replace(/'/g,'"')).then(j=>{
                          this.cp.goto(j);
                        }).catch((err) => {
                          this.cp.toast("链接失效啦，请联系客服");
                          console.log(err);
                        })
                        n.preventDefault();
                      }else if(n.target.href){
                        // this.cp.plt.is("cordova") && (n.preventDefault(), this.cp.openBrowser(n.target.href, {target:"_system"}));
                      }
                  })
              })
              // Array.prototype.forEach.call(ele.querySelectorAll(".q"), (t) => {
              //     t.addEventListener("click", (e) => {
              //         this.cp.toggleClass(t, "show"),
              //         this.cp.toggleClass(t.nextElementSibling, "show")
              //     })
              // })

              // if(this.cp.plt.is("cordova")){
              //   var timer; // Create variable for setTimeout
              //   var interval = 800; // Set number of milliseconds for longpress
              //   Array.prototype.forEach.call(this.viewCtrl.contentRef().nativeElement.querySelectorAll("img"), (t) => {
              //     t.addEventListener('touchstart', (e) => {
              //       timer = setTimeout(()=>{
              //         this.cp.longPress({
              //           pic : t.src
              //         });
              //       }, interval);
              //     }, true);
              //     t.addEventListener('touchmove', (e) => {
              //       clearTimeout(timer);
              //     });
              //     t.addEventListener('touchend', (e) => {
              //       clearTimeout(timer);
              //     });                
              //   })
              // }
          },
          300)

          
          this.cp.isWechat() && this.api.register({
            url : this.cp.getShareUrl("#/article/"+this.id),
            title : this.item.title,
            pic : this.item.pic ? this.item.pic : this.cp.u.avatar
          });
      } else this.cp.pop()
    })
  }

  ionViewDidEnter(){
    if(this.cp.plt.is("cordova"))
      this.cp.styleDefault();
  }

  share() {
    if(this.cp.isWechat()){
      this.cp.toast("请点击右上角 ··· 进行分享");
    }else if(this.cp.plt.is("cordova")){
      let t:any = {
          message: this.cp.SHARE_TEXT,
          title: this.item.title,
          pic: this.cp.u.avatar,
          url: this.cp.getShareUrl("#/article/"+this.id),
          type: 'url'
      };

      this.cp.share(t);
    }else
      this.cp.goto({view:"download"})
  }
}
