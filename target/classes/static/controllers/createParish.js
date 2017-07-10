angular
		.module('MyApp')
		.controller(
				'createParishCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {
					
					$scope.createParish = function() {

						swal(
								{
									title : "<b> Creation de Paroisse </b>",
									text : "Voulez-vous creez cette paroisse ?",
									imageUrl : "images/succes.png",
									imageSize : "130x130",
									showCancelButton : true,
									confirmButtonColor : "#34b1c4",
									confirmButtonText : "Yes,create it",
									closeOnConfirm : true,
									html : true
								},
								function(isConfirm) {
									console.log($localStorage.fakeUserId);
									if (isConfirm) {
//										$auth.removeToken();
										console.log($localStorage.token);
										var urls = new Array();
										urls.push($scope.parish.url)
										$http(
												{
													method : 'POST',
													url : '/parish/',
//													headers : {
//														'Authorization' : 'Basic '
//																+ $localStorage.token
//													},
													data :  {
														website : $scope.parish.website,
														displayName : $scope.parish.displayName,
														longitude : $scope.parish.longitude,
														latitude : $scope.parish.latitude,
														numberOfDevoted : $scope.parish.numberOfDevoted,
														pictureUrls : urls,
														district : $scope.parish.district
														
												}
													
												}).success(function (response){
													console.log("Fake recipient created successfully");
//													$auth.setToken($localStorage.token);
									       			console.log(response);
									       			console.log(response.id);
									       			document.title = "EEC Munzeu Admin portal";
									       			$location.path('/paroisses');
											    	  swal("Success!",
																"Paroisse créee.",
																"success");
									       			
									       			
									       		})
												
												.error(
														function(error) {
															$auth.setToken($localStorage.token);
															toastr
																	.error("Failed to create recipient '"
																			+ $scope.recipient.firstname
																			+ "' : "
																			+ error.message);
														});
										
										

									}

								});

					}
//
					$scope.close = function() {
						document.title = "EEC MunZeu Admin portal";
						$location.path('/paroisses');
						
					}

				});