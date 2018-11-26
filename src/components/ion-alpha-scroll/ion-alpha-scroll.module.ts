import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonAlphaScroll } from './ion-alpha-scroll';
import { UtilModule } from './util-module';
//import { DynamicComponentModule } from 'ng-dynamic';

@NgModule({
  imports: [
    IonicModule,
    UtilModule,
//    DynamicComponentModule.forRoot({
//      imports: [ IonicModule, UtilModule],
//      declarations: []
//    })
  ],
  declarations: [IonAlphaScroll],
  exports: [IonAlphaScroll]
})
export class IonAlphaScrollModule {}
