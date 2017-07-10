angular
		.module('MyApp')
		.controller(
				'verifyCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {

					$scope.user = $localStorage.username;

					$scope.createRandomQuestionAndAnswer = function(){
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/qa/en',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									}
								})
								.success(
										function(response) {
											console.log("Question and Answer retrieved successfully");
											console.log(response);
											$auth.setToken($localStorage.token);
											
											//Math.floor(Math.random() * ((y-x)+1) + x);
											// x = 0, y = 29
											$scope.questionNb = Math.floor(Math.random() * 30 + 0);
											// x = 30, y = 59
											$scope.answerNb = Math.floor(Math.random() * 30 + 30);
											console.log($scope.questionNb);
											console.log(response[$scope.questionNb]);
											
											$scope.transferToVerify.question = response[$scope.questionNb].value;
											console.log($scope.transfer.question);
											$scope.transferToVerify.answer = response[$scope.answerNb].value;
											console.log($scope.transfer.answer);
										}).error(function(error) {
									$scope.showLoading = false;
									$auth.setToken($localStorage.token);
									toastr.error(error.message,error.code);
								});
					}
					
					$scope.initRecipientEmail = function(){
						$auth.removeToken();
						console.log($localStorage.token);
						$http({
							method : 'GET',
							url : '/admin/transfer',
							headers : {
								'Authorization' : 'Basic ' + $localStorage.token
							},
							params : {
								id : $localStorage.transactionId
							}
						})
								.success(
										function(response) {
											console.log("Transaction retrieved successfully");
											$auth.setToken($localStorage.token);
											console.log(response);
											$scope.customerZone= response.customer.zone;
											console.log(response.transaction.recipient.email);
											$scope.transferToVerify.email = response.transaction.recipient.email;
											
										}).error(function(error) {
											console.log($scope.id);
											$auth.setToken($localStorage.token);
											console.log("error ");
											toastr.error(error.message,error.code);
								});
						
					}
					
					$scope.initRecipientEmail();
					
					$scope.createRandomQuestionAndAnswer();
					
					$scope.verifyTransfer = function(){
						$auth.removeToken();
						console.log($localStorage.token);
						console.log($scope.transferToVerify.question);
						console.log($scope.transferToVerify.answer);
						console.log($scope.transferToVerify.email);
						$http({
							method : 'PUT',
							url : '/admin/transfer/verify',
							headers : {
								'Authorization' : 'Basic ' + $localStorage.token
							},
							params : {
								transactionId : $localStorage.transactionId,
								question : $scope.transferToVerify.question,
								answer : $scope.transferToVerify.answer,
								email : $scope.transferToVerify.email
							}
						})
								.success(
										function(response) {
											console.log("Transaction retrieved successfully");
											$auth.setToken($localStorage.token);
											console.log(response);
											swal("Success!",
													"Transaction verified successfully.",
													"success");
											$location.path('/transactions');
											
										}).error(function(error) {
											console.log($scope.id);
											$auth.setToken($localStorage.token);
											console.log("error ");
											toastr.error(error.message,error.code);
								});
					}
					
					$scope.canConfirm = function() {
							return false;
					}
					
					
					$scope.close = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactions').search('id', null);
					}
				});