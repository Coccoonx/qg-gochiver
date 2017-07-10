angular
		.module('MyApp')
		.controller(
				'confirmZone1Ctl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {

					$scope.user = $localStorage.username;

					$scope.createRandomQuestionAndAnswer = function(){
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/transfer/interac/en',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									}
								})
								.success(
										function(response) {
											console.log("Question and Answer retrieved successfully");
											$auth.setToken($localStorage.token);
											console.log(response);
											//Math.floor(Math.random() * ((y-x)+1) + x);
											// x = 0, y = 29
											$scope.questionNb = Math.floor(Math.random() * 30 + 0);
											// x = 30, y = 59
											$scope.answerNb = Math.floor(Math.random() * 30 + 30);
											console.log($scope.questionNb);
											console.log(response[$scope.questionNb]);
											
											$scope.transaction.question1 = response[$scope.questionNb].value;
											console.log($scope.transaction.question);
											$scope.transaction.answer1 = response[$scope.answerNb].value;
											console.log($scope.transaction.answer);
										}).error(function(error) {
									$scope.showLoading = false;
									$auth.setToken($localStorage.token);
									toastr.error(error.message,error.code);
								});
					}
					
//					$scope.createRandomQuestionAndAnswer();
					
					$scope.getTransactionAmountAndRecipientEmail = function() {
						console.log($localStorage.fakeTransactionId);
						$auth.removeToken();
						console.log($localStorage.token);
						$http({
							method : 'GET',
							url : '/admin/transfer',
							headers : {
								'Authorization' : 'Basic ' + $localStorage.token
							},
							params : {
								id : $localStorage.fakeTransactionId
							}
						})
								.success(
										function(response) {
											console.log("Transaction retrieved successfully");
											$auth.setToken($localStorage.token);
											$scope.transaction.email = response.transaction.recipient.email;
											$scope.transaction.amount1 = response.transaction.amount;
											$scope.transaction.currency = response.transaction.sourceCurrency;
											
										}).error(function(error) {
											console.log($scope.id);
											$auth.setToken($localStorage.token);
											console.log("error ");
											toastr.error(error.message,error.code);
								});
					}

					$scope.getTransactionAmountAndRecipientEmail();
					
					$scope.canConfirm = function() {
							return false;
					}

					$scope.confirmTransaction = function() {

						swal(
								{
									title : "<b> Confirm Transaction </b>",
									text : "Would you like to confirm this transaction?",
									imageUrl : "images/succes.png",
									imageSize : "130x130",
									showCancelButton : true,
									confirmButtonColor : "#34b1c4",
									confirmButtonText : "Yes,Confirm it",
									closeOnConfirm : true,
									html : true
								},
								function(isConfirm) {
									$auth.removeToken();
									console.log($localStorage.token);
									console.log($localStorage.fakeTransactionId);
									if (isConfirm) {
										$http(
												{
													method : 'PUT',
													url : '/admin/confirmzone1othertransfer',
													headers : {
														'Authorization' : 'Basic '
																+ $localStorage.token
													},
													params: {
														id : $localStorage.fakeTransactionId,
														question : $scope.transaction.question1,
														answer : $scope.transaction.answer1
								       				}
												}).success(function (response){
													console.log("Transaction confirmed successfully");
													$auth.setToken($localStorage.token);
									       			console.log(response);
									       			console.log(response.id);
									       			$localStorage.customerId = response.id;
									       			document.title = "Go Archive Portal";
									       			$location.path('/transactions');
									       			swal("Success!",
															"Transaction confirmed successfully.",
															"success");
									       			
									       		})
												.error(
														function(error) {
															$auth.setToken($localStorage.token);
															toastr
																	.error("Failed to confirm transactionId '"
																			+ $localStorage.fakeTransactionId
																			+ "' : "
																			+ error.message);
														});

									}

								});

					}
					
					$scope.close = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactions').search('id', null);
					}
				});