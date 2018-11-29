import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the CooperatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'cooperate'
})
@Component({
  selector: 'page-cooperate',
  templateUrl: 'cooperate.html',
})
export class CooperatePage {
  i: Number = 0;
  question=[];
  questionIndex = 100000;
  showAlertArticle={};
  showAlertTxt = false;
  nickname:any = "";
  inputVal = "";
  classFlag = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cp: CommonProvider,public alertCtrl: AlertController) {
  }

  toggle(index){
   if(this.questionIndex == index){
    this.questionIndex = 100000
    //console.log(this.questionIndex,1111111111)
   }else{
    this.questionIndex = index
    console.log(this.questionIndex,222222222)
   }
  }

  ionViewDidLoad() {
    this.cp.init().then(loaded=>{
      if(loaded){

        this.nickname = this.cp.u.nickname;
      }else{
        this.nickname = "登录/注册"
      }
    })

    // 问答列表
    this.cp.getData("qa/getlist", {
    }).then((n:any) => {
      this.question = n.data
    })
    // 获取申明数据
    this.cp.getData("article/detail/id/5", {
    }).then((n:any) => {
      this.showAlertArticle = n
    });
  }
  showAlert() {
    // this.classFlag = row;
    this.showAlertTxt = true;
    // this.allQuestion(1);
    // const alert = this.alertCtrl.create({
    //   title: '申明',
    //   subTitle: '顾客您好！“装修问答”所有的问题回答内容不针对任何行业，公司或个人，不对顾客进行错误引导顾客您好！“装修问答”所有的问题回答内容不针对任何行业，公司或个人，不对顾客进行错误引导顾客您好！“装修问答”所有的问题回答内容不针对任何行业，公司或个人，不对顾客进行错误引导顾客您好！“装修问答”所有的问题回答内容不针对任何行业，公司或个人，不对顾客进行错误引导顾客您好！“装修问答”所有的问题回答内容不针对任何行业，公司或个人，不对顾客进行错误引导',
    //   buttons: ['确认']
    // });
    // alert.present();
  }
  showAlertFalse(){
    this.showAlertTxt = false;
  }
  getItems(){
    if(this.inputVal == ""){
      const alert = this.alertCtrl.create({
        // title: '搜索',
        subTitle: '请输入搜索的内容！',
        buttons: ['确认']
      });
      alert.present();
      return
    }
    this.cp.getData("qa/getlist", {
      question:this.inputVal
    }).then((n:any) => {
     this.question = n.data
     //console.log(this.question[0].question)
    })
  }

  // 全部
  allQuestion(row){
    this.classFlag = row;
    this.cp.getData("qa/getlist", {
      type:''
    }).then((n:any) => {
     this.question = n.data;
    })
  }

  // 装修前
  allQuestionbefore(row){
    this.classFlag = row;
    this.cp.getData("qa/getlist", {
      type:0
    }).then((n:any) => {
     this.question = n.data;
    })
  }

  // 装修中
  allQuestionIng(row){
    this.classFlag = row;
    this.cp.getData("qa/getlist", {
      type:1
    }).then((n:any) => {
     this.question = n.data;
    })
  }

  // 装修后
  allQuestionAfter(row){
    this.classFlag = row;
    this.cp.getData("qa/getlist", {
      type:2
    }).then((n:any) => {
      this.question = n.data;
    })
  }

}
