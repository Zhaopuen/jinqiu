import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the MycollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : 'mycollection',
})
@Component({
  selector: 'page-mycollection',
  templateUrl: 'mycollection.html',
})
export class MycollectionPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cp: CommonProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycollectionPage');
    this.collectList();
  }

  collectInfo = [];
  checkedTop:any = [];
  checkedAll:any = false;
  list = [];
  total:any = 0;
  len:any = 0;
  // 商品收藏列表
  collectList(){
    this.cp.getData("collection/getlist",{
      type:0
    }).then((res:any) => {
      this.collectInfo = res.data;
      console.log(res,'这是收藏商品的列表')
    })
  }

 //单个品牌列表选择
 brandCheck(i,j){
  if(this.collectInfo[i][j].checked==true){
    this.checkedTop[i] = false;
    this.checkedAll = false;
  }
  this.collectInfo[i][j].checked = !this.collectInfo[i][j].checked;
  //过滤品牌列表
  let brandArr = this.collectInfo[i].filter(ele=>{
    return ele.checked == true;
  });
  if(brandArr.length == this.collectInfo[i].length){
    this.checkedTop[i] = true;
  }
  //过滤所有订单列表
  let nArr = this.list.filter((elem) => {
    return elem.checked == true;
  });
  this.len = nArr.length;
  if(nArr.length==this.list.length){
    this.checkedAll = true;
    this.checkedTop[i] = true;
  }
  if(nArr.length>0){
    this.total = 0;
    for(let item of nArr){
      this.total += item.total;
    }
  }else{
    this.total = 0;
  }
}

  // 删除收藏商品
  deleteCollect(id){
    this.cp.getData("collection/toggle",{
      collection_id:id
    }).then((res:any) => {
      if(res.msg == "移动到回收站成功"){
        this.collectList();
      }
      console.log(res)
    })
  }

}
