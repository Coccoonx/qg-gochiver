angular
		.module('MyApp')
		.controller(
				'addConversionRateCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {

					$scope.user = $localStorage.username;
					
					$scope.primary = {
						"id" : "primary"
					};
					
					
					
					$scope.canCreate = function() {
						if (typeof $scope.conversionRate.company !== 'undefined'
								&& typeof $scope.conversionRate.sourceCurrency !== 'undefined'
								&& typeof $scope.conversionRate.targetCurrency !== 'undefined'
								&& typeof $scope.conversionRate.rate !== 'undefined') {
								return false;
						} else
							return true;
					}

					$scope.execute = function() {
						swal(
								{
									title : "<b> Add Conversion Rate</b>",
									text : "Would you really want to add a conversion rate?",
									imageUrl : "images/succes.png",
									imageSize : "130x130",
									showCancelButton : true,
									confirmButtonColor : "#34b1c4",
									confirmButtonText : "Yes,add it",
									closeOnConfirm : true,
									html : true
								},
								function(isConfirm) {
									if (isConfirm) {
										$auth.removeToken();
										console.log($localStorage.token);
										$http(
												{
													method : 'POST',
													url : '/admin/conversionrate',
													headers : {
														'Authorization' : 'Basic '
																+ $localStorage.token
													},
													data: {
														company : $scope.conversionRate.company,
														sourceCurrency : $scope.conversionRate.sourceCurrency,
														targetCurrency : $scope.conversionRate.targetCurrency,
														rate : $scope.conversionRate.rate
								       				}
												}).success(function (response){
													console.log("Rate added successfully");
													$auth.setToken($localStorage.token);
									       			console.log(response);
									       			
									       			$scope.close();
									       			swal("Success!",
															"Rate added successfully.",
															"success");
									       		})
												.error(
														function(error) {
															$auth.setToken($localStorage.token);
															toastr
																	.error("Failed to add rate '"
																			+ $scope.conversionRate.rate
																			+ "' : "
																			+ error.message);
														});
										

									}
									
									

								});

					}

					$scope.close = function() {
						document.title = "Go Archive Portal";
						$location.path('/conversionRates');
					}
				});