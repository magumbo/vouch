App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
	 this.route("about", { path: "/about" });
	 this.route("user", { path: "/user" });
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


App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(){ return sR;}
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
		  url: 'http://localhost/api/v0/users',
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
			  url: 'http://localhost/api/v0/users',
			  data: dataP,
			  success: function(data){sR.set('message', data);},
			  error: function(test, fail){alert(JSON.stringify(fail));},
			  //dataType: 'json'
	    });
	  },
  
  putUsers: function(evt) {
		$.ajax({
			  type: "PUT",
			  url: 'http://localhost/api/v0/users',
		//	  data: data,
			  success: function(data){sR.set('message', data);},
			  error: function(test, fail){alert(JSON.stringify(fail));}
			 // dataType: 'json'
			});
	  },
  delUsers: function(evt) {
		$.ajax({
		  type: "DELETE",
		  url: 'http://localhost/api/v0/users',
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
		  url: 'http://localhost/api/v0/users',
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

