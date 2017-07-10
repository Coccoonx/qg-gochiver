angular
		.module('MyApp')
		.controller(
				'transactionDetailCtl',
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
					var accountid = $localStorage.accountid;

					$scope.getTransaction = function() {
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
											$scope.id = response.id;
											$scope.amount = response.transaction.amount;
											$scope.sourceCurrency = response.transaction.sourceCurrency;
											$scope.receivedAmount = response.transaction.receivedAmount;
											$scope.targetCurrency = response.transaction.targetCurrency;
											$scope.savedAmount = response.transaction.savedAmount;
											$scope.status = response.transaction.status;
//											$scope.statusMessage = response.transaction.statusMessage;
											$scope.createDate = response.createDate;
											$scope.lastUpdateDate = response.lastUpdateDate;
											$scope.comment = response.transaction.comment;
											$scope.latitude = response.transaction.latitude;
											$scope.longitude = response.transaction.longitude;
											$scope.transactionNumber = response.transaction.transactionNumber;
											$scope.recipientId = response.transaction.recipient.id;
											$scope.recipientUsername = response.transaction.recipient.username;
											$scope.recipientZone = response.transaction.recipient.zone;
											$scope.recipientDescription = response.transaction.recipient.description;
											$scope.recipientTransitNumber = response.transaction.recipient.transitNumber;
											$scope.recipientCreateDate = response.transaction.recipient.createDate;
											$scope.recipientEmail = response.transaction.recipient.email;
											$scope.recipientLastUpdateDate = response.transaction.recipient.lastUpdateDate;
											$scope.recipientStatus = response.transaction.recipient.status;
											$scope.recipientCurrency = response.transaction.recipient.currency;
											$scope.recipientRecipientNumber = response.transaction.recipient.recipientNumber;
											$scope.recipientSwift= response.transaction.recipient.swift;
											$scope.recipientIban= response.transaction.recipient.iban;
											$scope.recipientBankName= response.transaction.recipient.bankName;
											$scope.recipientCity= response.transaction.recipient.city;
											$scope.recipientPhone= response.transaction.recipient.phone;
											$scope.recipientFirstName= response.transaction.recipient.firstName;
											$scope.recipientLastName= response.transaction.recipient.lastName;
											$scope.recipientState= response.transaction.recipient.state;
											$scope.recipientCountry= response.transaction.recipient.country;
											
											$scope.gridOptions.data = response;
											console.log($scope.gridOptions.data);
											
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
											
											console.log(response.transaction.artifacts[0])
											$scope.artifactsId= response.transaction.artifacts[0].id;
											$scope.artifactsUrl= response.transaction.artifacts[0].url;
											$scope.artifactsCreateDate= response.transaction.artifacts[0].createDate;
											$scope.artifactsLastUpdateDate= response.transaction.artifacts[0].lastUpdateDate;
											$scope.artifactsExtension= response.transaction.artifacts[0].extension;
											$scope.artifactsSizeInBytes= response.transaction.artifacts[0].sizeInBytes;
											$scope.artifactsName= response.transaction.artifacts[0].name;
											$scope.artifactsDescription= response.transaction.artifacts[0].description;
											
											
											$scope.localCompany= response.transaction.localCompany;
											/*
											$scope.localCompanyZone2Id= response.transaction.localCompanyZone2.id;
											$scope.localCompanyZone2Name= response.transaction.localCompanyZone2.name;
											$scope.localCompanyZone2Country= response.transaction.localCompanyZone2.country;
											$scope.localCompanyZone2Amount= response.transaction.localCompanyZone2.amount;
											$scope.localCompanyZone2StartRange= response.transaction.localCompanyZone2.startRange;
											$scope.localCompanyZone2EndRange= response.transaction.localCompanyZone2.endRange;
											$scope.localCompanyZone2Question= response.transaction.localCompanyZone2.question;
											$scope.localCompanyZone2Answer= response.transaction.localCompanyZone2.answer;
											$scope.localCompanyZone2Date= response.transaction.localCompanyZone2.date;
											
											$scope.localCompanyZone1Id= response.transaction.localCompanyZone1.id;
											$scope.localCompanyZone1Name= response.transaction.localCompanyZone1.name;
											$scope.localCompanyZone1Country= response.transaction.localCompanyZone1.country;
											$scope.localCompanyZone1Amount= response.transaction.localCompanyZone1.amount;
											$scope.localCompanyZone1StartRange= response.transaction.localCompanyZone1.startRange;
											$scope.localCompanyZone1EndRange= response.transaction.localCompanyZone1.endRange;
											$scope.localCompanyZone1Question= response.transaction.localCompanyZone1.question;
											$scope.localCompanyZone1Answer= response.transaction.localCompanyZone1.answer;
											$scope.localCompanyZone1Date= response.transaction.localCompanyZone1.date;
											*/
											if (typeof response.coTransaction !== 'undefined'   !== ''){
												
											}

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

					$scope.close = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactions').search('id', null);
					}
					
					$scope.back = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactions').search('id', null);
					}
					
					$scope.getCoTransaction = function() {
						document.title = "Go Archive Portal";
						$location.path('/coTransactionDetails').search('id', null);
					}
					

					$scope.getTransaction();

				});