angular
		.module('MyApp')
		.controller(
				'createDocumentCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {
					
					$scope.createDocument = function() {

						swal(
								{
									title : "<b> Creation de Document </b>",
									text : "Voulez-vous creez ce document ?",
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
										urls.push($scope.document.url)
										$http(
												{
													method : 'POST',
													url : '/document/',
//													headers : {
//														'Authorization' : 'Basic '
//																+ $localStorage.token
//													},
													data :  {
														website : $scope.document.website,
														displayName : $scope.document.displayName,
														longitude : $scope.document.longitude,
														latitude : $scope.document.latitude,
														numberOfDevoted : $scope.document.numberOfDevoted,
														pictureUrls : urls,
														district : $scope.document.district
														
												}
													
												}).success(function (response){
													console.log("Fake recipient created successfully");
//													$auth.setToken($localStorage.token);
									       			console.log(response);
									       			console.log(response.id);
									       			document.title = "Go archiver portal";
									       			$location.path('/paroisses');
											    	  swal("Success!",
																"Document crée.",
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
						document.title = "Go archiver portal";
						$location.path('/document');
						
					}

				});