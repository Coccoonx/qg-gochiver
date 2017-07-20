angular
		.module('MyApp')
		.controller(
				'createPastorCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {
					
					$scope.availableParishes = [];
					
					$scope.getAllParishes = function() {
						$scope.showLoading = true;
// $auth.removeToken();
						console.log($localStorage.token);
						
						$http(
								{
									method : 'GET',
									url : '/parish/',
// headers : {
// 'Authorization' : 'Basic '
// + $localStorage.token
// }
								})
								.success(
										function(response) {
											$scope.showLoading = false;
// $auth.setToken($localStorage.token);
											console.log(response);
// $scope.user = $localStorage.username;
											
											for(var i = 0; i < response.length; i++ ){
//												var par = new Object();
//												par['code'] = response[i].id;
//												par['name'] = response[i].displayName;
												$scope.availableParishes.push(response[i]);
											}
											
										}).error(function(error) {
									$scope.showLoading = false;
// $auth.setToken($localStorage.token);
									console.log(error.message);
									if (typeof error.message === 'undefined'){
										console.log(error);
										toastr.error("Some changes have been made, Please login to make used of the new changes",error.code);
									}else{
										console.log(error);
										toastr.error(error.message,error.code);
									}
									
								});
					}
					
					$scope.update = function(){
						$scope.parishSeleted = $scope.parishselected;
						console.log($scope.parishSeleted);
					}
					
					$scope.getAllParishes();
					
					$scope.createPastor = function() {

						swal(
								{
									title : "<b> Creation de Berger </b>",
									text : "Voulez-vous creez ce berger ?",
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
										urls.push($scope.pastor.imageurl)
										
										var phonesNo = $scope.pastor.phones.split(";");
										
										
										$http(
												{
													method : 'POST',
													url : '/pastor/',
//													headers : {
//														'Authorization' : 'Basic '
//																+ $localStorage.token
//													},
													data :  {
														title : $scope.pastor.title,
														firstName : $scope.pastor.firstname,
														lastName : $scope.pastor.lastname,
														phones : phonesNo,
														pastorImages : urls,
														parish : $scope.parishSeleted
												}
													
												}).success(function (response){
//													$auth.setToken($localStorage.token);
									       			console.log(response);
									       			console.log(response.id);
									       			document.title = "QG Cloud";
									       			$location.path('/pasteurs');
											    	  swal("Success!",
																"Berger crée.",
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
						document.title = "QG Cloud";
						$location.path('/pasteurs');
						
					}

				});