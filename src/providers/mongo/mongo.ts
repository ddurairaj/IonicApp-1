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
	        this.client.callFunction('returnResults',[searchTag,'results']).then((result) => resolve(result)).catch((err) => reject(err));
	    }).catch(err => {
	    	reject(err);
	    });
	});
  }



}
