import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the DesignedcommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'designedcomment'
})
@Component({
  selector: 'page-designedcomment',
  templateUrl: 'designedcomment.html',
})
export class DesignedcommentPage {
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DesignedcommentPage');
    this.cp.getData("order/getlist",{
      // status:5,
      subject_id:3,
      id:this.navParams.get('id'),
    }).then((res:any)=>{
      console.log(res,'这是设计师的查看评价')
    })
  }

}
