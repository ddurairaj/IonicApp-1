import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RestaurantPage } from '../pages/restaurant/restaurant';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MediaCapture } from '@ionic-native/media-capture';

import { Stitch } from 'mongodb-stitch-browser-sdk';
import { MongoProvider } from '../providers/mongo/mongo';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBbMGslkxfDktxFMc2XySKlkQ_sp6zDH0s",
  databaseURL: "gs://hacktx-18.appspot.com",
  projectId: "hacktx-18",
  storageBucket: "hack",
  messagingSenderId: "me"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RestaurantPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RestaurantPage
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