// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db=null;
angular.module('starter', ['ionic','starter.controllers','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
       //  db = $cordovaSQLite.openDB("my.db");
        db = window.openDatabase("my.db", "1.0", "My app", -1);
           $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS grocery (grocery_id integer primary key AUTOINCREMENT,listname text,counter1 integer, counter2 integer,colorcode text)");
           $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS itemlist1 (itemlist_id integer primary key AUTOINCREMENT,itemname text,amount integer, note varchar(100),ddate date,rdate date,g_id integer REFERENCES grocery(grocery_id) ON UPDATE CASCADE,status text,priority integer,is_done boolean)"); 
//        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS itemlist (img_id integer primary key AUTOINCREMENT,data BLOB,hash BLOB UNIQUE,g_id integer REFERENCES grocery(grocery_id)  )"); 
           // $cordovaSQLite.execute(db,"DROP TABLE itemlist1;")
            //  $cordovaSQLite.execute(db,"DROP TABLE grocery;") 
  });
})


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider
 .state('list', {
    url: '/list',
    templateUrl: 'partials/list.html',
    controller: 'listCtrl'
  })

  .state('itemlist', {
    url: '/itemlist/:grocery_id',
    templateUrl: 'partials/itemlist.html',
    controller: 'itemlistCtrl'
  })

  .state('itemlistadd', {
    url: '/itemlistadd/:grocery_id',
    templateUrl: 'partials/itemlistadd.html',
    controller: 'itemlistaddCtrl'
  })
    

 
  .state('itemlistedit', {
    url: '/itemlistedit/:itemlist_id',
    templateUrl: 'partials/itemlistedit.html',
    controller: 'itemlisteditCtrl'
  })
 
 
 $urlRouterProvider.otherwise('/list');

});


