import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestaurantPage } from '../restaurant/restaurant';

import { MongoProvider } from '../../providers/mongo/mongo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;
  text: any;

  constructor(public navCtrl: NavController, public mongo: MongoProvider) {
  	/*this.items = [{
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
  	}];*/

    
  }

  public openRestaurant(item) {
  	this.navCtrl.push(RestaurantPage, {
  		item: item
  	})
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    this.mongo.findByTag(val.toLowerCase()).then((result) => {
      this.items = result;
    }).catch(err => {
      console.log(JSON.stringify(err));
    })
  }
}
