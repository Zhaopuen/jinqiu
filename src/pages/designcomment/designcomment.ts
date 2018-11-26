import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the DesigncommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'designcomment'
})
@Component({
  selector: 'page-designcomment',
  templateUrl: 'designcomment.html',
})
export class DesigncommentPage {

  @ViewChild('form') form;
  fileElem: any;
  formElem: any;
  photos: any = [];
  content = '';
  designrwall = 0;
  ratings = "";
  evaluateType = [
    {title:"好评",id:"0",pic:"../../assets/imgs/check.png",pic_checked:"../../assets/imgs/checked.png"},
    {title:"中评",id:"1",pic:"../../assets/imgs/check.png",pic_checked:"../../assets/imgs/checked.png"},
    {title:"差评",id:"2",pic:"../../assets/imgs/check.png",pic_checked:"../../assets/imgs/checked.png"}
  ];
  evaluateId:-1;
  //星级评价
  scoreCell = [
    {id:0,title:"商品质量",star:[
      {pic:"../../assets/imgs/score.png",pid:0},
      {pic:"../../assets/imgs/score.png",pid:1},
      {pic:"../../assets/imgs/score.png",pid:2},
      {pic:"../../assets/imgs/score.png",pid:3},
      {pic:"../../assets/imgs/score.png",pid:4},
      ],score:0},
    {id:1,title:"外观颜色",star:[
      {pic:"../../assets/imgs/score.png",pid:0},
      {pic:"../../assets/imgs/score.png",pid:1},
      {pic:"../../assets/imgs/score.png",pid:2},
      {pic:"../../assets/imgs/score.png",pid:3},
      {pic:"../../assets/imgs/score.png",pid:4},
      ],score:0},
    {id:2,title:"物流",star:[
      {pic:"../../assets/imgs/score.png",pid:0},
      {pic:"../../assets/imgs/score.png",pid:1},
      {pic:"../../assets/imgs/score.png",pid:2},
      {pic:"../../assets/imgs/score.png",pid:3},
      {pic:"../../assets/imgs/score.png",pid:4},
      ],score:0},
    {id:3,title:"客服",star:[
      {pic:"../../assets/imgs/score.png",pid:0},
      {pic:"../../assets/imgs/score.png",pid:1},
      {pic:"../../assets/imgs/score.png",pid:2},
      {pic:"../../assets/imgs/score.png",pid:3},
      {pic:"../../assets/imgs/score.png",pid:4},
      ],score:0},
  ];


  //上传图片合集
  imgList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {
  }

  ionViewDidLoad() {
    this.formElem = this.form.nativeElement;
    this.fileElem = this.formElem.firstElementChild;
  }
  //评价
  changeImg(id,i){
    this.evaluateId = id;
    this.designrwall = i;
    console.log(this.evaluateId,'0000000000000')
  }
  //星级评价
  setScore(rowId,colId){
    this.scoreCell[rowId].score = colId + 1;
    // let len = this.scoreCell[rowId].star.length;
    for(let i=0;i<=colId;i++){
      if(this.scoreCell[rowId].star[i].pic == "../../assets/imgs/score_checked.png"){
        if(i==3){
          this.scoreCell[rowId].star[4].pic = "../../assets/imgs/score.png";
        }else if(i==2){
          this.scoreCell[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[3].pic = "../../assets/imgs/score.png";
        }else if(i==1){
          this.scoreCell[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[2].pic = "../../assets/imgs/score.png";
        }else if(i==0){
          this.scoreCell[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[2].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[1].pic = "../../assets/imgs/score.png";
        }
      }else{
        this.scoreCell[rowId].star[i].pic = "../../assets/imgs/score_checked.png";
      }
    }
  }

  /*点击添加*/
  addImg() {
    if (this.photos.length == 5) {
      this.cp.toast('最多上传5张图片')
    } else
      this.fileElem.click()
  }

  /*上传文件*/
  uploadImg() {
    this.cp.getData('upload/index', new FormData(this.formElem)).then((result: any) => {
      if (result.code != 0)
        this.cp.toast(result.msg.indexOf('大小不符') > 0 ? '图片需小于5M' : result.msg);
      else
        this.photos.push(this.cp.WWW_URL + result.data.name);
    });
    //清空file
    this.fileElem.value = '';
  }

  /*删除文件*/
  deleteImg(item) {
    item &&
    this.photos.splice(this.photos.indexOf(item), 1);
  }

  evaluateClick(){
    this.cp.getData("goods_comment/add",{
        subject_id:1,
        order_id:2,
        goods : [{
           id:2,
           rating:this.evaluateId,
           ratings:this.scoreCell,
           pics:this.photos,
           content:this.content
        }]
    }).then(res=>{
        console.log(res)
    })
  }

}
