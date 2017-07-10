angular
		.module('MyApp')
		.controller(
				'HomeCtrl',
				function($scope, $auth, $localStorage, $http, $location, Account) {

					$auth.logout().then(function() {
						$localStorage.username = "";
						$localStorage.$reset();
					});

					$scope.user = Account.get();
					$scope.gosignup = function() {
						console.log("gosignup");
						$location.path("/signup");
					}
					$scope.gologin = function() {
						console.log("gologin");
						$location.path("/login");
					}

					$http
							.jsonp(
									'https://api.github.com/repos/sahat/satellizer?callback=JSON_CALLBACK')
							.success(
									function(data) {
										if (data) {
											if (data.data.stargazers_count) {
												$scope.stars = data.data.stargazers_count;
											}
											if (data.data.forks) {
												$scope.forks = data.data.forks;
											}
											if (data.data.open_issues) {
												$scope.issues = data.data.open_issues;
											}
										}
									});
				});