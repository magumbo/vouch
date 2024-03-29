//Command to instantiate root ember object
App = Ember.Application.create();

//Setup Ember routes,  connecting URLs to code
App.Router.map(function() {
  // put your routes here
	 this.route("about", { path: "/about" });
	 this.route("user", { path: "/user" });
	 this.route("login", { path: "/login" });
	 this.route("edit", { path: "/edit" });
	 this.route("vote", { path: "/vote" });
});

//Prototype data object, used in place of ember data
App.serverResponse = Ember.Object.extend({});
App.sessionModel = Ember.Object.extend({
	serverResponse:null,
	username:null,
	password:null
});

App.userModel = Ember.Object.extend({
	serverResponse:null,
	userId:null,
	currentUserId:null,
	username:null,
	password:null,
	userQuery:null,
	returnedUserData:null
});


	var incomingTextA = "l; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a super strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off- then, I account it high time to get to sea as soon as I can. This is my";
		var incomingTextB = "l; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a super strong moral principle to prevent me from deliberately stepping onto the street, and methodically knocking people's hats off- and, I account it high time to get to sea as soon as I can. This is my";
		
		
		
		var dmp = new diff_match_patch();

		function launch() {
		  var text1 = incomingTextA;
		  var text2 = incomingTextB;
		  
		   console.log(text1);
		  console.log(text2);
		  
		  
		  dmp.Diff_Timeout = parseFloat(0);
		  dmp.Diff_EditCost = parseFloat(4);

		  var ms_start = (new Date()).getTime();
		  var d = dmp.diff_main(text1, text2);
		  var ms_end = (new Date()).getTime();

		  dmp.diff_cleanupSemantic(d);
		 
		  var ds = dmp.diff_prettyHtml(d);
		  //document.getElementById('outputdiv').innerHTML = ds + '<BR>Time: ' + (ms_end - ms_start) / 1000 + 's';
		  
		 console.log(ds);
		  
		  $('#voteA').text(incomingTextA);
		  $('#voteB').html(ds);
		  
		}
		launch();

//Object created by prototype for user view
var userData = App.userModel.create({});

//Object created by prototype for login view
var loginData = App.sessionModel.create({});

//Route code for Index route (from tutorial), you can access this data on the index page with {{model}}
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

//Route code for user view
App.UserRoute = Ember.Route.extend({
  model: function(){ return userData;}
});

//Route code for login page
App.LoginRoute = Ember.Route.extend({
  model: function(){ return loginData;}
});

/******************
 *     User View    *
 *******************/
	
App.userCollectionController = Ember.ArrayController.create();

//Controller has methods that are executed on user view
App.UserController = Ember.ObjectController.extend({
  get: function(evt) {
	$.ajax({
		  type: "GET",
		  url: '/api/v0/users', 
		  data: userData.userQuery,
		  success: function(data){
			userData.set('serverResponse', data.message);
			App.userCollectionController.set('content', data.docs);
		  },
		  error: function(e){userData.set('serverResponse', JSON.parse(e.responseText).message);}
		});
  },	
  
 getSingle: function(evt) {
	$.ajax({
		  type: "GET",
		  url: '/api/v0/users/' + userData.userId, 
		  data: userData.userQuery,
		  success: function(data){
			console.log(data);
			userData.set('serverResponse', data.message);
			userData.set('returnedUserData', JSON.stringify(data.user));
		  },
		  //error: function(e){userData.set('serverResponse', JSON.parse(e.responseText).message);}
		  error: function(e){console.log(e);},
		  dataType: 'json'
		});
  },	  
	
	
	
	
	
	
  /*
   * 
   * NOTE: This method uses the session resource, not the uesr resource in the URL
   * 
   */
   getCurrentUserId: function(evt) {
	$.ajax({
		  type: "GET",
		  url: '/api/v0/session', 
		  success: function(data){
			userData.set('currentUserId', data.userID);
			userData.set('userId', data.userId);
			userData.set('serverResponse', 'current user is:' + data.userId);
		  },
		  error: function(e){userData.set('serverResponse', JSON.parse(e.responseText).message);},
		  dataType: 'json'
		});
  },	

  postUsers: function(evt) {
		$.ajax({
			  type: "POST",
			  url: '/api/v0/users',
			  data: {username : userData.username, password: userData.password},
			  success: function(data){
				  userData.set('serverResponse', data.message);
				  userData.set('userQuery', '_id=' + data.userId);
				  userData.set('userId', data.userId);
			  },
			  error: function(e){userData.set('serverResponse', JSON.parse(e.responseText).message);},
			  dataType: 'json'
	    });
	  }
});

/******************
 *     Login View    *
 *******************/
App.LoginController = Ember.ObjectController.extend({	
	  get: function(evt) {
	$.ajax({
		  type: "GET",
		  url: '/api/v0/session',
		  success: function(data){loginData.set('serverResponse', data.message)},
		  error: function(e){loginData.set('serverResponse', JSON.parse(e.responseText).message);}
		 // dataType: 'json'
		});
  }	,
  post: function(evt) {
	 
		$.ajax({
			  type: "POST",
			  url: '/api/v0/session',
			  data: 	{username : loginData.username, password : loginData.password},
			  success: function(data){loginData.set('serverResponse', data.message);},
			 // success: function(data){console.log(data);},
			  
			  error: function(e){loginData.set('serverResponse', JSON.parse(e.responseText).message);},
			  dataType: 'json'
			});
	 // loginData.set('serverResponse', JSON.stringify({username:loginData.username, password: loginData.password}));
			

	  },
  del: function(evt) {
		$.ajax({
		  type: "DELETE",
		  url: '/api/v0/session',
		  success: function(data){loginData.set('serverResponse', data.message);},
		  error: function(test, fail){alert(JSON.stringify(fail));},
		  dataType: 'json'
		});
	  }

});

