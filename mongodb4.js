var rest = require('restler');
var MongoClient = require('mongodb').MongoClient;
var async = require('async');


MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;
 
  console.log(">> Dropping collection");
  db.dropCollection('test_insert_github', function(err, result) {
    console.log("dropped: ");
    console.dir(result);
  });
 
  function getClassEventsForPage(i, callback) {

	  rest.get('https://api.github.com/orgs/CSCI-4830-002-2014/events').on('complete', 		function(data) {
	 
	    // Create a collection to store the results from github
	    var collection = db.collection('test_insert_github');
	    collection.insert(data, function(err, docs) {
	 
	       // Locate all the entries using find
	      collection.find().toArray(function(err, results) {
		results.forEach(function(x){
		  callback = console.log("User:" + x.actor.login + ", type:" + x.type);
		});
		// Let's close the db
		db.close();
	      });       
	    });
	  });
   };
   async.map([1,2,3,4,5,6,7,8,9,10], getClassEventsForPage, function(err, results) {
   });

})



	
