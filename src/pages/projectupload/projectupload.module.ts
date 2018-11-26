import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectuploadPage } from './projectupload';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ProjectuploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectuploadPage),
    ComponentsModule
  ],
})
export class ProjectuploadPageModule {}
