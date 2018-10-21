import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

/*
  Generated class for the MongoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MongoProvider {

  client: any;
  db: any;

  constructor(public http: HttpClient) {
    console.log('Hello MongoProvider Provider');
    this.client = Stitch.initializeDefaultAppClient('stitchstuff-qfxpx');

    this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('hackFood');
  }

  findByTag(searchTag) {
    return new Promise((resolve, reject) => {
      this.client.auth.loginWithCredential(new AnonymousCredential())
      .then(user => {
	        //this.db.collection('results').find({tags: searchTag}).asArray().then((result) => resolve(result)).catch((err) => reject(err));
	        this.client.callFunction('returnResults',[searchTag,'sampleData']).then((result) => resolve(this.parseResult(result))).catch((err) => reject(err));
	    }).catch(err => {
	    	reject(err);
	    });
	});
  }

  parseResult(result) {
  	let restaurantNames = [];
  	let parsedResult = [];
  	for(let i = 0; i < result.length; i++) {
  		if(restaurantNames.indexOf(result[i]['restaurant']) == -1){
  			restaurantNames.push(result[i]['restaurant']);
  		}
  	}

  	
  	
  	for(let i = 0; i < restaurantNames.length; i++) {
  		let restaurantObj = {dishes: []};
  		for(let j = 0; j < result.length; j++) {
  			if(result[j]['restaurant'] == restaurantNames[i]) {
  				restaurantObj['restaurant'] = result[j]['restaurant'];
  				restaurantObj['address'] = result[j]['address'];
  				restaurantObj['pic'] = result[j]['pic'];
  				restaurantObj['dishes'].push({
  					name: result[j]['name'],
  					price: result[j]['price']
  				})
  			}
  		}
  		parsedResult.push(restaurantObj);
  	}

  	console.log(restaurantNames);
  	return parsedResult;
  }



}
