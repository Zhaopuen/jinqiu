import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignPage } from './design';
import { AlertController } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
@NgModule({
  declarations: [
    DesignPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignPage),
    ComponentsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
})
export class DesignPageModule {
  constructor(public alertCtrl: AlertController) { }

  showPrompt() {

    const alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  
  }
}
