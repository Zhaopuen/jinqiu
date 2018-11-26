import { Injectable } from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController, ActionSheetController, ToastController, AlertController, ModalController, App, PopoverController } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
// import { SocialSharing } from '@ionic-native/social-sharing';
// import * as ClipboardJs from 'clipboard';
// import { Clipboard } from '@ionic-native/clipboard';
import { StatusBar } from '@ionic-native/status-bar';
// import {PhotoLibrary} from "@ionic-native/photo-library";
import {Geolocation} from '@ionic-native/geolocation';


// declare var sharesdk: any;
// declare var ShareSDK: any;
declare var lyxpay: any;
// declare var JPush: any;

@Injectable()
export class CommonProvider {
  APP_NAME = "金秋装饰";
  WWW_URL = "http://jinqiu.fengsh.cn/";
  SITE_URL = "http://jinqiu.fengsh.cn/";
  SHARE_TEXT = "金秋装饰";
  BASE_URL = this.SITE_URL + "api/";
  DOWNLOAD_URL = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jianshi.shengqianbao";
  // DOWNLOAD_ANDROID_URL = this.WWW_URL + "sqb.apk";
  // DOWNLOAD_IOS_URL = "https://itunes.apple.com/us/app/%E7%BD%91%E8%B4%AD%E7%9C%81%E9%92%B1%E5%AE%9D/id1213711306?l=zh&ls=1&mt=8";
  DOWNLOAD_ANDROID_URL = "#";
  DOWNLOAD_IOS_URL = "#";
  shareOpt: any;
  u: any = {

  };
  navCtrl;
  settings: any = {};
  loadingCount = 0;
  sharePlatform;
  loading;
  // statusBarColor 0 黑 1 白
  temp: any = { checking_update: 1, loadingCount: 0, statusBarColor: 1, logining: 0, loading: null, pressed: !1, clickTimes: 0 };
  global:any={};

  initialized;

  constructor(public http: Http, public storage: Storage, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public actionSheetCtrl : ActionSheetController, public appCtrl: App, public plt: Platform, public jsonp: Jsonp, public geolocation: Geolocation, public sanitizer: DomSanitizer, public statusBar: StatusBar, /*public clipboard: Clipboard, public photoLibrary: PhotoLibrary, public socialSharing: SocialSharing*/) {
    var /*t = this.getQueryString("code"), */i = this.getQueryString("auth");
    if(i)
      this.setGlobal({"auth":i});
    // if(t)
    //   this.temp.logining = 1,
    //   this.getData("user/wechatLogin", {
    //       code: t,
    //       state: i
    //   }).then((i:any) => {
    //     this.temp.logining = 0, this.load(),
    //     i.status ?
    //       ( this.toast(i.msg), localStorage.setItem('uid',i.data.id), this.setU(i.data) ) :
    //     this.toast(i.msg)
    //   })
    // else
      this.load()
    // if (this.plt.is("cordova")) {
    //   JPush.init();
    //   JPush.setDebugMode(false);
    //   var setBadge = (number) => {
    //     JPush.setApplicationIconBadgeNumber(number);
    //     JPush.setBadge(number);
    //   }
    //   let t = setInterval(() => {
    //     JPush.getRegistrationID(r => {
    //       try {
    //         if (r.length > 0) {
    //           setBadge(0), clearInterval(t), t = setInterval(() => {
    //             if (this.u.id) {
    //               clearInterval(t);
    //               this.getData("user/pushReg", {
    //                 id: this.u.id,
    //                 registrationID: r,
    //                 platform: this.plt.is("ios") ? 1 : 0,
    //                 silent: 1
    //               })
    //             }
    //           }, 1000)
    //         }
    //       } catch (t) { }
    //     })
    //   },
    //     1e3);
    //   document.addEventListener("jpush.openNotification",
    //     (t: any) => {
    //       this.plt.is("android") ? this.goto(t.extras) : this.goto(t)
    //     },
    //     !1)
    //   document.addEventListener("jpush.receiveNotification",
    //     (t: any) => {
    //       var e;
    //       this.plt.is("android") ? (e = t.extras, e.msg = t.alert) : (e = t, e.msg = t.aps.alert), e.modal ? this.goto(e) : this.promptNotification(e)
    //     },
    //     !1)
    //   document.addEventListener("jpush.receiveMessage",
    //     (t: any) => {
    //       var e = t.extras;
    //       this.plt.is("android") ? e.msg = t.message : e.msg = t.content,
    //         this.promptNotification(e)
    //     },
    //     !1)

    //   this.sharePlatform = {
    //     qq: ShareSDK.PlatformType.QQFriend,
    //     qzone: ShareSDK.PlatformType.QZone,
    //     timeline: ShareSDK.PlatformType.WechatTimeline,
    //     wechat: ShareSDK.PlatformType.WechatSession,
    //     weibo: ShareSDK.PlatformType.SinaWeibo
    //   }
    // }
  }

