import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
import {Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the CustmerinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-custmerinfo',
  templateUrl: 'custmerinfo.html',
})
export class CustmerinfoPage {
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
  districts_t=0;
  districts_txt='';
  villageName='';
  articleP = '1';
  articleC = '2';
  Plist = [];
  fileElem: any;
  formElem: any;
  photos: any = []; 
  
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
  @ViewChild('form') form;
  provinces; cities; districts;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider,
    public ac: ActionSheetController,
    public formBuilder:FormBuilder,
    
  ) {
    if (!this.cp.u.id) this.cp.pop();
        else {
          this.region(1),
          this.cp.u.city && this.region(this.cp.u.province),
          this.cp.u.district && this.region(this.cp.u.city)
      }
  }
 
  pageForm = this.formBuilder.group({
      province: [this.cp.u.province, [Validators.required]],
      city: [this.cp.u.city, [Validators.required]],
      district: [this.cp.u.district, [Validators.required]],
      gender: [this.cp.u.gender, [Validators.required]],
  });

  selectedBtn(i,item){   //item是点击当前选中的button  
    if(this.buttonClickStyle[i]==i){
      this.buttonClickStyle[i] = -1
      for(let i = 0;i<this.styleTypeFn.length;i++){
        if(this.styleTypeFn[i] == item){
          this.styleTypeFn.splice(i,1)
        }
      }
    }else{
      this.buttonClickStyle[i] = i;
      this.styleTypeFn.push(item);
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
    this.cp.checkLogin().then(loaded=>{
      this.nickname = this.cp.u.nickname;
      // if(loaded){
      //   this.tel = this.cp.u.tel;
      //   this.cp.getData("region/children",{parent_id:1}).then((res:any)=>{
      //     this.provinces = res;
      //   })
      // }
    })
    console.log(this.buttonClickStyle)
    this.cp.getData("region/children", {
        parent_id: 1
    }).then((t: any) => {
        this.Plist = t
        console.log(t)
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
          console.log(t)
          2 == t[0].region_type ? this.cities = t : 3 == t[0].region_type ? this.districts = t : this.provinces = t
      })
  }
  //提交信息
  measureHouseFn(){
    var date = new Date();
    date.getHours(); 
    if( date.getHours()<8 && date.getHours()>18 ){
      this.cp.toast("感谢您对我们的信任，我们的工作人员会在上班时间与您联系");
    }
    if(this.districts != undefined){
      for(let i = 0;i<this.districts.length;i++){
        if(this.districts[i].region_id == this.districts_t){
          this.districts_txt = this.districts[i].region_name
        }
      }
    }else{
      this.cp.getData("house/add", {
        name:this.houseName,
        first_name: this.firstname,
        last_name:this.lastname,
        province:this.articleP,
        gender:this.gender,
        city:this.articleC,
        district:this.districts_txt,
        address:this.address,
        community:this.villageName,
        area:this.area,
        type:this.houseType,
        style:this.styleTypeFn,
        budget_lower_limit:this.startMoney,
        budget_upper_limit:this.endMoney,
        decoration_date_start:this.years[this.startYear].name + this.months[this.startMonth].name,
        decoration_date_end:this.years[this.endYear].name + this.months[this.endMonth].name,
        checkin_date_start:this.years[this.liveYesrS].name + this.months[this.liveMonthS].name,
        checkin_date_end:this.years[this.liveYesrE].name + this.months[this.liveMonthE].name,
        remark:this.expect
      }).then((n: any) => {
        this.cp.toast("感谢您对我们的信任，稍后会有我们的工作人员与您联系");
      })
    }
  }

  

  myhouseList(){
    // var t = this.pageForm.value;
    this.cp.getData("house/getlist",{
      id:this.navParams.get("id"),
      // t
    }).then((n:any)=>{
      let houselist = n.data[0];
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
      this.startYear = houselist.decoration_date_start_year;
      this.startMonth = houselist.decoration_date_start_month;
      this.endYear = houselist.decoration_date_end_year;
      this.endMonth = houselist.decoration_date_end_month;
      this.liveYesrS = houselist.checkin_date_start_year;
      this.liveMonthS = houselist.checkin_date_start_month;
      this.liveYesrE = houselist.checkin_date_end_year;
      this.liveMonthE = houselist.checkin_date_end_month;
      this.styleTypeFn = houselist.style.split(",");
      // this.districts_txt = houselist.district;
      // this.articleP = houselist.province;
      // this.articleC = houselist.articleC;
      // this.photos = houselist.decoration_effect_pics;
      // this.stylephotos = houselist.apartment_layout_pics; 
      for(let i=0;i<this.styleTabs.length;i++){
        if(this.styleTypeFn.length>0){
          for(let j=0;j<this.styleTypeFn.length;j++){
            if(this.styleTabs[i]==this.styleTypeFn[j]){
              this.buttonClickStyle[i] = i;
            }
          }
        }
      }
    })
  }

}
