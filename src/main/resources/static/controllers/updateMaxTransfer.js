angular
		.module('MyApp')
		.controller(
				'updateMaxTransferCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {

					$scope.user = $localStorage.username;
					
					$scope.primary = {
						"id" : "primary"
					};
					
					$scope.setCountryAndCurrency = function(){
						$auth.removeToken();
						console.log($localStorage.token);
						$http({
							method : 'GET',
							url : '/customer',
							headers : {
								'Authorization' : 'Basic ' + $localStorage.token
							}
						})
								.success(
										function(response) {
											console.log("Transaction retrieved successfully");
											$auth.setToken($localStorage.token);
											console.log(response);
											
											$scope.transfer2.country= $localStorage.countryName;
											$scope.transfer2.currency= $localStorage.countryCurrency;
										}).error(function(error) {
											console.log($scope.id);
											$auth.setToken($localStorage.token);
											console.log("error ");
											if (typeof error.message === 'undefined'){
												console.log(error);
												toastr.error("Some changes have been made, Please login to make used of the new changes",error.code);
											}else{
												console.log(error);
												toastr.error(error.message,error.code);
											}
								});
					}
					
					
					
					$scope.canCreate = function() {
						if (typeof $scope.transfer2.country !== 'undefined'
								&& typeof $scope.transfer2.currency !== 'undefined'
								&& typeof $scope.transfer2.maxTransferAmt !== 'undefined') {
								return false;
						} else
							return true;
					}

					$scope.execute = function() {
						console.log($localStorage.countryName);
						console.log($scope.transfer2.country);
						swal(
								{
									title : "<b> Modify Max Transfer Amount</b>",
									text : "Would you really want to modify the max transfer amount?",
									imageUrl : "images/succes.png",
									imageSize : "130x130",
									showCancelButton : true,
									confirmButtonColor : "#34b1c4",
									confirmButtonText : "Yes,modify it",
									closeOnConfirm : true,
									html : true
								},
								function(isConfirm) {
									if (isConfirm) {
										$auth.removeToken();
										console.log($localStorage.token);
										$http(
												{
													method : 'PUT',
													url : '/admin/country',
													headers : {
														'Authorization' : 'Basic '
																+ $localStorage.token
													},
													data: {
														id : $localStorage.countryParamsId,
														code : $localStorage.countryName,
														currency : $scope.transfer2.currency,
														maxAmountAuthorized : $scope.transfer2.maxTransferAmt
								       				}
												}).success(function (response){
													console.log("Max transfer amount modified successfully");
													$auth.setToken($localStorage.token);
									       			console.log(response);
									       			
									       			document.title = "Go Archive Portal";
									       			swal("Success!",
															"Max Transfer Amount modified successfully.",
															"success");
									       			
									       		})
												.error(
														function(error) {
															$auth.setToken($localStorage.token);
															toastr
																	.error("Failed to modify max transfers of  '"
																			+ $scope.transfer2.country
																			+ "' : "
																			+ error.message);
														});
										$location.path('/maxTransfers');

									}

								});

					}
					
					$scope.setCountryAndCurrency();

					$scope.close = function() {
						document.title = "Go Archive Portal";
						$location.path('/maxTransfers');
					}
				});