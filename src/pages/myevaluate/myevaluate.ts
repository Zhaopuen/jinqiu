import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the MyevaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off',
  name: 'myevaluate',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-myevaluate',
  templateUrl: 'myevaluate.html',
})
export class MyevaluatePage {
  @ViewChild('form') form;
  fileElem: any;
  formElem: any;
  photos: any = [];
  content = '';
  designrwall = 0;
  //商品评价
  evaluateType = [
    {title: "好评", id: "0", pic: "../../assets/imgs/check.png", pic_checked: "../../assets/imgs/checked.png"},
    {title: "中评", id: "1", pic: "../../assets/imgs/check.png", pic_checked: "../../assets/imgs/checked.png"},
    {title: "差评", id: "2", pic: "../../assets/imgs/check.png", pic_checked: "../../assets/imgs/checked.png"}
  ];
  //设计、施工订单评价
  evaluateType1 = [
    {title: "非常满意", id: "0", pic: "../../assets/imgs/check.png", pic_checked: "../../assets/imgs/checked.png"},
    {title: "满意", id: "1", pic: "../../assets/imgs/check.png", pic_checked: "../../assets/imgs/checked.png"},
    {title: "不满意", id: "2", pic: "../../assets/imgs/check.png", pic_checked: "../../assets/imgs/checked.png"}
  ];
  evaluateId: any = "0";
  //商品星级评价
  scoreCell = [
    {
      id: 0, title: "质量", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 1, title: "外观", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 2, title: "物流", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 3, title: "服务", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
  ];
  //设计星级评价
  scoreCell1 = [
    {
      id: 0, title: "设计效果", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 1, title: "设计师服务", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 2, title: "综合体验", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    }
  ];
  //施工星级评价
  scoreCell2 = [
    {
      id: 0, title: "施工质量", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 1, title: "工长服务", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 2, title: "综合体验", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    }
  ];
  //套餐评价
  scoreCell3 = [
    {
      id: 0, title: "设计效果", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 1, title: "设计师服务", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 1, title: "施工效果", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 1, title: "施工队服务", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    },
    {
      id: 2, title: "软件体验", star: [
      {pic: "../../assets/imgs/score.png", pid: 0},
      {pic: "../../assets/imgs/score.png", pid: 1},
      {pic: "../../assets/imgs/score.png", pid: 2},
      {pic: "../../assets/imgs/score.png", pid: 3},
      {pic: "../../assets/imgs/score.png", pid: 4},
    ], score: 0
    }
  ];

  order_id: any = "";
  subject_id: any = "";
  typeId:any = "";
  list: any = [];
  list1:any = [];

  //上传图片合集
  imgList = [];
  nickname:any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public cp: CommonProvider) {
    this.order_id = this.navParams.get("id");
    this.subject_id = this.navParams.get("subject_id");
  }

  ionViewDidLoad() {
    this.formElem = this.form.nativeElement;
    this.fileElem = this.formElem.firstElementChild;
    this.nickname = this.cp.u.nickname;
    this.cp.getData("order/getlist", {subject_id: this.subject_id, id: this.order_id}).then((res: any) => {
      console.log(res, "评价订单");
      let data = res.data[0];
      let time = "";
      time = data.create_time.slice(0, 16);
      data.time = time;
      for (let ol of data.order_goods) {
        let types = ol.props_value_arr;
        let typeList = [];
        for (let i in types) {
          typeList.push(types[i]);
        }
        ol.typeArr = typeList;
      }
      this.list = data;
      this.list1 = res.data;
    })
  }

  //评价
  changeImg(id, i) {
    this.evaluateId = id;
    this.designrwall = i;
  }

