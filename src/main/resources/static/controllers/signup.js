angular.module('MyApp')
  .controller('SignUpCtrl', function($scope, $http, $location, $auth, $localStorage,$base64,toastr, Account) {
    $scope.signup = function() {
    	// generate token and login
//        var payload = "grant_type=password" + "&username="+$scope.user.email+ "&password="+$scope.user.password;
//        var token='YWNtZTphY21lc2VjcmV0MQ==';
        $scope.showLoading = true;   
        $scope.encoded = $base64.encode($scope.user.email+':'+$scope.user.password);
//        console.log($scope.encoded);
        $http({
       			method: 'POST',
       			//for production mode http://libre-exchange.awswouri.com/
//       			url: 'http://libre-exchange.awswouri.com/admin/login',
       			url: 'http://192.168.1.246:4545/customer/register',
//       			headers: {'Authorization': 'Basic '+$scope.encoded},
       		    data :  {
       		            firstName: $scope.user.firstname,
       		            lastName: $scope.user.lastname,
                		email : $scope.user.email,
                		password : $scope.user.password
                }
       		}).success(function (response){
       			console.log(response);
       			response.data=response;
       			$localStorage.token=$scope.encoded;
       			$auth.setToken($localStorage.token);
       			console.log('token :'+$auth.getToken());
       			$localStorage.accountid=$scope.user.email;
       			$localStorage.pwd= $scope.user.password;
       			$localStorage.username=response.firstName;
       			$scope.showLoading = true;
//       			$scope.getProfile($scope.user.email);
       			document.title = "Go Archive Portal";
       			$location.path('/document');
       			
//       		}).error(function(error){
//				$scope.showLoading = false;
//				$scope.showAPIFail = true;
//       			toastr.error("Sorry, your email and/or your password are incorrect");
       		}).catch(function(error) {
       			$scope.showLoading = false;
				$scope.showAPIFail = true;
			    toastr.error("An Error Occured: "+error.message);
//				if (error.status === 401) {
//					toastr.error("Sorry, your email and/or your password are incorrect");
//			      }else{
//			    	  toastr.error(error.data.message, error.status);
//			      }
//       	 		$auth.removeToken();
       	 	 });
   }

//    $scope.authenticate = function(provider) {
//      $auth.authenticate(provider)
//        .then(function() {
//          toastr.success('You have successfully signed in with ' + provider + '!');
//          $location.path('/cassandra');
//        })
//        .catch(function(error) {
//          if (error.error) {
//            // Popup error - invalid redirect_uri, pressed cancel button, etc.
//            toastr.error(error.error);
//          } else if (error.data) {
//            // HTTP response error from server
//            toastr.error(error.data.message, error.status);
//          } else {
//            toastr.error(error);
//          }
//        });
//    };
    
//    $scope.getProfile = function(account) {
//  	  $http({
//   			method: 'POST', 
//   			url: '/account', 
//   			headers: {'Authorization': 'Basic '+$scope.encoded}
//   		}).success(function (response){
//   			response.data=response;
//   			console.log(response.length);
//   			
////   			$localStorage.username= response.name;
////   			$localStorage.awsapikey= response.awsapikey;
////   			$localStorage.awssecretkey= response.awssecretkey;
////   			$localStorage.accountuuid= response.id;
//   	 	 }).error(function(error){
//   			toastr.error("Sorry, an error occured while retrieving data. Try again later !");
//   		})
//   	 	 .catch(function(error) {
//   	 		toastr.error(error.data.message, error.status);
//   	 		$auth.removeToken();
//   	 	 });
//   };
    
  });

