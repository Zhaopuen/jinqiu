import { NgModule, ErrorHandler/*,CUSTOM_ELEMENTS_SCHEMA*/  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CommonProvider } from "../providers/common/common";
import { BackButtonService } from "../providers/common/backButtonService";
import { IonicStorageModule } from "@ionic/storage";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule, JsonpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
// import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      mode:'ios',
      backButtonText: '', // 配置返回按钮的文字
      // tabsHideOnSubPages: true //隐藏子页面tabs
    }),
    HttpModule,
    JsonpModule,
    HttpClientModule,
    // ComponentsModule,
    IonicStorageModule.forRoot(/*{driverOrder: ['localstorage']}*/),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClient,
    BackButtonService,
    CommonProvider
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class AppModule { }
