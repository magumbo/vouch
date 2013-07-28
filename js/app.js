App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
	 this.route("about", { path: "/about" });
	 this.route("user", { path: "/user" });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.UserRoute = Ember.Route.extend({
  model: function() {
    return ['test','test2'];
  }
});

App.User = Ember.Object.extend();
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
		  url: 'http://localhost:3000/users',
	//	  data: data,
		  success: function(data){alert(data);},
		  error: function(test, fail){alert(JSON.stringify(fail));}
		 // dataType: 'json'
		});
  }	,
  postUsers: function(evt) {
		$.ajax({
			  type: "POST",
			  url: 'http://localhost:3000/users',
		//	  data: data,
			  success: function(data){alert(data);},
			  error: function(test, fail){alert(JSON.stringify(fail));}
			 // dataType: 'json'
	    });
	  },
  
  putUsers: function(evt) {
		$.ajax({
			  type: "PUT",
			  url: 'http://localhost:3000/users',
		//	  data: data,
			  success: function(data){alert(data);},
			  error: function(test, fail){alert(JSON.stringify(fail));}
			 // dataType: 'json'
			});
	  },
  delUsers: function(evt) {
		$.ajax({
		  type: "DELETE",
		  url: 'http://localhost:3000/users',
	//	  data: data,
		  success: function(data){alert(data);},
		  error: function(test, fail){alert(JSON.stringify(fail));}
		 // dataType: 'json'
		});
	  }

});




App.ClickableView = Ember.View.extend({
  click: function(evt) {
	$.ajax({
		  type: "DELETE",
		  url: 'http://localhost:3000/users',
	//	  data: data,
		  success: function(data){alert(data);},
		  error: function(test, fail){alert(JSON.stringify(fail))}
		 // dataType: 'json'
		});
  }
});

App.Controller = Ember.ObjectController.extend({
  headerName: 'Vouch!',
  dispState:"None",
  appVersion:  2.1
});

