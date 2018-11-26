import { Injectable } from '@angular/core';
import { CommonProvider } from '../../providers/common/common';

declare var wx: any;

@Injectable()
export class WechatApi {
  constructor(public cp: CommonProvider) { }
  
  register(params){
    params.silent = 1;
    params.message = params.message ? params.message : this.cp.SHARE_TEXT;
    //url 用来签名 必须为当前网址 
    params.link = params.url ? params.url : location.href;
    params.url = location.href;
    this.cp.getData("wechat/config", params).then((data:any)=>{
      wx.config({  
        debug: false,   
        appId: data.appid, // 必填，公众号的唯一标识  
        timestamp: data.timestamp, // 必填，生成签名的时间戳  
        nonceStr: data.noncestr, // 必填，生成签名的随机串  
        signature: data.signature,// 必填，签名，见附录1  
        jsApiList: [  
            "onMenuShareTimeline",  
            "onMenuShareAppMessage",  
            "onMenuShareQQ",  
            "onMenuShareWeibo",
            "onMenuShareQZone"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2  
      }); 

      wx.ready(function () { 
        wx.onMenuShareTimeline({  
            title: data.title, // 分享标题  
            link: params.link, // 分享链接,将当前登录用户转为puid,以便于发展下线  
            imgUrl: data.imgUrl // 分享图标  
        }); 
        wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.imgUrl
        });
        wx.onMenuShareQQ({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: params.link, // 分享链接
            imgUrl: data.imgUrl
        });
        wx.onMenuShareWeibo({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: params.link, // 分享链接
            imgUrl: data.imgUrl
        });
        wx.onMenuShareQZone({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: params.link, // 分享链接
            imgUrl: data.imgUrl
        });     
      });
    })
  }
}
