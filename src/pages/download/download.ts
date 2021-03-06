import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  priority: 'off',
   name: 'download',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-download',
  templateUrl: 'download.html',
})
export class DownloadPage {
  dl_android;dl_ios;
  constructor(public cp: CommonProvider) {
    this.cp.isWechat()?(this.dl_android=this.cp.DOWNLOAD_URL,this.dl_ios=this.cp.DOWNLOAD_URL):(this.dl_android=this.cp.DOWNLOAD_ANDROID_URL,this.dl_ios=this.cp.DOWNLOAD_IOS_URL)
  }
 ionViewDidEnter(){
//    if(this.cp.plt.is("cordova"))
//      this.cp.styleLightContent();

   this.cp.temp.dl = 0;
   document.getElementById("dl") && this.cp.addClass(document.getElementById("dl"), 'hide');
 }
 ionViewWillLeave(){
   this.cp.temp.dl = 1;
   document.getElementById("dl") && this.cp.removeClass(document.getElementById("dl"), 'hide');
 }
}
