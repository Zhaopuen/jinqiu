import { Component,ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the UserViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'user-view',
  priority: 'off',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-user-view',
  templateUrl: 'user-view.html',
})
export class UserViewPage {
  @ViewChild('form') form;
  fileElem: any;
  formElem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider) {
  }

  userViewAdress = [
    {name:'投诉'},
    {name:'建议'}
  ];
  userObjectbox = [
    {name:'设计师'},
    {name:'施工长'},
    {name:'本地客服'},
    {name:'在线客服'},
    {name:'其它'}
  ];
  suggestTitle = "";
  suggestContent = "";
  designrwall = 0;
  styleTypeFn = [];
  designradress = 0;
  photos: any = [];
  phone = "";

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserViewPage');
    this.formElem = this.form.nativeElement;
    this.fileElem = this.formElem.firstElementChild;
  }

  hardSelected(i){
    this.designrwall = i;
  }

  userAdress($event,i){
    this.designradress = i;
  }

  /*图片操作*/
  addImg() {
    if (this.photos.length == 6) {
      this.cp.toast('最多上传6张图片')
    } else
      this.fileElem.click()
  }
  // 上传图片
  uploadImg() {
    this.cp.getData('upload/index', new FormData(this.formElem)).then((result: any) => {
      if (result.code != 0)
        this.cp.toast(result.msg)
        // this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      else
        this.photos.push(this.cp.WWW_URL + result.data.name);
    });
    //清空file
    this.fileElem.value = '';
  }
  // 删除图片
  deleteImg(item) {
    item &&
    this.photos.splice(this.photos.indexOf(item), 1);
  }


  // 投诉建议
  indexCooperate(){
    var that = this;
    if(that.suggestTitle == ""){
      that.cp.toast("请输入名称");
    }else if(that.photos == ""){
      that.cp.toast("请上传照片")
    }else if(that.suggestContent == ""){
      that.cp.toast("请输入内容")
      return
    }
    that.cp.getData("feedback/add", {
      type:that.designrwall,
      title:that.suggestTitle,
      content:that.suggestContent,
      pics:that.photos,
      target:that.designradress
    }).then((n:any) => {
        that.cp.toast("添加成功！")
    })
  }
}
