import { Component,Input } from '@angular/core';
import { CommonProvider } from "../../providers/common/common";

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  @Input() title: any;
  @Input() nickname: any;
  constructor(public cp: CommonProvider) {
  }
  switchCity(){
    let areaModal = this.cp.modalCtrl.create('area',{});
    areaModal.present();
    //this.cp.toast('当前仅开放杭州，尽请期待');
  }
  loginOrAccount(){
    if(this.cp.u.id){
      // if(this.cp.u.type==0){
        this.cp.goto({view: "personal"})
      // }else if(this.cp.u.type==1){
      //   this.cp.goto({view: "sjpersonalcenter"})
      // }else if(this.cp.u.type==2){
      //   this.cp.goto({view: "workuser"})
      // }
    }else{
      this.cp.goto({view: "login"})
    }
  }

}
