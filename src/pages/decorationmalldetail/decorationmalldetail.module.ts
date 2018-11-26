import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DecorationmalldetailPage } from './decorationmalldetail';
import { ComponentsModule } from '../../components/components.module';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
@NgModule({
  declarations: [
    DecorationmalldetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DecorationmalldetailPage),
    ComponentsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
})
export class DecorationmalldetailPageModule {}
