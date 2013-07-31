//Command to instantiate root ember object
App = Ember.Application.create();

//Setup Ember routes,  connecting URLs to code
App.Router.map(function() {
  // put your routes here
	 this.route("about", { path: "/about" });
	 this.route("user", { path: "/user" });
	 this.route("login", { path: "/login" });
});

//Prototype data object, used in place of ember data
App.serverResponse = Ember.Object.extend({});

//Object created by prototype for user view
var sR = App.serverResponse.create({
  message: null,
  userJSON: null
});

//Object created by prototype for login view
var loginInfo = App.serverResponse.create({
	message: 'no messages sent yet',
	username: null,
	password:null
});

//Route code for Index route (from tutorial), you can access this data on the index page with {{model}}
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

//Route code for user view
App.UserRoute = Ember.Route.extend({
  model: function(){ return sR;}
});

//Route code for login page
App.LoginRoute = Ember.Route.extend({
  model: function(){ return loginInfo;}
});

//???
App.Item = Ember.Object.extend();

//Test function shows how to add methods onto an already defined route with "reopen"
function updateUser(test){
  App.UserRoute.reopen({
    model: function() {
      return ['test4','test5'];
    }
  });
}

//Controller has methods that are executed on user view
App.UserController = Ember.ObjectController.extend({	
	  getUsers: function(evt) {
	$.ajax({
		  type: "GET",
		  url: '/api/v0/users',
	//	  data: data,
		  success: function(data){sR.set('message', data)},
		  error: function(test, fail){alert(JSON.stringify(fail));}
		 // dataType: 'json'
		});
  }	,
  postUsers: function(evt) {
      var dataP = {"payload" : JSON.parse(sR.userJSON)};
		$.ajax({
			  type: "POST",
			  url: '/api/v0/users',
			  data: dataP,
			  success: function(data){sR.set('message', data);},
			  error: function(test, fail){alert(JSON.stringify(fail));}
			  //dataType: 'json'
	    });
	  },
  
  putUsers: function(evt) {
		$.ajax({
			  type: "PUT",
			  url: '/api/v0/users',
		//	  data: data,
			  success: function(data){sR.set('message', data);},
			  error: function(test, fail){alert(JSON.stringify(fail));}
			 // dataType: 'json'
			});
	  },
  delUsers: function(evt) {
		$.ajax({
		  type: "DELETE",
		  url: '/api/v0/users',
	//	  data: data,
		  success: function(data){sR.set('message', data);},
		  error: function(test, fail){alert(JSON.stringify(fail));}
		 // dataType: 'json'
		});
	  }

});

//Controller has methods that are executed on login view
App.LoginController = Ember.ObjectController.extend({	
	  get: function(evt) {
	$.ajax({
		  type: "GET",
		  url: '/api/v0/session',
	//	  data: data,
		  success: function(data){loginInfo.set('message', data)},
		  error: function(test, fail){alert(JSON.stringify(fail));}
		 // dataType: 'json'
		});
  }	,

  post: function(evt) {
		$.ajax({
			  type: "POST",
			  url: '/api/v0/session',
			  data: 	"username=" +  loginInfo.username + "&password=" + loginInfo .password,
			  success: function(data){loginInfo.set('message', data);},
			  error: function(test, fail){alert(JSON.stringify(fail));}
			 // dataType: 'json'
			});
	  },
  del: function(evt) {
		$.ajax({
		  type: "DELETE",
		  url: '/api/v0/session',
	//	  data: data,
		  success: function(data){loginInfo.set('message', data);},
		  error: function(test, fail){alert(JSON.stringify(fail));}
		 // dataType: 'json'
		});
	  }

});

