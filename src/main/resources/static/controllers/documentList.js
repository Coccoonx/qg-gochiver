angular
		.module('MyApp')
		.controller(
				'documentCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {
// $auth.setToken($localStorage.token);
					$scope.user = $localStorage.username;
					$scope.gridOptions = {
					    paginationPageSizes: [25, 50, 75, 100],
                        paginationPageSize: 25,
						enableRowSelection : true,
						enableRowHeaderSelection : false,
						enableSorting : true,
						enableColumnResizing : true,
						enableFiltering: true

					};
					
					$scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
					    if( col.filters[0].term ){
					      return 'header-filtered';
					    } else {
					      return '';
					    }
					  };
					
					$scope.getAllDocument = function() {
						$scope.showLoading = true;
// $auth.removeToken();
						console.log($localStorage.token);
						
						$http(
								{
									method : 'GET',
									url : '/document/',
// headers : {
// 'Authorization' : 'Basic '
// + $localStorage.token
// }
								})
								.success(
										function(response) {
											$scope.showLoading = false;
// $auth.setToken($localStorage.token);
											$scope.gridOptions.data = response;
											console.log(response);
											// $scope.updateMetricsCluster(response);
											$scope.datalength = response.length;
// $scope.user = $localStorage.username;
											$interval(
													function() {
														$scope.gridApi.selection
																.selectRow($scope.gridOptions.data[0]);
													}, 0, 1);
											
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

					$scope.matchWithFakeUser = function() {
						$interval(
								function() {
									$scope.gridApi.selection
											.selectRow($scope.gridOptions.data[0]);
								}, 0, 1);
						var row = $scope.gridApi.selection.getSelectedRows();
						$localStorage.transactionId = row[0].id;
						$scope.getTransaction();
					}
					
					$scope.creerDocument = function(){

						$location.path("/creerDocument");
						
						
					}
					
					
//					$scope.getTransaction = function() {
//						var row = $scope.gridApi.selection.getSelectedRows();
//						$localStorage.transactionId = row[0].id;
//						$auth.removeToken();
//						console.log($localStorage.token);
//						$http({
//							method : 'GET',
//							url : '/admin/transfer',
//							headers : {
//								'Authorization' : 'Basic ' + $localStorage.token
//							},
//							params : {
//								id : $localStorage.transactionId
//							}
//						})
//								.success(
//										function(response) {
//											console.log("Transaction retrieved successfully");
//											$auth.setToken($localStorage.token);
//											console.log(response);
//											$scope.status = response.transaction.status;
//											$localStorage.transferCountry = response.customer.country;
//											console.log(response.transaction.status);
//											console.log($localStorage.transferCountry);
//											if ($scope.status === 'INITIATED' ){
//												$location.path('/viewFakeUsers').search({
//													id : row[0].id
//												});
//											}else{
//												sweetAlert(
//														"Oops...",
//														"ONLY transactions with the status INITIATED can be match",
//														"error");
//											}
//										}).error(function(error) {
//											console.log($scope.id);
//											$auth.setToken($localStorage.token);
//											console.log("error ");
//											toastr.error(error.message,error.code);
//								});
//					}
					
//					$scope.getDepositTransaction = function() {
//						var row = $scope.gridApi.selection.getSelectedRows();
//						$localStorage.transactionId = row[0].id;
//						$auth.removeToken();
//						console.log($localStorage.token);
//						$http({
//							method : 'GET',
//							url : '/admin/transfer',
//							headers : {
//								'Authorization' : 'Basic ' + $localStorage.token
//							},
//							params : {
//								id : $localStorage.transactionId
//							}
//						})
//								.success(
//										function(response) {
//											console.log("Transaction retrieved successfully");
//											$auth.setToken($localStorage.token);
//											console.log(response);
//											$scope.transactionType = response.transaction.transactionType;
//											$localStorage.transferCountry = response.customer.country;
//											console.log($scope.transactionType);
//											if ($scope.transactionType === 'Deposit' ){
//												$scope.administerDeposits();
//											}else{
//												sweetAlert(
//														"Oops...",
//														"ONLY deposit transactions can be confirm/cancel",
//														"error");
//											}
//										}).error(function(error) {
//											console.log($scope.id);
//											$auth.setToken($localStorage.token);
//											console.log("error ");
//											toastr.error(error.message,error.code);
//								});
//					}
					
//					$scope.getTransactionToConfirmAndConfirmOtherParty = function() {
//						$interval(
//								function() {
//									$scope.gridApi.selection
//											.selectRow($scope.gridOptions.data[0]);
//								}, 0, 1);
//						var row = $scope.gridApi.selection.getSelectedRows();
//						$auth.removeToken();
//						console.log($localStorage.token);
//						$localStorage.transactionId = row[0].id;
//						$http({
//							method : 'GET',
//							url : '/admin/transfer',
//							headers : {
//								'Authorization' : 'Basic ' + $localStorage.token
//							},
//							params : {
//								id : $localStorage.transactionId
//							}
//						})
//								.success(
//										function(response) {
//											console.log("Transaction retrieved successfully");
//											$auth.setToken($localStorage.token);
//											console.log(response);
//											$scope.status = response.transaction.status;
//											$localStorage.transferCountry = response.customer.country;
//											console.log($localStorage.transferCountry);
//											
//											$localStorage.fakeTransactionId = response.id;
//											$scope.customerZone= response.customer.zone;
//											console.log($scope.customerZone);
//											console.log($scope.status);
//											if ($scope.status === 'RESERVED' || $scope.status === 'VERIFIED'){
//												if($scope.customerZone !== 'AF' ){
//													document.title = "Go Archive Portal";
//													$location.path('/confirmZone1Transaction');
//												}else{
//													$scope.confirmOtherParty();
//												}
//											}else{
//												sweetAlert(
//														"Oops...",
//														"ONLY transactions with the status REVERSED/VERIFIED can confirm other party transaction",
//														"error");
//											}
//											
//											
//											
//// if(typeof response.transaction.fake === 'undefined' ||
//// response.transaction.fake === false){
//// sweetAlert(
//// "Oops...",
//// "ONLY fake transactions can be confirm other party transaction on the admin
//// portal",
//// "error");
//// }else{
//// $scope.confirmOtherParty();
//// }
//										}).error(function(error) {
//											console.log($scope.id);
//											$auth.setToken($localStorage.token);
//											console.log("error ");
//											toastr.error(error.message,error.code);
//								});
//					}
					
//					$scope.confirmOtherParty = function() {
//						$auth.removeToken();
//						console.log($localStorage.token);
//						$http({
//							method : 'GET',
//							url : '/admin/confirmothertransfer',
//							headers : {
//								'Authorization' : 'Basic ' + $localStorage.token
//							},
//							params : {
//								id : $localStorage.transactionId
//							}
//						})
//								.success(
//										function(response) {
//											console.log("Other party transaction confirmed successfully");
//											$auth.setToken($localStorage.token);
//											console.log(response);
//											$scope.status = response.transaction.status;
//											$localStorage.transferCountry = response.customer.country;
//											console.log(response.transaction.status);
//											console.log($localStorage.transferCountry);
//											console.log(response.transaction.fake);
//											swal("Success!",
//													"Other party transaction confirmed successfully.",
//													"success");
//											
//										}).error(function(error) {
//											console.log($scope.id);
//											$auth.setToken($localStorage.token);
//											console.log("error ");
//											toastr.error(error.message,error.code);
//								});
//					}
					
//					$scope.confirmFakeTransactions = function() {
//						$interval(
//								function() {
//									$scope.gridApi.selection
//											.selectRow($scope.gridOptions.data[0]);
//								}, 0, 1);
//						var row = $scope.gridApi.selection.getSelectedRows();
//						$localStorage.transactionId = row[0].id;
//						$auth.removeToken();
//						console.log($localStorage.token);
//						$http({
//							method : 'GET',
//							url : '/admin/transfer',
//							headers : {
//								'Authorization' : 'Basic ' + $localStorage.token
//							},
//							params : {
//								id : $localStorage.transactionId
//							}
//						})
//								.success(
//										function(response) {
//											console.log("Transaction retrieved successfully");
//											$auth.setToken($localStorage.token);
//											console.log(response);
//											$scope.status = response.transaction.status;
//											$localStorage.transferCountry = response.customer.country;
//											console.log(response.transaction.status);
//											console.log($localStorage.transferCountry);
//											console.log(response.transaction.fake);
//											$localStorage.fakeTransactionId = response.id;
//											$scope.customerZone= response.customer.zone;
//											console.log($scope.customerZone);
//											if($scope.customerZone !== 'AF' ){
//												sweetAlert(
//														"Oops...",
//														"ONLY transactions of zone 2 can be confirm",
//														"error");
//											}else{
//												if ($scope.status === 'IN_PROGRESS' ){
//													document.title = "Go Archive Portal";
//													$location.path('/confirmTransaction');
//// if ($scope.customerZone === 'AF' ){
//// console.log("zone2");
//// $location.path('/confirmTransaction');
//// }else{
//// console.log("zone1");
//// $location.path('/confirmZone1Transaction');
//// }
//												}else{
//													sweetAlert(
//															"Oops...",
//															"ONLY transactions with the status IN_PROGRESS can be confirm",
//															"error");
//												}
//											}
//											
//										}).error(function(error) {
//											console.log($scope.id);
//											$auth.setToken($localStorage.token);
//											console.log("error ");
//											toastr.error(error.message,error.code);
//								});
//					}
					
					
					$scope.getAllDocument();

					$scope.gridOptions.columnDefs = [ {
						name : 'id',
						displayName : 'id',
						enableHiding : false,
						enableCellEdit : true,
						visible : false,
						

					}, {
						name : 'name',
//						enableHiding : false,
						displayName : 'Nom du document',
						enableCellEdit : true,
						

					},{
						name : 'description',
//						enableHiding : false,
						displayName : 'Description',
						enableCellEdit : true,
					}
					, {
						name : 'creationDate',
						enableHiding : false,
						displayName : 'Date création',
						enableCellEdit : true
					}, {
						name : 'link',
						enableHiding : false,
						displayName : 'Télécharger',
						enableCellEdit : true,
						
					}
					];

//					function checkStart(term, value, row, column) {
//				        term = term.replace(/\\/g,"")
//				        var now = moment(value);
//				        if(term) {
//				            if(moment(term).isAfter(now, 'day')) return false;;
//				        } 
//				        return true;
//				    }
//
//				    function checkEnd(term, value, row, column) {
//				        term = term.replace(/\\/g,"")
//				        var now = moment(value);
//				        if(term) {
//				            if(moment(term).isBefore(now, 'day')) return false;;
//				        } 
//				        return true;
//				    }
					
					$scope.gridOptions.multiSelect = false;
//					$scope.gridOptions.modifierKeysToMultiSelect = false;
//					$scope.gridOptions.noUnselect = true;
					$scope.gridOptions.onRegisterApi = function(gridApi) {
						$scope.gridApi = gridApi;
					};

					$scope.toggleRowSelection = function() {
						$scope.gridApi.selection.clearSelectedRows();
						$scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
						$scope.gridApi.core
								.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
					};
					
					
					$scope.canCreateAdmin = function() {
						$scope.getCustomer();
						if ($scope.isSuper === 'super') {
							return false;
						} else
							return true;
					}

//					var token = $auth.getToken();
//					$scope.addCluster = function() {
//						$location.path('/addFakeUser').search({
//							kp : $scope.keyspacename
//						});
//					}

//					var token = $auth.getToken();
//					var accountid = $localStorage.accountid;

					$scope.afficherDocument = function() {

						var row = $scope.gridApi.selection.getSelectedRows();
						$localStorage.id = row[0].id;
						document.title = "List of documents";
						$location.path('/afficherDocument').search({
							id : row[0].id
						});

					}
					
//					$scope.administerDeposits = function() {
//						
//						var row = $scope.gridApi.selection.getSelectedRows();
//						$localStorage.depositId = row[0].id;
//						console.log($localStorage.depositId);
//						document.title = "Go Archive Portal";
//						$location.path('/depositDetails').search({
//							id : row[0].id
//						});
//
//					}
					
					setInterval(function() {
						$scope.getAllDocument();
					}, 300000);
					
					
				});