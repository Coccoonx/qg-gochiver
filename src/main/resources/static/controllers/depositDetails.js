angular
		.module('MyApp')
		.controller(
				'depositDetailCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {
					$scope.gridOptions = {
						enableRowSelection : true,
						enableRowHeaderSelection : false,
						enableSorting : true,
						// enableHorizontalScrollbar :
						// uiGridConstants.scrollbars.NEVER,
						enableColumnResizing : true

					};


					$scope.user = $localStorage.username;
					// setInterval(function(){ location.reload(); }, 120000);

					var params = $location.search();


					var token = $auth.getToken();


					var token = $auth.getToken();
					var accountid = $localStorage.accountid;

					$scope.getTransaction = function() {
						$auth.removeToken();
						console.log($localStorage.token);
						$http({
							method : 'GET',
							url : '/admin/wallet',
							headers : {
								'Authorization' : 'Basic ' + $localStorage.token
							},
							params : {
								id : $localStorage.depositId
							}
						})
								.success(
										function(response) {
											console.log("Deposit retrieved successfully");
											console.log(response);
											$auth.setToken($localStorage.token);
											$scope.id = response.id;
											$scope.availableBalance = response.wallet.availableBalance;
											$scope.lastUpdateDate = response.wallet.lastUpdateDate;
											$scope.currency = response.wallet.currency;
											$scope.unavailableBalance = response.wallet.unavailableBalance;
											$scope.status = response.wallet.status;
											$scope.createDate = response.createDate;
											$scope.lastUpdateDate = response.lastUpdateDate;
											
											$scope.customerFirstName= response.customer.firstName;
											$scope.customerLastName= response.customer.lastName;
											$scope.customerEmail= response.customer.email;
											$scope.customerStatus= response.customer.status;
											$scope.customerZone= response.customer.zone;
											$scope.customerCreateDate= response.customer.createDate;
											$scope.customerLastUpdateDate= response.customer.lastUpdateDate;
											$scope.customerCurrency= response.customer.currency;
											$scope.customerCity= response.customer.city;
											$scope.customerLanguage= response.customer.language;
											$scope.customerPhone= response.customer.phone;
											$scope.customerState= response.customer.state;
											$scope.customerCountry= response.customer.country;
											$scope.customerZipCode= response.customer.zipCode;
											$scope.customerEnabled= response.customer.enabled;
											$scope.customerActivationCode= response.customer.activationCode;
											
											if (typeof response.coTransaction !== 'undefined'   !== ''){
												
											}
//											$scope.close();
										}).error(function(error) {
											$auth.setToken($localStorage.token);
											console.log($scope.id);
											console.log("error ");
											toastr.error(error.message,error.code);
								});
					}

					$scope.close = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactions').search('id', null);
					}
					
					$scope.back = function() {
						document.title = "Go Archive Portal";
						$location.path('/deposits').search('id', null);
					}
					
					$scope.verifyAndConfirmDeposit = function() {
						$auth.removeToken();
						console.log($localStorage.token);
						$http({
							method : 'GET',
							url : '/admin/transfer',
							headers : {
								'Authorization' : 'Basic ' + $localStorage.token
							},
							params : {
								id : $localStorage.depositId
							}
						})
								.success(
										function(response) {
											console.log("Transaction retrieved successfully");
											$auth.setToken($localStorage.token);
											console.log(response);
											$scope.status = response.transaction.status;
											$localStorage.transferCountry = response.customer.country;
											console.log(response.transaction.status);
												if ($scope.status === 'IN_PROGRESS' ){
													document.title = "Go Archive Portal";
													$localStorage.depositId = response.id;
													$scope.confirmDeposit();
												}else{
													sweetAlert(
															"Oops...",
															"ONLY deposit transactions with the status IN_PROGRESS can be confirm",
															"error");
												}
										}).error(function(error) {
											$auth.setToken($localStorage.token);
											console.log($scope.id);
											console.log("error ");
											toastr.error(error.message,error.code);
								});
					}
					
					$scope.verifyAndCancelDeposit = function() {
						$auth.removeToken();
						console.log($localStorage.token);
						$http({
							method : 'GET',
							url : '/admin/transfer',
							headers : {
								'Authorization' : 'Basic ' + $localStorage.token
							},
							params : {
								id : $localStorage.depositId
							}
						})
								.success(
										function(response) {
											console.log("Transaction retrieved successfully");
											$auth.setToken($localStorage.token);
											console.log(response);
											$scope.status = response.transaction.status;
											$localStorage.transferCountry = response.customer.country;
											console.log(response.transaction.status);
												if ($scope.status === 'IN_PROGRESS' ){
													document.title = "Go Archive Portal";
													$localStorage.depositId = response.id;
													$scope.cancelDeposit();
												}else{
													sweetAlert(
															"Oops...",
															"ONLY deposit transactions with the status IN_PROGRESS can be cancel",
															"error");
												}
										}).error(function(error) {
											$auth.setToken($localStorage.token);
											console.log($scope.id);
											console.log("error ");
											toastr.error(error.message,error.code);
								});
					}
					
					
					$scope.confirmDeposit = function() {
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'PUT',
									url : '/admin/deposit/confirm',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									},
									params : {
										id : $localStorage.depositId
									}
								})
								.success(
										function(response) {
											console.log("Transactions with deposits confirmed successfully");
											$auth.setToken($localStorage.token);
											$scope.showLoading = false;
											// $scope.updateMetricsCluster(response);
											$scope.datalength = response.length;
											$scope.user = $localStorage.username;
											swal("Success!",
													"Transaction deposit confirmed successfully.",
													"success");
											$scope.close();
										}).error(function(error) {
									$scope.showLoading = false;
									$auth.setToken($localStorage.token);
									toastr.error(error.message,error.code);
								});
					}
					
					$scope.cancelDeposit = function() {
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'PUT',
									url : '/admin/deposit/cancel',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									},
									params : {
										id : $localStorage.depositId
									}
								})
								.success(
										function(response) {
											console.log("Transactions with deposits cancelled successfully");
											$auth.setToken($localStorage.token);
											$scope.showLoading = false;
											// $scope.updateMetricsCluster(response);
											$scope.datalength = response.length;
											$scope.user = $localStorage.username;
											swal("Success!",
													"Transaction deposit canceled successfully.",
													"success");
											$scope.close();
										}).error(function(error) {
									$scope.showLoading = false;
									$auth.setToken($localStorage.token);
									toastr.error(error.message,error.code);
								});
					}
					

					$scope.getTransaction();

				});