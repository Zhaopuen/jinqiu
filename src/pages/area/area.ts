import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

@IonicPage({
  name: 'area',
  defaultHistory: ['tabs']
})
@Component({
  selector: 'page-area',
  templateUrl: 'area.html',
})
export class AreaPage {
  data: any = [];//根数据
  items: any = [];//动态列表显示的数据
  keyword: string = '';
  currentPageClass = this;

  constructor(public cp: CommonProvider, public viewCtrl: ViewController) {
    this.initArea();
  }

  initArea() {
    this.cp.getCache('areaData').then((res: any) => {
      if (res)
        this.items = this.data = res;
      else
        this.cp.getData('region/area').then((data: any) =>
          (this.items = this.data = data,
            this.cp.setCache('areaData', data,3600))
        );
    })
  }

  changeLocation({province = null, province_name = null, city = null, city_name = null} = {}) {
    /*如果缺少值则不保存，保存后退出*/
    province && province_name && city && city_name &&
    this.cp.setGlobal({province, province_name, city, city_name})
    this.viewCtrl.dismiss();
  }

  search() {
    if (this.keyword)
      this.items = this.data.filter((item: any) => item.city_name.indexOf(this.keyword) !== -1);
    else
      this.items = this.data;
  }
}
