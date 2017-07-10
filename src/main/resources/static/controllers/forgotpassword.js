 angular.module('MyApp')
  .controller('forgotpasswordCtrl', function($scope, $http, $location, $auth,$localStorage,toastr) {
	   $scope.forgotpassword = function(){    
		   var token='YWNtZTphY21lc2VjcmV0MQ==';
		   $scope.showLoading = true; 
		   $http({
	    	  method: 'GET',
	 			  url: '/account/password',
	 			headers: {'Authorization': 'Basic '+ token},
	 			 params: {email : $scope.user.email}
	 		}).success(function (response){
				$scope.showLoading = false;
				$scope.showAPIFail = false;
				swal("Reset Password !", "A mail containing a link to reset your password has been sent to "+$scope.user.email+".", "success");
				$location.path('/login');
	 	 	 }).error(function(error){
				$scope.showLoading = false;
				$scope.showAPIFail = true;
	 			toastr.error("Sorry, this user is not in our database");
	 		});  
  }
		  $scope.authenticate = function(provider) {
		      $auth.authenticate(provider)
		        .then(function() {
		          toastr.success('You have successfully signed in with ' + provider + '!');
		          $location.path('/');
		        })
		        .catch(function(error) {
		          if (error.error) {
		            // Popup error - invalid redirect_uri, pressed cancel
					// button, etc.
		            toastr.error(error.error);
		          } else if (error.data) {
		            // HTTP response error from server
		            toastr.error(error.data.message, error.status);
		          } else {
		            toastr.error(error);
		          }
		        });
		    };
  });