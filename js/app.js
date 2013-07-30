App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
	 this.route("about", { path: "/about" });
	 this.route("user", { path: "/user" });
	 this.route("login", { path: "/login" });
});

App.serverResponse = Ember.Object.extend({
  say: function(thing) {
    var name = this.get('name');

    return [name + " says: " + thing];
  }
});

var sR = App.serverResponse.create({
  message: null,
  userJSON: null
});

var loginInfo = App.serverResponse.create({
	message: 'no messages sent yet',
	username: null,
	password:null
});


App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(){ return sR;}
});

App.LoginRoute = Ember.Route.extend({
  model: function(){ return loginInfo;}
});


App.Item = Ember.Object.extend();

function updateUser(test){
  App.UserRoute.reopen({
    model: function() {
      return ['test4','test5'];
    }
  });
}

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

var retval = 'testing ret vla';

function chtest(){
	return retval;
}

App.ClickableView = Ember.View.extend({
  click: function(evt) {
	$.ajax({
		  type: "DELETE",
		  url: '/api/v0/users',
	//	  data: data,
		  success: function(data){alert(data);},
		  error: function(test, fail){alert(JSON.stringify(fail));}
		 // dataType: 'json'
		});
  }
});

App.Controller = Ember.ObjectController.extend({
  headerName: chtest() ,
  dispState:"None",
  appVersion:  2.1
});


/*
 * New login (session) stuff
 */


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

