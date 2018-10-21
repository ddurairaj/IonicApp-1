import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestaurantPage } from '../restaurant/restaurant';

import { MongoProvider } from '../../providers/mongo/mongo';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;
  text: any;
  userInput: any;

  constructor(public navCtrl: NavController, public mongo: MongoProvider, private mediaCapture: MediaCapture) {
  	//this.initializeItems();
  }

  public openRestaurant(item) {
  	this.navCtrl.push(RestaurantPage, {
  		item: item
  	})
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = this.userInput;

    this.items = this.searchDatabase(val);
  }

  doRefresh(refresher) {
    console.log("VALUE REFRESHER => " + this.userInput);
    //this.text = JSON.stringify(this.userInput);
    this.items = this.searchDatabase(this.userInput);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  private searchDatabase(val) {
    console.log("VALUE => " + val);
    console.log(val != undefined && val != "");
    if(val != undefined && val != "") {
      this.mongo.findByTag(val.toLowerCase()).then((result) => {
        //return result;
        this.items = result;
        this.text = JSON.stringify(result);
        //this.text = val;
      }).catch(err => {
        console.log(JSON.stringify(err));
        //return err;
      })
    } else {
      console.log("Nothing to search");
      // To change, this is just to try
      //this.initializeItems();
    }
  }

  initializeItems() {
    this.items = [{
        restaurant: "Restaurant 1",
        dishes: [{
          name: "Dish 1",
          price: 12
        },{
          name: "Quesadillas",
          price: 5
        }]
      },{
        restaurant: "Restaurant 2",
        dishes: [{
          name: "Dish 1",
          price: 20
        }]
      }];
  }

  recordAudio() {
    this.mediaCapture.captureAudio({})
      .then(
        (data: MediaFile[]) => this.text = JSON.stringify(data),
        (err: CaptureError) => this.text = JSON.stringify(err)
      );
  }
}
