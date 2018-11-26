import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the SjpersonaldataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'sjpersonaldata',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-sjpersonaldata',
  templateUrl: 'sjpersonaldata.html',
})
export class SjpersonaldataPage {

  styleTabs = ["现代风格","地中海","欧式风格","美式风格","中式现代","中式复古","北欧风格","日式风格"];
  houseImgs = ["1"];
  likeImgs = [""];
  buttonClickStyle = [-1, -1, -1, -1, -1, -1, -1, -1];
  styleTypeFn = [];
  gender = '';
  rellyName = '';
  collectPhoto = '';
  districts_t = 0;
  districts_txt = '';
  bornYearMonth = '';
  styleElem: any;
  styleformElem: any;
  fileElem: any;
  formElem: any;
  cradzhengElem: any;
  cardzhengformElem: any;
  cradfanElem: any;
  cardfanformElem: any;
  photos: any = [];
  lifePhotos: any = [];
  Plist = [];
  sexCitySelect = [];
  // articleP = [];
  // articleC = [];
  city = [];
  sex = '';
  designOrderDataxs = null;
  designRadio = 100;
  designPlace = 0;
  real_name = "";
  tel = "";
  wechat_unionid = "";
  stylephotos = [];
  nickname = "";
  cardzheng = [];
  cardfan = [];
  birth_month = "";
  startdate = "";
  company = "";
  content = "";
  designList = '';   //工作经历列表
  @ViewChild('form') form;
  @ViewChild('form1') form1;
  @ViewChild('form2') form2;
  @ViewChild('form3') form3;
  // Plist=[]
  //   city=[]
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

  provinces; cities; districts;
  province: any = "";
  city1: any = "";
  district: any = "";
  pro: any = "";
  ct: any = "";
  dis: any = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {
    if (!this.cp.u.id) this.cp.pop();
        else {
            // if(this.cp.u.keyid || this.cp.u.tel)
            // addController()
            //s.auth = [this.cp.settings.auth, Validators.minLength(3)],

            this.region(1),
            this.cp.u.city && this.region(this.cp.u.province),
            this.cp.u.district && this.region(this.cp.u.city)
        }
  }

