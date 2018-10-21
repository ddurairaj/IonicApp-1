import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { HowtousePage } from '../pages/howtouse/howtouse';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MediaCapture } from '@ionic-native/media-capture';

import { Stitch } from 'mongodb-stitch-browser-sdk';
import { MongoProvider } from '../providers/mongo/mongo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RestaurantPage,
    HowtousePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RestaurantPage,
    HowtousePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Stitch,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MongoProvider,
    MediaCapture
  ]
})
export class AppModule {}