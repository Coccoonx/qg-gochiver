angular.module('MyApp')
  .controller('resetpasswordCtrl', function($scope, $http, $location, $auth,$localStorage,toastr) {
	  $scope.email = $localStorage.accountid;	
	  var params = $location.search();
	  var email = params.email;
	  $scope.resetpassword = function(){
		$http({
			method : 'POST',
			url : '/auth/resetPassword',
			params : {
				token: params.Signature, email: params.IdentityName, password : $scope.user.password
			}
		}).success(function(response) {
			//$scope.showAPIFail = false;
			swal("Welcome !", "Your password have been successfully reseted! Please login", "success");
			$location.path('/login');
			
		}).error(function(error) {
			$scope.showAPIFail = true;
		});
	  }
  });