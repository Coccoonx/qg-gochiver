angular
		.module('MyApp')
		.controller(
				'LogoutCtrl',
				function($scope, $location, $auth, $http, $localStorage, toastr) {
					console.log('LogoutCtrl');
					$scope.deleteCookie = function() {
						$http({
							method : 'GET',
							url : '/auth/deleteCookie',
							headers : {
								'Authorization' : 'Bearer ' + $auth.getToken()
							}
						})
								.success(function(response) {
									console.log(response);
								})
								.error(
										function(error) {
//											toastr
//													.error("Sorry, an error occured while deleting user cookie. Try again later !"
//															+ error);
										});
					};
					if (!$auth.isAuthenticated()) {
						console.log('not authenticated');
						console.log('LogoutCtrl end');
                        $localStorage.$reset();
                        console.log('You have been logged out');

                        toastr.info('You have been logged out');
                        $location.path('/');
						return;
					}
					// Populate the cookies of the user logged in
//					$scope.deleteCookie();
					
					$auth.logout().then(function() {
						$localStorage.username = "";
						$localStorage.$reset();
						console.log('You have been logged out');
						console.log('After Auth Logout');
						
						toastr.info('You have been logged out');
						$location.path('/');
					});

					

					

				});