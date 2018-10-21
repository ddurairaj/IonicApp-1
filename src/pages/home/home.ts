import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestaurantPage } from '../restaurant/restaurant';

import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any[];
  text: any;

  constructor(public navCtrl: NavController) {
  	this.items = [{
  		name: "Restaurant 1",
  		dishes: [{
  			name: "Dish 1",
  			price: 12
  		},{
  			name: "Quesadillas",
  			price: 5
  		}]
  	},{
  		name: "Restaurant 2",
  		dishes: [{
  			name: "Dish 1",
  			price: 20
  		}]
  	}];

    const client = Stitch.initializeDefaultAppClient('stitchstuff-qfxpx');

   const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('hackFood');

   client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
     db.collection('testResults').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
   ).then(() =>
     db.collection('testResults').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
   .then(docs => {
       this.text = "Found docs => " + JSON.stringify(docs);
       console.log("[MongoDB Stitch] Connected to Stitch");
   })).catch(err => {
     console.error(err)
   });
  }

  public openRestaurant(item) {
  	this.navCtrl.push(RestaurantPage, {
  		item: item
  	})
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;


    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
