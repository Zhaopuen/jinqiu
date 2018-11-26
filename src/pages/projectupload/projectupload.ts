import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
/**
 * Generated class for the ProjectuploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'projectupload',
})
@Component({
  selector: 'page-projectupload',
  templateUrl: 'projectupload.html',
})
export class ProjectuploadPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp:CommonProvider
  ) {
  }
  fileElem: any;
  formElem: any;
  photos = [];
  @ViewChild('form') form;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectuploadPage');
    this.formElem = this.form.nativeElement;
    this.fileElem = this.formElem.firstElementChild;
  }

  //第一次上传图片
  addImg() {
    if (this.photos.length == 6) {
      this.cp.toast('最多上传6张图片')
    }else
      this.fileElem.click()
  }
  uploadImg() {
    this.cp.getData('upload/index', new FormData(this.formElem)).then((result: any) => {
      if (result.code != 0)
        this.cp.toast(result.msg)
      else
        this.photos.push(this.cp.WWW_URL + result.data.name);
    });
    this.fileElem.value = '';
  }
  deleteImg(item) {
    item &&
    this.photos.splice(this.photos.indexOf(item), 1);
  }


}
