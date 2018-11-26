import { Component ,ViewChild} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the MeasureHousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'measure-house',
})
@Component({
  selector: 'page-measure-house',
  templateUrl: 'measure-house.html',
})
export class MeasureHousePage {

  fileElem: any;
  formElem: any;
  styleElem: any;
  styleformElem: any;
  photos: any = [];
  stylephotos: any = [];
  listPhotos: any = [];
  name = "";
  tel = "";
  tableData = []
  @ViewChild('form') form;
  @ViewChild('form1') form1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cp: CommonProvider,
    public formBuilder:FormBuilder
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

  ionViewDidLoad() {
    let that = this;
    that.getData()
    this.cp.checkLogin2().then(loaded=>{
      if(loaded) {
        this.cp.getData("region/children", {
          parent_id: 1
      }).then((t: any) => {
          this.Plist = t;
          console.log(t);
      })
      //  上传图片实例化
       this.styleformElem = this.form1.nativeElement;
       this.styleElem= this.styleformElem.firstElementChild;
       this.formElem = this.form.nativeElement;
       this.fileElem = this.formElem.firstElementChild;
      }
    })

    if(this.cp.u.id){
      this.tel = this.cp.u.tel;
    }

  }

  // styleTabs = [
  //   {id:'0',title:'现代风格',checked: false},
  //   {id:'1',title:'地中海',checked: false},
  //   {id:'2',title:'欧式风格',checked: false},
  //   {id:'3',title:'美式风格',checked: false},
  //   {id:'4',title:'中式现代',checked: false},
  //   {id:'5',title:'中式复古',checked: false},
  //   {id:'6',title:'北欧风格',checked: false},
  //   {id:'7',title:'日式风格',checked: false},
  // ];
  years=[
    {name:"2018年",value:0},
    {name:"2019",value:1},
    {name:"2020",value:2},
    {name:"2021",value:3},
    {name:"2022",value:4},
    {name:"2023",value:5},
    {name:"2024",value:6},
    {name:"2015",value:7}
  ];
  months=[
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
  ]
  radio=['搜索引擎','广告','装修公司','设计师','施工长','本地客服','朋友介绍','宣传单']
  houseImgs=["1"];
  likeImgs=[""];
  buttonClickStyle=[-1,-1,-1,-1,-1,-1,-1,-1];
  styleTypeFn=[];
  lastname='';
  firstname='';
  gender='';
  address='';
  area='';
  houseType='';
  startMoney='';
  endMoney='';
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
  Plist = [];
  sexCitySelect = [];
  articleP = [];
  articleC = [];
  city = [];
  sex = '';
  designOrderDataxs = null;
  designRadio = 100;
  designPlace = 0;
  sourceFrom:any = "";
  //省市区
  prov:any = "";
  ct:any = "";
  dt:any = "";
  checked = false;
  sexsex = -1;

  // 期望装修风格选中
  // selectedBtn(i,item){
  //   if(this.buttonClickStyle[i]==i){
  //     this.buttonClickStyle[i] = -1;
  //     this.checked = true;
  //     for(let j = 0;j<this.styleTypeFn.length;j++){
  //       if(this.styleTypeFn[j] == i){
  //         this.styleTypeFn.splice(j,1);
  //       }
  //     }
  //   }else{
  //     this.checked = false;
  //     this.buttonClickStyle[i] = i;
  //     this.styleTypeFn.push(i);
  //   }
  // }

