import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController  } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
import {Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the MyownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'myown',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-myown',
  templateUrl: 'myown.html',
})
export class MyownPage {
  //装修风格
  years:any = [
    {name:"2018",value:0},
    {name:"2019",value:1},
    {name:"2020",value:2},
    {name:"2021",value:3},
    {name:"2022",value:4},
    {name:"2023",value:5},
    {name:"2024",value:6},
    {name:"2025",value:7}
  ];
  months:any = [
    {name:"一月",value:0},
    {name:"二月",value:1},
    {name:"三月",value:2},
    {name:"四月",value:3},
    {name:"五月",value:4},
    {name:"六月",value:5},
    {name:"七月",value:6},
    {name:"八月",value:7},
    {name:"九月",value:8},
    {name:"十月",value:9},
    {name:"十一月",value:10},
    {name:"十二月",value:11}
  ];
  tel:any = "";
  nickname:any = "";        //昵称
  lastname:any = "";        //姓
  firstname:any = "";       //名
  gender:any = "";          //性别
  province:any = "";        //省
  city:any = "";            //市
  district:any = "";        //区
  address:any = "";         //详细地址
  area:any = "";            //待量房屋面积
  decorationType:any = "";  //装修类型
  startMoney:any = "";      //费用预算起始值
  endMoney:any = "";        //费用预算结束值
  startTime:any = "";       //计划装修起始时间
  endTime:any = "";         //计划装修结束时间
  startLive:any = "";       //希望入住时间
  endLive:any = "";
  styleTypeFn:any = [];
  houseType='';
  endMonth='';
  liveYesrS='';
  liveMonthS='';
  liveYesrE='';
  liveMonthE='';
  expect='';
  startYear='';
  startMonth='';
  endYear='';
  houseName='';
  districts_t = "3";
  districts_txt='';
  villageName='';
  articleP = '1';
  articleC = '2';
  Plist = [];
  fileElem: any;
  formElem: any;
  photos: any = []; 
  @ViewChild('form') form;
  myhousename = "";   //房屋名称
  myxing = "";        //姓氏
  myname = "";        //名字
  mysex = "";         //姓氏
  myadress = "";      //房屋地址
  myxiaoqu = "";      //小区名字
  mydetailaddress = "";    //详细地址
  proId = "";
  cityId = "";
  droId = "";
  styleTabs = ["现代风格","地中海","欧式风格","美式风格","中式现代","中式复古","北欧风格","日式风格"];
  sexCitySelect = [];
  buttonClickStyle=[-1,-1,-1,-1,-1,-1,-1,-1];
  sex = '';
  styleElem: any;
  styleformElem: any;
  stylephotos: any = [];
  houseListImg: any = [];
  @ViewChild('form1') form1;
  provinces; cities; districts;
  pageForm = this.formBuilder.group({
      // province: [this.cp.u.province, [Validators.required]],
      // city: [this.cp.u.city, [Validators.required]],
      // district: [this.cp.u.district, [Validators.required]],
      gender: [this.cp.u.gender, [Validators.required]],
      nickname: [this.cp.u.nickname, [Validators.required, Validators.minLength(this.cp.u.nickname ? 1 : 2)]],
      keyid: [this.cp.u.keyid, [Validators.required, Validators.pattern('(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)')]],
      real_name: [this.cp.u.real_name, [Validators.required, Validators.pattern('^[\u4E00-\u9FA5A-Za-z]{2,}$')]]
  });
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider,
    public ac: ActionSheetController,
    public formBuilder:FormBuilder,
    
  ) {
    if (!this.cp.u.id) {
      // this.cp.pop()
    }
        else {
          this.region(1),
          this.cp.u.city && this.region(this.cp.u.province),
          this.cp.u.district && this.region(this.cp.u.city)
      }
  }
  sexChange() {
    this.sexCitySelect = [this.sex];
    console.log(this.sexCitySelect, '1212121')
  }
  change(t) {
    console.log(t)
    this.region(t)
    console.log(this.city.length,'pppp')
    if(t <= 34  ){
        for(let i = 0;i< this.Plist.length;i++){
            if(this.Plist[i].region_id == t){
                console.log( this.Plist[i].region_name)
                this.articleP = this.Plist[i].region_id
                console.log(this.articleP)
            }
        }
    }else if(t>34){
        for(let i =0;i< this.city.length;i++){
            if(this.city[i].region_id == t){
                console.log( this.city[i].region_name)
                this.articleC = this.city[i].region_id
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

selectedBtn(i,item){
  if(this.buttonClickStyle[i]==i){
    this.buttonClickStyle[i] = -1;
    for(let j = 0;j<this.styleTypeFn.length;j++){
      if(this.styleTypeFn[j] == i){
        this.styleTypeFn.splice(j,1);
      }
    }
  }else{
    this.buttonClickStyle[i] = i;
    this.styleTypeFn.push(i);
  }
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

  // 第二次上传图片
  styleaddImg() {
    if (this.stylephotos.length == 10) {
      this.cp.toast('最多上传10张图片')
    } else
      this.styleElem.click()
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
  ionViewDidLoad() {
    this.cp.getData("region/children", {
      parent_id: 1
    }).then((t: any) => {
      this.Plist = t;
      console.log(t);
    })
    this.styleformElem = this.form1.nativeElement;
    this.styleElem= this.styleformElem.firstElementChild;
    this.formElem = this.form.nativeElement;
    this.fileElem = this.formElem.firstElementChild;
    this.myhouseList();
  }
  //选择省
  chooseProvince(){
    let cid = this.province;
    this.getCity(cid)
  }
  //选择市
  chooseCity(){
    let did = this.city;
    this.getDistrict(did);
  }
  //获取市
  getCity(c){
    this.cp.getData("region/children",{parent_id:c}).then(res=>{
      this.cities = res;
    })
  }
  //获取区
  getDistrict(d){
    this.cp.getData("region/children",{parent_id:d}).then(res=>{
      this.districts = res;
    })
  }
  
  //提交信息
  measureHouseFn(){
    let stylestyle = this.styleTypeFn;
    var date = new Date();
    date.getHours(); 
    if( date.getHours()<8 && date.getHours()>18 ){
      this.cp.toast("感谢您对我们的信任，我们的工作人员会在上班时间与您联系");
    }
    // console.log(1111)
    // if(this.districts != undefined){
    //   console.log(2222)
    //   for(let i = 0;i<this.districts.length;i++){
    //     console.log(444444)
    //     if(this.districts[i].region_id == this.districts_t){
    //       console.log(55555555)
    //       this.districts_txt = this.districts[i].region_id
    //     }
    //   }
    // }else{
      this.cp.getData("house/edit", {
        id:this.navParams.get("id"),
        name:this.houseName,
        first_name: this.firstname,
        last_name:this.lastname,
        province:this.articleP,
        gender:this.gender=="男"?1:2,
        city:this.articleC,
        district:this.districts_txt,
        address:this.address,
        community:this.villageName,
        area:this.area,
        type:this.houseType,
        style:stylestyle,
        apartment_layout_pics_arr: this.photos,
        decoration_effect_pics_arr: this.stylephotos,
        budget_lower_limit:this.startMoney,
        budget_upper_limit:this.endMoney,
        decoration_date_start: this.myDate,
        decoration_date_end:this.myDateend,
        checkin_date_start:this.myDatelive,
        checkin_date_end:this.myDateendlive,
        remark:this.expect
      }).then((n: any) => {
        if(n.code == 0){
          this.cp.toast("感谢您对我们的信任，稍后会有我们的工作人员与您联系");
        }else{
          this.cp.toast(n.msg);
        }
        // console.log(n,'这是我的房屋的修改')
        
      })
    // }
  }

  
  myDate = "";
  myDateend = "";
  myDatelive = "";
  myDateendlive = "";
  myhouseList(){
    this.cp.getData("house/getlist",{
      id:this.navParams.get("id"),
      // t
    }).then((n:any)=>{
      console.log(n.data,'这是房屋信息')
      // let strengStr = this.styleTypeFn.toString();
      let houselist = n.data[0];
      console.log(houselist.decoration_date_start,'777777777')
      this.houseName = houselist.name;
      this.firstname = houselist.first_name;
      this.lastname = houselist.last_name; 
      this.villageName = houselist.community;
      this.address = houselist.address;
      this.area = houselist.area;
      this.startMoney = houselist.budget_lower_limit;
      this.endMoney = houselist.budget_upper_limit;
      this.expect = houselist.remark;
      this.houseType = houselist.type;
      this.gender = houselist.gender;
      this.photos = houselist.apartment_layout_pics_arr;
      this.stylephotos = houselist.decoration_effect_pics_arr;
      this.myDate = houselist.decoration_date_start;
      console.log(this.myDate,'5656565656565')
      this.myDateend = houselist.decoration_date_end;
      this.myDatelive = houselist.checkin_date_start;
      this.myDateendlive = houselist.checkin_date_end;
      let style = houselist.style_text;
      console.log(style,'000000')
      if(this.cp.u.user_profile.strengths == null){
        return false
      }else if(this.cp.u.user_profile.strengths !== null){
        style = style.split(' ');
      }
      if(houselist.style_text){
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

      houselist.style_text = style ;
      console.log(style,'yyyyyyyyyyy')
      
      
      // this.districts_txt = houselist.district;
      // this.articleP = houselist.province;
      // this.articleC = houselist.articleC;

    })
  }
}