  //商品星级评价
  setScore(rowId, colId) {
    this.scoreCell[rowId].score = colId + 1;
    // let len = this.scoreCell[rowId].star.length;
    for (let i = 0; i <= colId; i++) {
      if (this.scoreCell[rowId].star[i].pic == "../../assets/imgs/score_checked.png") {
        if (i == 3) {
          this.scoreCell[rowId].star[4].pic = "../../assets/imgs/score.png";
        } else if (i == 2) {
          this.scoreCell[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[3].pic = "../../assets/imgs/score.png";
        } else if (i == 1) {
          this.scoreCell[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[2].pic = "../../assets/imgs/score.png";
        } else if (i == 0) {
          this.scoreCell[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[2].pic = "../../assets/imgs/score.png";
          this.scoreCell[rowId].star[1].pic = "../../assets/imgs/score.png";
        }
      } else {
        this.scoreCell[rowId].star[i].pic = "../../assets/imgs/score_checked.png";
      }
    }
  }
  //设计星级评价
  setScore1(rowId, colId) {
    this.scoreCell1[rowId].score = colId + 1;
    // let len = this.scoreCell1[rowId].star.length;
    for (let i = 0; i <= colId; i++) {
      if (this.scoreCell1[rowId].star[i].pic == "../../assets/imgs/score_checked.png") {
        if (i == 3) {
          this.scoreCell1[rowId].star[4].pic = "../../assets/imgs/score.png";
        } else if (i == 2) {
          this.scoreCell1[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell1[rowId].star[3].pic = "../../assets/imgs/score.png";
        } else if (i == 1) {
          this.scoreCell1[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell1[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell1[rowId].star[2].pic = "../../assets/imgs/score.png";
        } else if (i == 0) {
          this.scoreCell1[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell1[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell1[rowId].star[2].pic = "../../assets/imgs/score.png";
          this.scoreCell1[rowId].star[1].pic = "../../assets/imgs/score.png";
        }
      } else {
        this.scoreCell1[rowId].star[i].pic = "../../assets/imgs/score_checked.png";
      }
    }
  }
  //施工星级评价
  setScore2(rowId, colId) {
    this.scoreCell2[rowId].score = colId + 1;
    // let len = this.scoreCell2[rowId].star.length;
    for (let i = 0; i <= colId; i++) {
      if (this.scoreCell2[rowId].star[i].pic == "../../assets/imgs/score_checked.png") {
        if (i == 3) {
          this.scoreCell2[rowId].star[4].pic = "../../assets/imgs/score.png";
        } else if (i == 2) {
          this.scoreCell2[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell2[rowId].star[3].pic = "../../assets/imgs/score.png";
        } else if (i == 1) {
          this.scoreCell2[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell2[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell2[rowId].star[2].pic = "../../assets/imgs/score.png";
        } else if (i == 0) {
          this.scoreCell2[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell2[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell2[rowId].star[2].pic = "../../assets/imgs/score.png";
          this.scoreCell2[rowId].star[1].pic = "../../assets/imgs/score.png";
        }
      } else {
        this.scoreCell2[rowId].star[i].pic = "../../assets/imgs/score_checked.png";
      }
    }
  }
  //套餐星级评价
  setScore3(rowId, colId) {
    this.scoreCell3[rowId].score = colId + 1;
    // let len = this.scoreCell3[rowId].star.length;
    for (let i = 0; i <= colId; i++) {
      if (this.scoreCell3[rowId].star[i].pic == "../../assets/imgs/score_checked.png") {
        if (i == 3) {
          this.scoreCell3[rowId].star[4].pic = "../../assets/imgs/score.png";
        } else if (i == 2) {
          this.scoreCell3[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell3[rowId].star[3].pic = "../../assets/imgs/score.png";
        } else if (i == 1) {
          this.scoreCell3[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell3[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell3[rowId].star[2].pic = "../../assets/imgs/score.png";
        } else if (i == 0) {
          this.scoreCell3[rowId].star[4].pic = "../../assets/imgs/score.png";
          this.scoreCell3[rowId].star[3].pic = "../../assets/imgs/score.png";
          this.scoreCell3[rowId].star[2].pic = "../../assets/imgs/score.png";
          this.scoreCell3[rowId].star[1].pic = "../../assets/imgs/score.png";
        }
      } else {
        this.scoreCell3[rowId].star[i].pic = "../../assets/imgs/score_checked.png";
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

  evaluateClick() {
    if (this.content == "") {
      this.cp.toast("请填写评价内容");
      return;
    }
    let ratings = {};
    if(this.subject_id==1){
      for (let item of this.scoreCell) {
        if (item.score == 0) {
          this.cp.toast("请选择星级评价");
          return;
        }
      }
      ratings["质量"] = this.scoreCell[0].score;
      ratings["外观"] = this.scoreCell[1].score;
      ratings["服务"] = this.scoreCell[2].score;
      ratings["物流"] = this.scoreCell[3].score;
    }else if(this.subject_id==2){
      for (let item of this.scoreCell3) {
        if (item.score == 0) {
          this.cp.toast("请选择星级评价");
          return;
        }
      }
      ratings["设计效果"] = this.scoreCell3[0].score;
      ratings["设计师服务"] = this.scoreCell3[1].score;
      ratings["施工效果"] = this.scoreCell3[2].score;
      ratings["施工长服务"] = this.scoreCell3[3].score;
      ratings["软件体验"] = this.scoreCell3[4].score;
    }else if(this.subject_id==3){
      for (let item of this.scoreCell1) {
        if (item.score == 0) {
          this.cp.toast("请选择星级评价");
          return;
        }
      }
      ratings["设计效果"] = this.scoreCell1[0].score;
      ratings["设计师服务"] = this.scoreCell1[1].score;
      ratings["软件体验"] = this.scoreCell1[2].score;
    }else if(this.subject_id==4){
      for (let item of this.scoreCell2) {
        if (item.score == 0) {
          this.cp.toast("请选择星级评价");
          return;
        }
      }
      ratings["施工效果"] = this.scoreCell2[0].score;
      ratings["施工长服务"] = this.scoreCell2[1].score;
      ratings["软件体验"] = this.scoreCell2[2].score;
    }
    let goods = [];
    for (let i in this.list.order_goods) {
      goods.push({
        id: this.list.order_goods[i].goods_info_arr.id,
        rating: this.evaluateId,
        ratings: ratings,
        pics: this.photos,
        content: this.content
      })
    }
    this.cp.getData("goods_comment/add", {
      subject_id: 1,
      order_id: this.order_id,
      goods: goods
    }).then((res: any) => {
      console.log(res, "评价");
      if (res.status == 1) {
        this.cp.toast(res.msg);
        this.cp.goto({}, "myorder")
      } else {
        this.cp.toast(res.msg)
      }
    })
  }
}
