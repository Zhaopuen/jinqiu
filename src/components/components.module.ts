import { NgModule, CUSTOM_ELEMENTS_SCHEMA/*,NO_ERRORS_SCHEMA*/ } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AppTopComponent } from './app-top/app-top';
import { AppHeaderComponent } from './app-header/app-header';

@NgModule({
	declarations: [
		AppTopComponent,
		AppHeaderComponent,
		],
	imports: [IonicModule],
	exports: [
		AppTopComponent,
		AppHeaderComponent,
    ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
