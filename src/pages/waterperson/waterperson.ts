import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the WaterpersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'waterperson',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-waterperson',
  templateUrl: 'waterperson.html',
})
export class WaterpersonPage {
  // fileElem: any;
  // formElem: any;
  photos: any = [];  
  lifePhotos: any = [];
  tel = "";  //电话
  wechat_unionid = "";  //微信号
  birth_year = "";   //
  birth_month = "";
  styleElem: any;
  styleformElem: any;
  stylephotos = "";
  styleTabs = ["现代风格","地中海","欧式风格","美式风格","中式现代","中式复古","北欧风格","日式风格"];
  houseImgs=["1"];
  likeImgs=[""];
  buttonClickStyle=[-1,-1,-1,-1,-1,-1,-1,-1];
  styleTypeFn=[];
  gender='';
  rellyName='';
  collectPhoto='';
  districts_t=0;
  districts_txt='';
  bornYearMonth='';
  Plist = [];
  sexCitySelect = [];
  // articleP = [];
  // articleC = [];
  city = [];
  sex = '';
  designOrderDataxs = null;
  designRadio = 100;
  designPlace = 0;
  real_name = "";  //真是姓名
  custom = "";    //最想和顾客说的一句话
  nickname = "";
  startdate = "";
  company = "";
  content = "";
  u = "";
  province: any = "";
  city1: any = "";
  district: any = "";
  pro: any = "";
  ct: any = "";
  dis: any = "";
  cardfElem: any;
  cardfformElem: any;
  cardzElem: any;
  cardzformElem: any;
  isShowImg = true;
  isFanShowImg = true;
  cardzPhotos = "";
  cardfPhotos = "";
  provinces; cities; districts;
  @ViewChild('form2') form2;
  @ViewChild('form3') form3;
  @ViewChild('form1') form1;
  @ViewChild('form') form;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider,
    public formBuilder:FormBuilder,
    public toastCtrl: ToastController
  ) {
    if (!this.cp.u.id) this.cp.pop();
      else {
        this.u = Object.assign({}, this.cp.u);

        this.region(1),
        this.cp.u.city && this.region(this.cp.u.province),
        this.cp.u.district && this.region(this.cp.u.city)
      }
  }

  selectedBtn(i,item){
    console.log(item,'zheshiitem')
    if(this.buttonClickStyle[i]==i){
      this.buttonClickStyle[i] = -1
      for(let i = 0;i<this.styleTypeFn.length;i++){
        if(this.styleTypeFn[i] == item){
          this.styleTypeFn.splice(i,1)
        }
      }
    }else{
      this.buttonClickStyle[i] = i
      this.styleTypeFn.push(item)
    }
  }

  // 上传身份证正面照
  photoZShow = true;
  cardzaddImg() {
      this.cardzElem.click()
  }
  cardzuploadImg() {
    this.cp.getData('upload/index', new FormData(this.cardzformElem)).then((result: any) => {
      if (result.code != 0){
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      } else {
        this.cardzPhotos = this.cp.WWW_URL + result.data.name;
      }
      if(result.code == 0){
        this.photoZShow = false;
        this.isShowImg = true;
      }
    });
    this.cardzElem.value = '';
  }
  cardzdeleteImg(item) {
    this.cardzPhotos = "";
  }

  // 上传身份证fan面照
  photoShow = true;

  cardfaddImg() {
    this.cardfElem.click()
  }
  cardfuploadImg() {
    this.cp.getData('upload/index', new FormData(this.cardfformElem)).then((result: any) => {
      console.log(result,'hhhhh')
      if (result.code != 0){
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      } else {
        this.cardfPhotos = this.cp.WWW_URL + result.data.name;
      }
      if(result.code == 0){
        this.photoShow = false;
        this.isFanShowImg = true;
      }
    });
    this.cardfElem.value = '';
  }
  cardfdeleteImg(item) {
    this.cardfPhotos = "";
  }

  // 第二次上传图片
  styleaddImg() {
    // if (this.stylephotos.length == 1) {
    //   this.cp.toast('最多上传1张图片')
    // } else
      this.styleElem.click()
    }
  styleuploadImg() {
    this.cp.getData('upload/index', new FormData(this.styleformElem)).then((result: any) => {
      if (result.code != 0)
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      else
        this.stylephotos = this.cp.WWW_URL + result.data.name;
    });
    this.styleElem.value = '';
  }
  styledeleteImg(item) {
    console.log(item,'iiiiiiiiiiii')
    this.stylephotos = "";
    // item &&
    // this.stylephotos.splice(this.photos.indexOf(item), 1);
  }


  // 省市联动
  articleP='1'
  articleC='2'
  pageForm = this.formBuilder.group({
      province: [this.cp.u.province, [Validators.required]],
      city: [this.cp.u.city, [Validators.required]],
      district: [this.cp.u.district, [Validators.required]],
      gender: [this.cp.u.gender, [Validators.required]],
      nickname: [this.cp.u.nickname, [Validators.required, Validators.minLength(this.cp.u.nickname ? 1 : 2)]],
      keyid: [this.cp.u.keyid, [Validators.required, Validators.pattern('(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)')]],
      real_name: [this.cp.u.real_name, [Validators.required, Validators.pattern('^[\u4E00-\u9FA5A-Za-z]{2,}$')]]
  });

  change(t) {
    this.districts_t = t
    if(t <= 34  ){
      this.region(t);
        for(let i = 0;i< this.Plist.length;i++){
            if(this.Plist[i].region_id == t){
                this.articleP = this.Plist[i].region_name
            }
        }
    }else if(t>34 && t<398){
        this.region(t);
        for(let i =0;i< this.city.length;i++){
            if(this.city[i].region_id == t){
                this.articleC = this.city[i].region_name
            }
        }
    }else{
     
    }
  }
  sexChange(){
    this.sexCitySelect = [this.sex];
  }
  region(t) {
      this.cp.getData("region/children", {
          parent_id: t
      }).then((t: any) => {
          this.city = t;
          2 == t[0].region_type ? this.cities = t : 3 == t[0].region_type ? this.districts = t : this.provinces = t
      })
  }

  //修改施工长个人中心
  editPerson(){
    let time = this.cp.u.user_profile.birth_year;

    let t1 = time.slice(0,4);
    let t2 = time.slice(5);
    console.log(t1,t2,'这是修改的出生年月日222222')
    let strengStr = this.styleTypeFn.toString();
    this.cp.getData("user_profile/edit",{
        name:this.cp.u.user_profile.name,
        source_from:'',
        photo:this.stylephotos,
        wechat:this.cp.u.user_profile.wechat,
        birth_year:t1,
        birth_month:t2,
        strengths:strengStr || this.cp.u.user_profile.strengths,
        keyid_front_pic:this.cardzPhotos,    //省份证正面图片
        keyid_back_pic:this.cardfPhotos,     //身份证反面图片
        // case_pics:this.photos,
        // words:this.cp.u.user_profile.words
    }).then((res:any) => {
      if(res.code = "0"){
        this.cp.u.user_profile.strengths = strengStr;
        this.cp.u.user_profile.photo_url = "";
        this.cp.u.user_profile.photo_url = this.stylephotos; 
        this.cp.u.user_profile.keyid_front_pic_url = this.cardzPhotos;   //身份证正面图片
        this.cp.u.user_profile.keyid_back_pic_url = this.cardfPhotos;    //身份证反面照片
        // if(this.cp.u.user_profile.strengths){
          for(let i=0;i<this.styleTabs.length;i++){
            if(this.styleTypeFn.length>0){
              for(let j=0;j<this.styleTypeFn.length;j++){
                if(this.styleTabs[i]==this.styleTypeFn[j]){
                  this.buttonClickStyle[i] = i;
                }
              }
            }
          }
        // }
        this.cp.setU(this.cp.u);
      }
    })
    var t = this.pageForm.value;
    this.cp.getData("user/account", t).then((n: any) => {
        n.status ? (this.cp.setU(n.data), this.cp.toast(n.msg), this.cp.pop()) : this.cp.toast(n.msg)
    })
    this.lookWork();
  }
  // 查看工作经历
  lookWork(){
    this.cp.getData("user_work_experience/getlist",{
    }).then((res:any) => {
      this.work = res.data;
    })
  }
  ishardShow = false;
  ishardShowedit = false;
  hardStyle = 0;
  type = "xd";
  wordId = null;
  addcontent = "";
  addcompany = "";
  addstartdate = "";
  hardStyleedit = 0;
  typeedit = "xd";
  //开始时间
  startTime: null;
  endTime: null;

   // 工作经历的弹窗
   hardcoverClick($event, items, index) {
     console.log(items)
     
    this.hardStyle = index;
    this.type = items;
    this.ishardShow = !this.ishardShow;
  }
  closeWork(){
    this.ishardShow = !this.ishardShow;
  }
  editWorkClick($event, item){
    console.log(item.id,'nnnnnnnnn')
    this.wordId = item.id;
    this.addstartdate = item.start_date + '-' + item.end_date;
    this.addcompany = item.company;
    this.addcontent = item.content;
    this.ishardShowedit = !this.ishardShowedit;
  }

  work = [];

  // 弹窗
  presentToast() {
    let toast = this.toastCtrl.create({
      message: '删除成功',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
 
  // 添加工作经历
  addWork(){
    let time = this.addstartdate;
    let t1 = time.slice(0,10);
    let t2 = time.slice(11);
    console.log(t1,t2);
    this.cp.getData("user_work_experience/add",{
      start_date: t1,
      end_date: t2,
      company: this.addcompany,
      content: this.addcontent
    }).then((res:any) => {
      if(res.msg == "添加成功"){
        this.ishardShow = false;
        this.lookWork();
      }
      console.log(res,'这是工作经历')
    })
  }

  // 删除工作经历
  deteleWork(id){
    this.cp.getData("user_work_experience/delete",{
      id:id
    }).then((res:any) => {
      if(res.msg == "移动到回收站成功"){
        this.presentToast();
        this.lookWork();
      }
      console.log(res,'这是删除工作经历')
    })
  }

  // 修改工作经历
  editWork(id){
    let time = this.addstartdate;
    let t1 = time.slice(0,10);
    let t2 = time.slice(11);
    this.cp.getData("user_work_experience/edit",{
      id:this.wordId,
      start_date: t1,
      end_date: t2,
      company: this.addcompany,
      content: this.addcontent
    }).then((res:any) => {
      console.log(res.data,'这是修改工作经历')
      if(res.msg=="编辑成功"){
        this.ishardShowedit = false;
        this.lookWork();
      }
    })
  }
  ionViewDidLoad() {
    console.log(this.cp.u,'这是施工长的登陆信息')
    this.lookWork();   //工作经历
    this.nickname = this.cp.u.nickname;
    this.stylephotos = this.cp.u.user_profile.photo_url;
    // this.photos = this.cp.u.user_profile.case_pics_arr;
    this.cardzPhotos = this.cp.u.user_profile.keyid_front_pic_url;   //身份证正面图片
    this.cardfPhotos = this.cp.u.user_profile.keyid_back_pic_url;    //身份证反面照片
    console.log(this.cardzPhotos,this.cardfPhotos,'身份证正反面图片')
    if(this.cardzPhotos == ""){
      this.isShowImg = false;
      this.photoZShow = true;
    }else{
      this.isShowImg = true;
      this.photoZShow = false;
    }

    if(this.cardfPhotos == ""){
      this.isFanShowImg = false;
      this.photoShow = true;
    }else{
      this.isFanShowImg = true;
      this.photoShow = false;
    }
    let style = this.cp.u.user_profile.strengths;
    if(this.cp.u.user_profile.strengths == null){
      return false
    }else if(this.cp.u.user_profile.strengths !== null){
      style = style.split(',');
    }
    
    if(this.cp.u.user_profile.strengths){
      for(let i=0;i<this.styleTabs.length;i++){
        if(style.length>0){
          for(let j=0;j<style.length;j++){
            if(this.styleTabs[i]==style[j]){
              this.buttonClickStyle[i] = i;
            }
          }
        }
      }
    }
    this.cp.u.user_profile.strengths = style;
    this.cp.checkLogin().then(loaded=>{
      if(loaded){
      }
    })
    this.cp.getData("region/children", {
      parent_id: 1
    }).then((t: any) => {
      this.Plist = t;
    })
  //  上传图片实例化
    // this.formElem = this.form.nativeElement;
    // this.fileElem = this.formElem.firstElementChild;
    this.styleformElem = this.form1.nativeElement;
    this.styleElem= this.styleformElem.firstElementChild;

    this.cardzformElem = this.form2.nativeElement;
    this.cardzElem= this.cardzformElem.firstElementChild;

    this.cardfformElem = this.form3.nativeElement;
    this.cardfElem= this.cardfformElem.firstElementChild;
  }

}
