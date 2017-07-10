angular
		.module('MyApp')
		.controller(
				'viewrecipientCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {

					$scope.user = $localStorage.username;
					$scope.gridOptions = {
					    paginationPageSizes: [25, 50, 75, 100],
                        paginationPageSize: 25,
						enableRowSelection : true,
						enableRowHeaderSelection : false,
						enableSorting : true,
						// enableHorizontalScrollbar :
						// uiGridConstants.scrollbars.NEVER,
						enableColumnResizing : true,
						enableFiltering: true

					};

					

					$scope.getAllFakeRecipients = function() {
						$scope.showLoading = true;
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/admin/fakerecipients',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									},
									params : {
										customerId : $localStorage.fakeUserId
									}
								})
								.success(
										function(response) {
											$scope.showLoading = false;
											console.log(response);
											$auth.setToken($localStorage.token);
											$scope.gridOptions.data = response;
											$interval(
													function() {
														$scope.gridApi.selection
																.selectRow($scope.gridOptions.data[0]);
													}, 0, 1);
											
										}).error(function(error) {
											$auth.setToken($localStorage.token);
									$scope.showLoading = false;
									if (typeof error.message === 'undefined'){
										console.log(error);
										toastr.error("Some changes have been made, Please login to make used of the new changes",error.code);
									}else{
										console.log(error);
										toastr.error(error.message,error.code);
									}
								});
					}

					$scope.matchWithFakeUser = function() {
						$scope.showLoading = true;
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/admin/transferbypage',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									},
									params : {
										page : $localStorage.page
									}
								})
								.success(
										function(response) {
											$scope.showLoading = false;
											$auth.setToken($localStorage.token);
											// var date = new Date(time);
											// alert(date.toString());
											$scope.gridOptions.data = response;
											console
													.log($scope.gridOptions.data);
											// $scope.updateMetricsCluster(response);
											$scope.datalength = response.length;

											console.log("User is:"
													+ $scope.user);
											$interval(
													function() {
														$scope.gridApi.selection
																.selectRow($scope.gridOptions.data[0]);
													}, 0, 1);
											document.title = "Go Archive Portal";
											$location.path('/viewFakeUsers');
										}).error(function(error) {
									$scope.showLoading = false;
									$auth.setToken($localStorage.token);
									toastr.error(error.message,error.code);
								});
					}
					
					$scope.gridOptions.columnDefs = [ {
						name : 'id',
						displayName : 'Recipient Id',
						enableHiding : false,
						enableCellEdit : true,
						visible : false

					}, {
						name : 'firstName',
						enableHiding : false,
						displayName : 'First Name',
						enableCellEdit : true

					}
					// received_amount,saved_amount
					, {
						name : 'lastName',
						enableHiding : false,
						displayName : 'Last Name',
						enableCellEdit : true
					}, {
						name : 'phone',
						enableHiding : false,
						displayName : 'Phone Number',
						enableCellEdit : true
					}, {
						name : 'email',
						enableHiding : false,
						displayName : 'Email',
						enableCellEdit : true
					}, {
						name : 'country',
						enableHiding : false,
						displayName : 'Country',
						enableCellEdit : true
					}, {
						name : 'currency',
						enableHiding : false,
						displayName : 'Currency',
						enableCellEdit : true,


					}, {
						name : 'city',
						enableHiding : false,
						displayName : 'City',
						enableCellEdit : true

					}
					, {
						name : 'zone',
						enableHiding : false,
						displayName : 'Zone',
						enableCellEdit : true

					} 
					];

					$scope.gridOptions.multiSelect = false;
					$scope.gridOptions.modifierKeysToMultiSelect = false;
					$scope.gridOptions.noUnselect = true;
					$scope.gridOptions.onRegisterApi = function(gridApi) {
						$scope.gridApi = gridApi;
					};

					$scope.toggleRowSelection = function() {
						$scope.gridApi.selection.clearSelectedRows();
						$scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
						$scope.gridApi.core
								.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
					};

					var token = $auth.getToken();
					
					$scope.createFakeRecipient = function(){
						document.title = "Go Archive Portal";
						$location.path('/addFakeRecipient');
					}


					var token = $auth.getToken();
					var accountid = $localStorage.accountid;

					$scope.performMatching = function() {
						$scope.showLoading = true;
						var row = $scope.gridApi.selection.getSelectedRows();
						console.log(row[0].id);
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'POST',
									url : '/admin/performMatching',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									},
									params : {
										realTransferId : $localStorage.transactionId,
										fakeRecipientId : row[0].id
									}
								})
								.success(
										function(response) {
											console.log("Matching done successfully");
											$auth.setToken($localStorage.token);
											console.log(response);
											$scope.showLoading = false;
											$scope.gridOptions.data = response;
											$scope.datalength = response.length;
											$localStorage.fakeTransactionId = response.id;

											console.log("User is:"
													+ $scope.user);
											swal("Success!",
													"Matching done successfully.",
													"success");
											document.title = "Go Archive Portal";
											$scope.getTransaction();
										}).error(function(error) {
									$scope.showLoading = false;
									toastr.error(error.message,error.code);
								});
					}
					
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
								id : $localStorage.transactionId
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
											console.log($localStorage.transferCountry);
											$scope.customerZone= response.customer.zone;
											console.log($scope.customerZone);
											if ($scope.customerZone === 'AF' ){
												$location.path('/transactions');
//												$location.path('/confirmZone1Transaction');
											}else{
												$location.path('/confirmTransaction');
												
											}
										}).error(function(error) {
											console.log($scope.id);
											$auth.setToken($localStorage.token);
											console.log("error ");
											toastr.error(error.message,error.code);
								});
					}
					
					$scope.back = function() {
						document.title = "Go Archive Portal";
						$location.path('/viewFakeUsers').search('id', null);
					}
					$scope.getAllFakeRecipients();
					setInterval(function() {
						$scope.getAllFakeRecipients();
					}, 300000);

				});