  // 期望装修风格点击事件
  getData(){
    var that = this;
    let styleTabs = [
      {id:'0',title:'现代风格',checked: true},
      {id:'1',title:'地中海',checked: true},
      {id:'2',title:'欧式风格',checked: true},
      {id:'3',title:'美式风格',checked: true},
      {id:'4',title:'中式现代',checked: true},
      {id:'5',title:'中式复古',checked: true},
      {id:'6',title:'北欧风格',checked: true},
      {id:'7',title:'日式风格',checked: true},
    ];
    that.tableData = styleTabs;
    console.log(that.tableData)
  }
  select(row){
    let that = this;
    that.tableData[row].checked = !that.tableData[row].checked;
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
      // if( this.cp.WWW_URL + result.data.name == this.cp.WWW_URL + result.data.name){
      //   this.cp.toast("您上传的图片已存在，请重新上传");
      //   return false;
      // }
      if (result.code != 0){
        this.cp.toast(result.msg)
      }else{
        this.photos.push(this.cp.WWW_URL + result.data.name);
      }
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

  // 省市联动
  pageForm = this.formBuilder.group({
      province: [this.cp.u.province, [Validators.required]],
      city: [this.cp.u.city, [Validators.required]],
      district: [this.cp.u.district, [Validators.required]],
      gender: [this.cp.u.gender, [Validators.required]],
  });

  provinces; cities; districts;
  change(t) {
    this.districts_t = t;
    if(t <= 34  ){
      this.region(t);
        for(let i = 0;i< this.Plist.length;i++){
            if(this.Plist[i].region_id == t){
                this.articleP = this.Plist[i].region_name;
            }
        }
    }else if(t>34 && t<398){
        this.region(t);
        for(let i =0;i< this.city.length;i++){
            if(this.city[i].region_id == t){
                this.articleC = this.city[i].region_name;
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

  // 期望装修费用的大小判断
  moneyVal(){
    console.log(55555)
    if(this.endMoney < this.startMoney){
      this.cp.toast("后面的价钱不能小于前面的价钱");
    }
  }

  // 判断装修时间
  timePan(){
    console.log(7777777)
    if( this.myDateend<this.myDate  ){
      console.log(888888888)
      this.cp.toast("起始时间不能大于终止时间")
    }
  }

  myDate = "";
  myDateend = "";
  myDatelive = "";
  myDateendlive = "";
  houseval = -1;
  sourceval = -1;
  sexsex1(val){
    this.sexsex = val;
  }
  housenew(val){
    this.houseval = val;
  }
  stylekown(val){
    this.sourceval = val;
  }
  measureHouseFn(){
    let that = this;
    let listId = [];
    that.tableData.forEach(function(item){
      console.log(item)
      if(item.checked==false){
        console.log(item.id)
        listId.push(item.id);
      }
    })
    console.log(listId,'listId555555')
    var date = new Date();
    date.getHours();
    console.log(date.getHours())
    if( date.getHours()<8 && date.getHours()>18 ){
      this.cp.toast("感谢您对我们的信任，我们的工作人员会在上班时间与您联系");
    }else{
      this.cp.toast("感谢您对我们的信任，稍后会有我们的工作人员与您联系");
    }
    if(this.districts != undefined){
      for(let i = 0;i<this.districts.length;i++){
        if(this.districts[i].region_id == this.districts_t){
          this.districts_txt = this.districts[i].region_name
        }
      }
    }
    if(this.houseName == ''){
      this.cp.toast("请填写房屋名称");
    }else if(this.firstname == '' || this.lastname == ''){
      this.cp.toast("请填写姓名");
    }else if(this.dt == ''){
      this.cp.toast("请选择地址");
    }else if(this.villageName == ''){
      this.cp.toast("请填写小区名");
    }else if(this.address == ''){
      this.cp.toast("请填写详细地址");
    }else if(this.area == ''){
      this.cp.toast("请填写待量房屋面积");
    }else 
    // if(this.gender == ''){
    //   this.cp.toast("请选择性别");
    // }
    // else
    //  if(this.houseType == ''){
    //   this.cp.toast("请填写装修类型");
    // }
    // else
     if(this.styleTypeFn == []){
      this.cp.toast("请选择期待装修风格");
    }else if(this.startMoney == '' || this.endMoney == '' || this.endMoney < this.startMoney){
      this.cp.toast("请填写预算装修费用");
    }else if(this.myDate == '' || this.myDateend == ''){
      console.log(this.myDate,this.myDateend,'8989584985948594')
      this.cp.toast("请填写期待装修起止时间");
    }else if(this.myDatelive == '' || this.myDateendlive == ''){
      console.log(this.myDatelive,this.myDateendlive,'8989584985948594')
      this.cp.toast("请填写期望入住起止时间");
    }else 
    // if(this.sourceFrom == ""){
    //   this.cp.toast("请选择方式来源");
    // }else 
    if(this.expect == ""){
      this.cp.toast("请填写您对房屋的期待")
    }else{
      this.cp.getData("house/add", {
        name: this.houseName,
        first_name: this.firstname,
        last_name:this.lastname,
        province:this.prov,
        gender:this.sexsex,
        city:this.ct,
        district:this.dt,
        address:this.address,
        community:this.villageName,
        area:this.area,
        type:this.houseval,
        style:listId,
        budget_lower_limit:this.startMoney,
        budget_upper_limit:this.endMoney,
        decoration_date_start:this.myDate,
        decoration_date_end: this.myDateend,
        checkin_date_start: this.myDatelive,
        checkin_date_end: this.myDateendlive,
        remark:this.expect,
        apartment_layout_pics:this.photos,
        decoration_effect_pics:this.stylephotos,
        source_from:this.sourceval
      }).then((n: any) => {
        if(n.code == 0){
          this.cp.toast("感谢您对我们的信任，稍后会有我们的工作人员与您联系");
          this.cp.goto({},'houselist')
        }
      })
    }
  }

}