  selectedBtn(i, item) {
    if (this.buttonClickStyle[i] == i) {
      this.buttonClickStyle[i] = -1
      for (let i = 0; i < this.styleTypeFn.length; i++) {
        if (this.styleTypeFn[i] == item) {
          this.styleTypeFn.splice(i, 1)
        }
      }
    } else {
      this.buttonClickStyle[i] = i
      this.styleTypeFn.push(item)
    }
  }
  /*图片操作*/
  addImg() {
    if (this.photos.length == 6) {
      this.cp.toast('最多上传6张图片')
    } else
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

  photoShow = true;
  // 上传生活照片
  styleaddImg() {
    if (this.stylephotos.length == 1) {
      this.cp.toast('最多上传1张图片')
    } 
    // else if(this.stylephotos.length == 0){
    //   this.photoShow = true
    // } 
    else {
      this.styleElem.click()
    } 
  }
  styleuploadImg() {
    this.cp.getData('upload/index', new FormData(this.styleformElem)).then((result: any) => {
      if (result.code != 0)
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      else
        this.stylephotos.push(this.cp.WWW_URL + result.data.name);
    });
    this.styleElem.value = '';
  }
  styledeleteImg(item) {
    item &&
    this.stylephotos.splice(this.stylephotos.indexOf(item), 1);
  }

  sexChange() {
    this.sexCitySelect = [this.sex];
    console.log(this.sexCitySelect, '1212121')
  }
  
  editWorkClickcs() {
    this.ishardShowedit = false;
  }
  //修改设计师个人中心
  editPerson() {
    let time = this.cp.u.user_profile.birth_year;
    let t1 = time.slice(0, 4);
    let t2 = time.slice(5);
    let strengStr = this.styleTypeFn.toString();
    console.log(strengStr,'00000000')
    console.log(this.styleTypeFn,'999999')
    // return;
    this.cp.getData("user_profile/edit", {
      name: this.cp.u.user_profile.name,
      source_from: '',
      photo: this.stylephotos,
      wechat: this.cp.u.user_profile.wechat,
      birth_year: t1,
      birth_month: t2,
      strengths: strengStr,
      keyid_front_pic: '',
      keyid_back_pic: '',
      case_pics_arr: this.photos,
      words: this.cp.u.user_profile.words
    }).then((res: any) => {
      if (res.msg = "编辑成功") {
        // this.cp.u.user_profile.strengths = strengStr;
        // console.log(this.cp.u.user_profile.strengths,'iiiiiii')
        this.photos = this.cp.u.user_profile.case_pics_arr;
        // this.stylephotos = this.cp.u.user_profile.photo_url.toString();
        console.log(this.cp.u,'99999999999999')
        this.cp.setU(this.cp.u);
      }
    })
    var t = this.pageForm.value;
    this.cp.getData("user/account", t).then((n: any) => {
        n.status ? (this.cp.setU(n.data), this.cp.toast(n.msg), this.cp.pop()) : this.cp.toast(n.msg)
    })
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

  // 查看工作经历
  lookWork() {
    this.cp.getData("user_work_experience/getlist", {

    }).then((res: any) => {
      this.work = res.data;
      console.log(res.data, '这是工作经验')
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
    this.hardStyle = index;
    this.type = items;
    this.ishardShow = !this.ishardShow;
  }
  editWorkClick($event, item) {
    this.wordId = item.id;
    this.addstartdate = item.start_date + '-' + item.end_date;
    this.addcompany = item.company;
    this.addcontent = item.content;
    this.ishardShowedit = !this.ishardShowedit;
  }

  // 添加工作经历
  addWork() {
    let time = this.addstartdate;
    let t1 = time.slice(0, 10);
    let t2 = time.slice(11);
    this.cp.getData("user_work_experience/add", {
      start_date: t1,
      end_date: t2,
      company: this.addcompany,
      content: this.addcontent
    }).then((res: any) => {
      if (res.msg == "添加成功") {
        this.ishardShow = false;
        this.lookWork();
      }
    })
  }

  // 删除工作经历
  deteleWork(id) {
    this.cp.getData("user_work_experience/delete", {
      id: id
    }).then((res: any) => {
      if (res.msg == "移动到回收站成功") {
        this.presentToast();
        this.lookWork();
      }
    })
  }

  // 修改工作经历
  editWork(id) {
    let time = this.addstartdate;
    let t1 = time.slice(0, 10);
    let t2 = time.slice(11);
    this.cp.getData("user_work_experience/edit", {
      id: this.wordId,
      start_date: t1,
      end_date: t2,
      company: this.addcompany,
      content: this.addcontent
    }).then((res: any) => {
      if (res.msg == "编辑成功") {
        this.ishardShowedit = false;
        this.lookWork();
      }
    })
  }

  change(t) {
    console.log(t)
    this.region(t)
    console.log(this.city.length,'pppp')
    if(t <= 34  ){
        for(let i = 0;i< this.Plist.length;i++){
            if(this.Plist[i].region_id == t){
                console.log( this.Plist[i].region_name)
                this.articleP = this.Plist[i].region_name
                console.log(this.articleP)
            }
        }
    }else if(t>34){
        for(let i =0;i< this.city.length;i++){
            if(this.city[i].region_id == t){
                console.log( this.city[i].region_name)
                this.articleC = this.city[i].region_name
                console.log(this.articleC)
            }
        }
    }
}
region(t) {
    this.cp.getData("region/children", {
        parent_id: t
    }).then((t: any) => {
        this.city = t
         2 == t[0].region_type ? this.cities = t : 3 == t[0].region_type ? this.districts = t : this.provinces = t
    })
}
  ionViewDidLoad() {
    this.lookWork();
    this.photos = this.cp.u.user_profile.case_pics_arr;
    this.nickname = this.cp.u.nickname;
    this.pro = this.cp.u.province_text;
    this.ct = this.cp.u.city_text;
    this.dis = this.cp.u.district_text;
    this.gender = this.cp.u.gender == 1 ? "男" : this.cp.u.gender == 2 ? "女" : "";
    
    let style = this.cp.u.user_profile.strengths;
    if(this.cp.u.user_profile.strengths == null){
      return false;
    }else{
      style = style.split(',');
    }
    // style = style.split(',');
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
    this.styleTypeFn = this.cp.u.user_profile.strengths;
    // console.log(this.cp.u.user_profile.strengths,'hhhhhhhhhhh')
    this.cp.checkLogin().then(loaded => {
      console.log(this.cp.u, 'login66666')
      if (loaded) {
        // console.log(this.cp.u,'这是shejishi登陆的信息')
        // let loginInfo = this.cp.u;
        // this.real_name = loginInfo.real_name;
        // this.tel = loginInfo.tel;
        // this.wechat_unionid = loginInfo.userProfile.wechat;
        // this.bornYearMonth = loginInfo.userProfile.birth_year;
      }
    })
    this.cp.getData("region/children", {
      parent_id: 1
    }).then((t: any) => {
      this.Plist = t;
      console.log(t);
    })
    //  上传图片实例化
    this.formElem = this.form.nativeElement;
    this.fileElem = this.formElem.firstElementChild;
    this.styleformElem = this.form1.nativeElement;
    this.styleElem = this.styleformElem.firstElementChild;
  }

}