  // copyCheck() {
  //   if (this.plt.is("cordova"))
  //     return true;
  //   else if (ClipboardJs.isSupported()) {
  //     let cb = new ClipboardJs('.copy');
  //     cb.on('success', function (e) {
  //       e.clearSelection();
  //     });
  //     return true;
  //   }
  // }
  // copy(t) { this.copyBothTip(t, "复制成功", "复制失败") }
  // copySucTip(t, e) { this.copyBothTip(t, e, "复制失败") }
  // copyBothTip(t, e, n) {
  //   this.plt.is("cordova") ?
  //     this.clipboard.copy(t).then(() => { this.toast(e) }, () => { this.toast(n) }) :
  //     this.temp.copySupported ? (document.getElementById("copyTarget").innerText = t, this.toast(e)) : this.toast(n)
  // }
// 退出登录
  logout() {
    return new Promise((resolve, reject) => {
      this.setU({});
      resolve();
    });
  }
  init() {
    return new Promise((resolve, reject) => {
      if (this.initialized) resolve()
      else {
        let timer = setInterval(() => {
          this.initialized && (clearInterval(timer), resolve())
        }, 100);
      }
    });
  }

  isWechat() {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) + "" == "micromessenger"
  }
  hasClass(t, e) {
    return t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"))
  }
  addClass(t, e) {
      this.hasClass(t, e) || (t.className += " " + e)
  }
  removeClass(t, e) {
      if (this.hasClass(t, e)) {
          var n = new RegExp("(\\s|^)" + e + "(\\s|$)");
          t.className = t.className.replace(n, "")
      }
  }
  toggleClass(t, e) {
      this.hasClass(t, e) ? this.removeClass(t, e) : this.addClass(t, e)
  }

  getData(url, data: any = {}, opt = undefined) {
    if (this.u.id)
      Object.assign(data, { user_id: this.u.id, sign: this.u.sign });

    if (data.silent)
      delete data.silent;
    else {
      this.loadingCount++;
      if (this.loadingCount == 1) {
        this.loading = this.loadingCtrl.create({
          spinner: "dots",
          content: "",
          duration: 10000
        });
        this.loading.present();
      }
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL + url, data, opt).map(t => {
        if (this.loadingCount) {
          this.loadingCount--;
          if (!this.loadingCount)
            this.loading.dismiss();
        }
        return t.json();
      }).subscribe(t => {
        resolve(t);
      },
        err => {
        })
    })
  }

  getDataInfo(url, data: any = {}, opt = undefined) {
    // if (this.u.id)
    //   Object.assign(data, { user_id: this.u.id, sign: this.u.sign });

    if (data.silent)
      delete data.silent;
    else {
      this.loadingCount++;
      if (this.loadingCount == 1) {
        this.loading = this.loadingCtrl.create({
          spinner: "dots",
          content: "",
          duration: 10000
        });
        this.loading.present();
      }
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL + url, data, opt).map(t => {
        if (this.loadingCount) {
          this.loadingCount--;
          if (!this.loadingCount)
            this.loading.dismiss();
        }
        return t.json();
      }).subscribe(t => {
        resolve(t);
      },
        err => {
        })
    })
  }

  getCache(key: string) {
    return new Promise((resolve =>
        this.storage.get(key).then((res: any) =>
            resolve(res && res.expire > +new Date() ? res.data : null ))
    ));
  }

  setCache(key: string, value: any, expire: number = 0) {
    this.storage.set(key, {expire: expire * 1000 + +new Date(), data: value});
  }

  setGlobal(global={}){
    Object.assign(this.global,global);
    this.storage.set("global",this.global);
  }

  styleDefault(set = 1) {
    if (set) {
      if (!this.temp.statusBarColor) return;
      this.temp.statusBarColor = 0;
    }
    this.statusBar.styleDefault();
  }
  styleLightContent(set = 1) {
    if (set) {
      if (this.temp.statusBarColor) return;
      this.temp.statusBarColor = 1;
    }
    this.statusBar.styleLightContent();
  }

  checkLogin() {
    return new Promise((resolve, reject) => {
      this.init().then(() => {
        if (this.temp.pop) this.temp.pop = 0, this.pop(), resolve(!1)
        else if (!this.u.id) this.temp.pop = 1, this.goto({ view: "login" }), resolve(!1)
        else resolve(!0)
      })
    })
  }
  checkLogin2() {
    return new Promise((resolve, reject) => {
        if (!this.u.id) this.goto({ view: "login" })
        else resolve(!0)
    })
  }

  getQueryString(t){return this.getUrlParam(t,window.location.search.substr(1))}
  getUrlParam(t,e){var n=new RegExp("(^|&|\\?)"+t+"=([^&]*)(&|$)","i"),i=e.match(n);return null!=i?decodeURIComponent(i[2]):null}

  /*切换首页的tabs*/
  selectTab(index, params) {
    index &&
      this.appCtrl.getRootNav().getActiveChildNav().select(index, params);
  }

  goto(params, view = '', opts = undefined) {
    switch (params.view) {
      case "detail":
      default:
        params.up = JSON.stringify(params);
    }
    this.appCtrl.getActiveNav().push(params.view || view, params, opts);
  }

  toast(t) {
    return this.toastPosition(t, "middle")
  }

  toastPosition(t, e) {
    return this.toastPositionDuration(t, e, 3e3)
  }

  toastPositionDuration(t, e, n) {
    var i = this;
    return new Promise((r, s) => {
      var tt = i.toastCtrl.create({ message: t, duration: n, position: e });
      tt.onDidDismiss(() => {
        r()
      }), tt.present()
    })
  }

  setActiveNavCtrl(navCtrl = null, delay = 0) {
    if (delay)
      setTimeout(this.setActiveNavCtrl.bind(this, navCtrl), delay)
    else
      this.navCtrl = navCtrl ? navCtrl : this.appCtrl.getActiveNavs()[0];
  }

  getActiveViewCtrl() {
    if (!this.navCtrl)
      this.setActiveNavCtrl();
    return this.navCtrl.getActive();
  }

  gotoRoot() {
    if (!this.navCtrl)
      this.setActiveNavCtrl();

    this.navCtrl.popToRoot()
  }

  pop() {
    if (!this.navCtrl)
      this.setActiveNavCtrl();

    this.navCtrl.pop()
  }

  alert(t) {
    const alert = this.alertCtrl.create({
      subTitle: t,
      buttons: ['知道了']
    });
    alert.present();
    return alert;
  }

  // promptNotification(t) {
  //   this.prompt("推送消息", t.msg, "取消", () => { }, "查看", () => { this.goto(t) });
  // }

  //title,message,btn1_text,btn1_callback,btn2_text,btn2_callback
  prompt(t, e, n, i, r, s) {
    let p = this.alertCtrl.create({
      title: t,
      message: e,
      enableBackdropDismiss: false,
      buttons: [{
        text: n,
        handler: t => {
          return i()
        }
      },
      {
        text: r,
        handler: t => {
          return s()
        }
      }]
    });
    p.present()
  }


  // actionsheet(title,btns){
  //   var i = this.actionsheetCtrl.create({
  //     title: title,
  //     cssClass: "action-sheets-basic-page",
  //     buttons: btns
  //   });
  //   i.present()
  // }

  // 记录buy_page_url  因为在微信内地址不会变 所以用window.location获取到的不对
  // t 参数 e 回调
  buy(t, e, buy_page_url) {
    t.buy_page_url = buy_page_url;
    t.callback = e;
    t.view = 'pay';
    this.goto(t);
  }
  pay(t, e, fail = null) {
    if (this.plt.is('cordova')) {
      this.getData("tradelist/add", t).then((i: any) => {
        this.doPay(i, e, t, fail, 'cordova');
      })
    } else if (this.isWechat()) {
      this.toast("正在生成支付信息");
      this.getData("tradelist/add", t).then((i: any) => {
        this.doPay(i, e, t, fail, 'wechat');
      })
    } else {
      if (t['money'] + t['promo_code_amount'] + 0.0001 > t['amount']) {
        this.getData("tradelist/add", t).then((i: any) => {
          this.doPay(i, e, t, fail);
        })
      } else
        this.toast("非余额全额付款，请在微信或APP内进行支付操作")
    }
  }
  doPay(i, e, t, fail, type = ''){
    if ("please bind wechat first" == i.msg)
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ead4b1c3b371c37&redirect_uri=" + encodeURIComponent(this.SITE_URL + '#' + t.buy_page_url) + "&response_type=code&state=&scope=snsapi_base#wechat_redirect"
        else if (i.status == 2) //余额/优惠码 全额付款成功
          this.u.money = (this.u.money - i.data).toFixed(2), e();
        else if (1 == i.status){
          switch(type){
            case 'cordova':
              lyxpay.pay(t.type == 'wechat_pay' ? 1 : 2, t.type == 'wechat_pay' && this.plt.is("android") ? JSON.stringify(i.data) : i.data, {
                success: () => { e() },
                failure: (t) => {
                  //支付宝的错误码
                  if (8000 == t || 6004 == t)
                    this.toast('支付结果确认中'), this.getData("tradelist/check", { id: i.msg }).then((i: any) => {
                      i.msg ? e() : fail ? fail() : this.toast("支付失败")
                    })
                  else
                    fail ? fail() : this.toast("支付失败")
                }
              })
            break;
            case 'wechat':
              window['WeixinJSBridge'].invoke("getBrandWCPayRequest", i.data, (t) => {
                "get_brand_wcpay_request:ok" == t.err_msg ? e() : this.toast("支付失败")
              })
            break;
          }
        }else{
          if (i.msg == '余额不足')
            this.u.money = i.data;
          this.toast(i.msg)
        }
  }

  setU(u = null) { //{} 清空     不传参数 也就是 n 会等于null this.u维持不变 直接storage.set
    if (JSON.stringify(u) == "{}")  //对象是指针  所以不能用 ==/=== 判断
      this.u = u;
    else if (u)
      Object.assign(this.u, u);
    this.storage.set("user", this.u);
  }

  getShareUrl(url:any=''){
    let timestamp = new Date(new Date().toLocaleDateString()).getTime()/1000, share_url:any = "";

    url = url.split("#");

    // #前面部分
    share_url = url[0];
    share_url = share_url.split("?");
    share_url = share_url[0] + "?auth="+this.u.auth + "&_t=" + timestamp + (share_url[1] ? "&" + share_url[1] : "");

    if(share_url.indexOf("http") !== 0)
      share_url = this.SITE_URL + share_url;
    // #后面部分
    if(url[1])
      share_url += "#" + url[1];
    return share_url;
  }
  share(t) {
    return new Promise((resolve, reject) => {
      var e = this.popoverCtrl.create("share", t.type == 'url' ? { hideSave: 1 } : {}, { cssClass: 'share-container' });
      e.onDidDismiss(data => {
        resolve();
      });
      e.present(), this.shareOpt = t;
    })
  }
  /*
  shareToOpt(opt, t) {
    this.shareOpt = opt, this.shareTo(t)
  }

  shareTo(t) {
    if (!this.plt.is('cordova')) return;
    var packageName, clientType, appName, opt: any = this.shareOpt;
    if (typeof opt.pic == 'object' && opt.pic.length == 1)
      opt.pic = opt.pic[0];

    if (t == 'weibo' && opt.type == 'url') //微博不能直接分享网页链接出去 改成加到内容中的普通分享
      delete opt.type, opt.pic = opt.weiboPic, delete opt.weiboPic
    if (opt.type == 'url')
      delete opt.type
    else if (opt.url && typeof opt.pic != 'object')
      opt.message += "\r\n" + opt.url, delete opt.url;


    var isIos11 = !1;
    if (t != 'weibo' && t != 'save') {
      // ios 11 下 原生分享到微信、朋友圈等报错 —— but remote VC failed, dismissing
      // 微博可以 通过sdk直接支持多图
      isIos11 = this.plt.versions().ios && this.plt.versions().ios.major >= 11;
      if (isIos11 && typeof opt.pic == 'object')
        return setTimeout(() => { this.toastPositionDuration('多图分享模式', 'top', 3000) }, 1000), this.socialSharing.share(opt.message, opt.message, opt.pic
//        , opt.url
      );
    }
    switch (t) {
      case "qzone":
        //QQ空间APP不支持分享链接  当分享链接到QQ空间时 采用通过QQ分享到空间的方式
        if (opt.url || isIos11) {
          t = "qq";
          clientType = ShareSDK.ClientType.QQ;
          appName = 'QQ'
        } else {
          packageName = this.plt.is("ios") ? "com.tencent.mqq.ShareExtension" : "com.qzone";
          appName = 'QQ空间';
        }
        break;
      case "qq":
        if (opt.url || isIos11)
          clientType = ShareSDK.ClientType.QQ;
        else
          packageName = this.plt.is("ios") ? "com.tencent.mqq.ShareExtension" : "com.tencent.mobileqq";
        appName = 'QQ';
        break;
      case "wechat":
        //android 单图 分享到微信  显示的是文件 而不是 图片  所以采用 shareSDK 的方式
        if (opt.url || (typeof opt.pic != 'object' && this.plt.is("android")) || isIos11)
          clientType = ShareSDK.ClientType.Wechat;
        else
          packageName = this.plt.is("ios") ? "com.tencent.xin.sharetimeline" : "com.tencent.mm";
        appName = '微信';
        break;
      case "timeline":
        if (opt.url || isIos11)
          clientType = ShareSDK.ClientType.Wechat;
        else
          packageName = this.plt.is("ios") ? "com.tencent.xin.sharetimeline" : "com.tencent.mm/com.tencent.mm.ui.tools.ShareToTimeLineUI";
        appName = '微信';
        break;
      case "weibo":
        if (opt.url || this.plt.is("ios"))
          clientType = ShareSDK.ClientType.SinaWeibo;
        else
          //com.sina.weibo.ShareExtension 就是不出来分享图片 分享不了
          //com.apple.social.sinaweibo、com.apple.share.SinaWeibo.post 官方的、要在系统设置里面设置账户
          //this.plt.is("ios")?"com.sina.weibo.ShareExtension":
          packageName = "com.sina.weibo";
        appName = '微博';
        break;
      case "save":
        this.toast("保存中");
        this.photoLibrary.requestAuthorization().then(() => {
          if (typeof this.shareOpt.pic == 'object') {
            let saveImg = (key) => {
              setTimeout(() => {
                this.toast('正在保存第' + (key + 1) + '张');
                this.photoLibrary.saveImage(this.shareOpt.pic[key], this.plt.is("ios") ? "Camera Roll" : this.APP_NAME);
              }, key * 600)
            }
            for (var i = 0, len = this.shareOpt.pic.length; i < len; i++) {
              //来个setTimeout 直接循环写的话 会出现 write busy 错误
              saveImg(i);
            }
            setTimeout(() => {
              this.toast("保存成功")
            }, this.shareOpt.pic.length * 600)
          } else
            this.photoLibrary.saveImage(this.shareOpt.pic, this.plt.is("ios") ? "Camera Roll" : this.APP_NAME), this.toast("保存成功");
        }).catch(err => { this.toast("未授权访问相册，保存失败") });
        break;
    }
    if (clientType) {
      this.toastPositionDuration("即将打开" + appName, "middle", 10000);
      sharesdk.isInstallClient.promise(clientType).then(n => {
        n ?
          opt.url ?
            sharesdk.share(this.sharePlatform[t], ShareSDK.ShareType.WebPage, {
              icon: opt.pic,
              title: opt.title,
              text: opt.message,
              url: opt.url
            }, (t) => { this.toast("分享成功") }, (t) => { this.toast("分享失败") }) :
            sharesdk.share(this.sharePlatform[t], ShareSDK.ShareType.Image, {
              image: opt.pic,
              title: opt.title,
              text: opt.message
            }, (t) => { this.toast("分享成功") }, (t) => { this.toast("分享失败") }) :
          this.toast("未安装" + appName)
      });
    } else if (packageName) {
      this.toast("即将打开" + appName);
      this.socialSharing.canShareVia(packageName).then(() => {
        if (t != 'weibo' && this.plt.is("ios") && this.temp.statusBarColor)
          this.styleDefault(0);
        //安卓里面被分享的应用 基本是 singletask 的  会立即执行回调  所以执行成功的回调就不提示了
        this.socialSharing.shareVia(packageName, opt.message, opt.message, opt.pic, opt.url).then((t) => { this.plt.is("ios") && this.toast("分享成功"), t != 'weibo' && this.plt.is("ios") && this.temp.statusBarColor && this.styleLightContent(0) }, (t) => { this.plt.is("ios") && this.toast("分享失败"), t != 'weibo' && this.plt.is("ios") && this.temp.statusBarColor && this.styleLightContent(0) })
      }).catch(() => {
        this.toast("未安装" + appName)
      });
    }
    return true;
  }
  */

  parseJson(str) {
    return new Promise(function (resolve, reject) {
      resolve(JSON.parse(str));
    });
  }
  getContact(){
    let timestamp = Date.parse(new Date()+"") / 1000;
    this.getData('sys_conf/detail').then((res:any) => {
      this.setGlobal({"sys_conf":res,"sys_conf_time":timestamp})
    })
  }
  load() {
    this.storage.get("global").then(global => {
      this.global = global ? global : {
        province: 31, city: 383/*,district:3229*/, province_name: '浙江', city_name: '杭州'
      };
      if(!this.global.sys_conf){
        this.getContact();
      }
      let timestamp = Date.parse(new Date()+"") / 1000;
      if(timestamp - this.global.sys_conf_time > 86400){
        this.getData('sys_conf/detail').then((res:any) => {
          this.setGlobal({"sys_conf":res,"sys_conf_time":timestamp})
        })
      }

      this.geolocation.getCurrentPosition({timeout:3000}).then((resp) => {
        let lbs_api = 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + resp.coords.latitude + ',' + resp.coords.longitude + '&key=VU4BZ-DK73X-C6V4H-ZDNAW-NLVHE-EZFIB&get_poi=1&output=jsonp&callback=JSONP_CALLBACK';
        this.jsonp.request(lbs_api).map(t => {
          return t.json();
        }).subscribe(t => {
          console.log(t);
          this.getCache('region_all').then((res: any) =>
            res ?
              this.setCurrentPosition(t, res) :
              this.getData('region/all').then((data: any) => {
                this.setCache('region_all', data, 3600);
                this.setCurrentPosition(t, data);
              })
          );


        }, err => {
          this.settings.current_position = null
            //, this.initialized = 1
        })
      }).catch(error => {
        this.settings.current_position = null
          //, this.initialized = 1;
      });

      this.storage.get("user").then(u => {
        if (!u)
          this.setU({})
        else
          this.u = u

        this.initialized = 1; //放到common的最后 表示 common 已经初始化完成了
      })
      // this.temp.copySupported = this.copyCheck()
    })
  }

  setCurrentPosition(t, data) {
    //国外可能就没province
    if (t.status == 0 && t.result.ad_info.province) {
      let province_name = t.result.ad_info.province.replace('省', ''),
        city_name = t.result.ad_info.city.replace('市', ''), province, city;

      data.every((val) => {
        if (val.name == province_name) {
          province = val.id;
          val.sub_regions.every((c) => {
            if (c.name == city_name) {
              city = c.id;
              return false;
            }
          })
          return false;
        }
      })
      if (province && city) {
        let current_position = {province, city/*,district:3229*/, province_name, city_name};
        this.settings.current_position = current_position, this.setGlobal(current_position);
      } else
        this.settings.current_position = null;
    }
    this.initialized = 1;
  }
}
