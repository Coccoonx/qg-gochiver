angular
		.module('MyApp')
		.controller(
				'coTransactionDetailCtl',
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
					$scope.addCluster = function() {
						$location.path('/addcluster').search({
							kp : $scope.keyspacename
						});
					}


					var token = $auth.getToken();
					var accountid = $localStorage.accountid;

					$scope.getCoTransaction = function() {
						$auth.removeToken();
						console.log($localStorage.token);
						$http({
							method : 'GET',
							url : '/admin/transfer',
							headers : {
								'Authorization' : 'Basic ' + $localStorage.token
							},
							params : {
								id : $localStorage.id
							}
						})
								.success(
										function(response) {
											console.log(response);
											$auth.setToken($localStorage.token);
											$scope.id = response.coTransaction.id;
											$scope.amount = response.coTransaction.amount;
											$scope.sourceCurrency = response.coTransaction.sourceCurrency;
											$scope.receivedAmount = response.coTransaction.receivedAmount;
											$scope.targetCurrency = response.coTransaction.targetCurrency;
											$scope.savedAmount = response.coTransaction.savedAmount;
											$scope.status = response.coTransaction.status;
											$scope.createDate = response.createDate;
											$scope.lastUpdateDate = response.lastUpdateDate;
											$scope.comment = response.coTransaction.comment;
											$scope.latitude = response.coTransaction.latitude;
											$scope.longitude = response.coTransaction.longitude;
											$scope.transactionNumber = response.coTransaction.transactionNumber;
											$scope.recipientId = response.coTransaction.recipient.id;
											$scope.recipientUsername = response.coTransaction.recipient.username;
											$scope.recipientZone = response.coTransaction.recipient.zone;
											$scope.recipientDescription = response.coTransaction.recipient.description;
											$scope.recipientTransitNumber = response.coTransaction.recipient.transitNumber;
											$scope.recipientCreateDate = response.coTransaction.recipient.createDate;
											$scope.recipientEmail = response.coTransaction.recipient.email;
											$scope.recipientLastUpdateDate = response.coTransaction.recipient.lastUpdateDate;
											$scope.recipientStatus = response.coTransaction.recipient.status;
											$scope.recipientCurrency = response.coTransaction.recipient.currency;
											$scope.recipientRecipientNumber = response.coTransaction.recipient.recipientNumber;
											$scope.recipientSwift= response.coTransaction.recipient.swift;
											$scope.recipientIban= response.coTransaction.recipient.iban;
											$scope.recipientBankName= response.coTransaction.recipient.bankName;
											$scope.recipientCity= response.coTransaction.recipient.city;
											$scope.recipientPhone= response.coTransaction.recipient.phone;
											$scope.recipientFirstName= response.coTransaction.recipient.firstName;
											$scope.recipientLastName= response.coTransaction.recipient.lastName;
											$scope.recipientState= response.coTransaction.recipient.state;
											$scope.recipientCountry= response.coTransaction.recipient.country;
											
											$scope.gridOptions.data = response;
											console.log($scope.gridOptions.data);
											
											$scope.customerFirstName= response.coCustomer.firstName;
											$scope.customerLastName= response.coCustomer.lastName;
											$scope.customerEmail= response.coCustomer.email;
											$scope.customerStatus= response.coCustomer.status;
											$scope.customerZone= response.coCustomer.zone;
											$scope.customerCreateDate= response.coCustomer.createDate;
											$scope.customerLastUpdateDate= response.coCustomer.lastUpdateDate;
											$scope.customerCurrency= response.coCustomer.currency;
											$scope.customerCity= response.coCustomer.city;
											$scope.customerLanguage= response.coCustomer.language;
											$scope.customerPhone= response.coCustomer.phone;
											$scope.customerState= response.coCustomer.state;
											$scope.customerCountry= response.coCustomer.country;
											$scope.customerZipCode= response.coCustomer.zipCode;
											$scope.customerEnabled= response.coCustomer.enabled;
											$scope.customerActivationCode= response.coCustomer.activationCode;
											
											$scope.localCompanyZone2Id= response.coTransaction.localCompanyZone2.id;
											$scope.localCompanyZone2Name= response.coTransaction.localCompanyZone2.name;
											$scope.localCompanyZone2Country= response.coTransaction.localCompanyZone2.country;
											$scope.localCompanyZone2Amount= response.coTransaction.localCompanyZone2.amount;
											$scope.localCompanyZone2StartRange= response.coTransaction.localCompanyZone2.startRange;
											$scope.localCompanyZone2EndRange= response.coTransaction.localCompanyZone2.endRange;
											$scope.localCompanyZone2Question= response.coTransaction.localCompanyZone2.question;
											$scope.localCompanyZone2Answer= response.coTransaction.localCompanyZone2.answer;
											$scope.localCompanyZone2Date= response.coTransaction.localCompanyZone2.date;
											
											$scope.localCompanyZone1Id= response.coTransaction.localCompanyZone1.id;
											$scope.localCompanyZone1Name= response.coTransaction.localCompanyZone1.name;
											$scope.localCompanyZone1Country= response.coTransaction.localCompanyZone1.country;
											$scope.localCompanyZone1Amount= response.coTransaction.localCompanyZone1.amount;
											$scope.localCompanyZone1StartRange= response.coTransaction.localCompanyZone1.startRange;
											$scope.localCompanyZone1EndRange= response.coTransaction.localCompanyZone1.endRange;
											$scope.localCompanyZone1Question= response.coTransaction.localCompanyZone1.question;
											$scope.localCompanyZone1Answer= response.coTransaction.localCompanyZone1.answer;
											$scope.localCompanyZone1Date= response.coTransaction.localCompanyZone1.date;
											console.log(response.coTransaction.artifacts[0])
											$scope.artifactsId= response.coTransaction.artifacts[0].id;
											$scope.artifactsUrl= response.coTransaction.artifacts[0].url;
											$scope.artifactsCreateDate= response.coTransaction.artifacts[0].createDate;
											$scope.artifactsLastUpdateDate= response.coTransaction.artifacts[0].lastUpdateDate;
											$scope.artifactsExtension= response.coTransaction.artifacts[0].extension;
											$scope.artifactsSizeInBytes= response.coTransaction.artifacts[0].sizeInBytes;
											$scope.artifactsName= response.coTransaction.artifacts[0].name;
											$scope.artifactsDescription= response.coTransaction.artifacts[0].description;
											
											if (typeof response.coTransaction !== 'undefined'   !== ''){
												
											}

										}).error(function(error) {
											console.log($scope.id);
											$auth.setToken($localStorage.token);
											console.log("error ");
											toastr.error(error.message,error.code);
								});
					}

					$scope.close = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactionDetails').search('id', null);
					}
					
					$scope.getCoTransaction();

				});