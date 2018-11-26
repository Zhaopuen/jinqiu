import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common"

/**
 * Generated class for the MycartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name : 'mycart',
  defaultHistory : ['tabs']
})
@Component({
  selector: 'page-mycart',
  templateUrl: 'mycart.html',
})
export class MycartPage {
  num:any = 1;
  showDetails = false;
  brandList:any = [];
  types:any = [];
  checkedTop:any = [];
  checkedAll:any = false;
  list:any = [];
  otherList:any = [];
  total:any = 0;
  len:any = 0;
  nickname = "";
  btnVal:any = "展开选项";
  oId:any = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:CommonProvider) {}

  ionViewDidLoad() {
    this.cp.checkLogin2().then(loaded=>{
      this.nickname = this.cp.u.nickname;
      if(loaded) {
        this.cp.getData("cart/getlist").then((res:any) => {
          console.log(res,"cartList");
          let allList = res.data;
          let list = [];
          for(let key in allList){
            if(key[0]=="1"){
              let brand = allList[key];
              for(let item of brand){
                item.total = item.num * item.goods.now_price;
                list.push(item);
                let typeArr = [];
                for(let i in item.props_value_arr){
                  typeArr.push(item.props_value_arr[i]);
                }
                item.typeArr = typeArr;
                item.checked = false;
              }
              this.brandList.push(brand);
              for(let i=0;i<this.brandList.length;i++){
                this.checkedTop.push(false);
              }
            }else{
              let others = allList[key];
              for(let item of others){
                list.push(item);
                let typeArr = [];
                for(let i in item.props_value_arr){
                  typeArr.push(item.props_value_arr[i]);
                }
                item.typeArr = typeArr;
                item.checked = false;
                //计算价格
                item.total = typeArr[0] * typeArr[1];
              }
              this.otherList.push(others)
            }
          }
          this.list = list;
          console.log(this.brandList,this.otherList,this.list)
        });
      }else{
        this.cp.goto({view: "login"})
      }
    })
  }
  open(oid){
    if(this.oId == oid){
      this.oId = -1
    } else {
      this.oId = oid;
    }
    if(this.btnVal=="展开选项"){
      this.btnVal = "收起选项"
    }else{
      this.btnVal = "展开选项";
    }
  }
  //点击增加数量
  add(i,j,id,num){
    this.brandList[i][j].num++;
    //实时改变价格
    this.brandList[i][j].total = this.brandList[i][j].num * this.brandList[i][j].goods.now_price;
    //过滤获取所有选中的复选框
    let nArr = this.list.filter(elem => {
      return elem.checked == true;
    });
    //选中的复选框个数
    this.len = nArr.length;
    if(nArr.length>0){
      //计算总价
      this.total = 0;
      for(let item of nArr){
        this.total += item.total;
      }
    }else{
      this.total = 0;
    }
    setTimeout(()=>{
      this.cp.getData("cart/changeNum",{id:id,num:num+1}).then(res=>{})
    },500);
  }
  //点击减少数量
  reduce(i,j,id,num){
    if(this.brandList[i][j].num > 1){
      this.brandList[i][j].num--;
      //实时改变价格
      this.brandList[i][j].total = this.brandList[i][j].num * this.brandList[i][j].goods.now_price;
      //过滤获取所有选中的复选框
      let nArr = this.list.filter(elem => {
        return elem.checked == true;
      });
      //选中的复选框个数
      this.len = nArr.length;
      if(nArr.length>0){
        //计算总价
        this.total = 0;
        for(let item of nArr){
          this.total += item.total;
        }
      }else{
        this.total = 0;
      }
      setTimeout(()=>{
        this.cp.getData("cart/changeNum",{id:id,num:num-1}).then(res=>{})
      },500);
    }
  }
  //输入数量
  changeNum(i,j,id,num){
    if(num>0){
      //实时改变价格
      this.brandList[i][j].total = num * this.brandList[i][j].goods.now_price;
      //过滤获取所有选中的复选框
      let nArr = this.list.filter(elem => {
        return elem.checked == true;
      });
      //选中的复选框个数
      this.len = nArr.length;
      if(nArr.length>0){
        //计算总价
        this.total = 0;
        for(let item of nArr){
          this.total += item.total;
        }
      }else{
        this.total = 0;
      }
      setTimeout(()=>{
        this.cp.getData("cart/changeNum",{id:id,num:num}).then(res=>{})
      },500);
      //实时改变价格
    }else{
      this.cp.toast("商品数量不能为0")
    }
  }
  //修改面积
  changeArea(i,j,id,area){
    if(area>0){
      this.cp.getData("cart/changePropsValue",{id:id,props_value:{"面积":area}}).then(res=>{});
      //实时改变价格
      this.otherList[i][j].total = area * this.otherList[i][j].typeArr[0];
      //过滤获取所有选中的复选框
      let nArr = this.list.filter(elem => {
        return elem.checked == true;
      });
      //选中的复选框个数
      this.len = nArr.length;
      if(nArr.length>0){
        //计算总价
        this.total = 0;
        for(let item of nArr){
          this.total += item.total;
        }
      }else{
        this.total = 0;
      }
    }else{
      this.cp.toast("面积不能为空")
    }
  }
  //点击全选品牌列表
  checkBrand(i,check){
    //遍历品牌列表
    this.brandList[i].forEach(ele=>{
      //取反
      if(check==false){
        this.checkedTop[i] = true;
      }else{
        this.checkedTop[i] = false;
      }
      //将品牌列表的checked属性与全选按钮设为一致
      ele.checked = this.checkedTop[i];
    });
    //过滤获取所有选中的复选框
    let nArr = this.list.filter(elem => {
      return elem.checked == true;
    });
    //选中的复选框个数
    this.len = nArr.length;
    if(nArr.length>0){
      //计算总价
      this.total = 0;
      for(let item of nArr){
        this.total += item.total;
      }
    }else{
      this.total = 0;
    }
  }
  //单个品牌列表选择
  brandCheck(i,j){
    if(this.brandList[i][j].checked==true){
      this.checkedTop[i] = false;
      this.checkedAll = false;
    }
    this.brandList[i][j].checked = !this.brandList[i][j].checked;
    //过滤品牌列表
    let brandArr = this.brandList[i].filter(ele=>{
      return ele.checked == true;
    });
    if(brandArr.length == this.brandList[i].length){
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
  //点击全选所有列表
  checkAll(check){
    this.list.forEach((ele)=>{
      if(check==false){
        this.checkedAll = true;
        for(let i in this.checkedTop){
          this.checkedTop[i] = true;
        }
      }else{
        this.checkedAll = false;
        for(let i in this.checkedTop){
          this.checkedTop[i] = false;
        }
      }
      ele.checked = this.checkedAll;
    });
    let nArr = this.list.filter((elem) => {
      return elem.checked == true;
    });
    this.len = nArr.length;
    if(nArr.length>0){
      this.total = 0;
      for(let item of nArr){
        this.total += item.total;
      }
    }else{
      this.total = 0;
    }
  }
  //单个其他列表选择
  otherCheck(i,j){
    if(this.otherList[i][j].checked==true){
      this.checkedAll = false;
    }
    this.otherList[i][j].checked = !this.otherList[i][j].checked;
    let nArr = this.list.filter((elem) => {
      return elem.checked == true;
    });
    this.len = nArr.length;
    if(nArr.length==this.list.length){
      this.checkedAll = true;
      for(let k in this.checkedTop){
        this.checkedTop[k] = true;
      }
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
  //删除当前列表
  delList(id){
    this.cp.prompt("删除","确定将该商品从购物车删除吗","取消",()=>{},"确定",()=>{
      this.cp.getData("cart/delete",{id:id}).then((res:any)=>{
        //console.log(res);
        if(res.msg=="删除成功"){
          this.cp.toast("删除成功");
          setTimeout(()=>{
            this.cp.goto({},"mycart")
          },1000)
        }else{
          this.cp.toast(res.msg);
        }
      })
    })

  }
  //删除选中的列表
  delSelected(){
    let nArr = this.list.filter((elem) => {
      return elem.checked == true;
    });
    if(nArr.length==0){
      this.cp.toast("请选择要删除的商品")
    }else{
      let ids:any = [];
      for(let item of nArr){
        ids.push(item.id);
      }
      ids = ids.join(",");
      this.cp.prompt("删除","确定要删除选中的商品吗？","取消",()=>{},"确定",()=>{
        this.cp.getData("cart/delete",{id:ids}).then((res:any)=>{
          if(res.msg=="删除成功"){
            this.cp.toast("删除成功");
            setTimeout(()=>{
              this.cp.goto({},"mycart")
            },1000)
          }else{
            this.cp.toast(res.msg);
          }
        })
      })
    }
  }
  //结算
  compute(){
    let nArr = this.list.filter((elem) => {
      return elem.checked == true;
    });
    if(nArr.length==0){
      this.cp.toast("请选择要结算的商品")
    }else{
      let ids = [];
      for(let item of nArr){
        ids.push(item.id);
      }
      this.cp.goto({ids:ids,total:this.total},"myconfirmorder")
    }
  }
}

