angular
		.module('MyApp')
		.controller(
				'viewdepositCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {

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
					
					$scope.getAllDeposits = function() {
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/admin/deposits',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									}
								})
								.success(
										function(response) {
											console.log("Transactions with deposits retrieved successfully");
											$auth.setToken($localStorage.token);
											$scope.showLoading = false;
											$scope.gridOptions.data = response;
											console
													.log($scope.gridOptions.data);
											// $scope.updateMetricsCluster(response);
											$scope.datalength = response.length;
											$scope.user = $localStorage.username;
											$interval(
													function() {
														$scope.gridApi.selection
																.selectRow($scope.gridOptions.data[0]);
													}, 0, 1);
											
										}).error(function(error) {
									$scope.showLoading = false;
									$auth.setToken($localStorage.token);
									if (typeof error.message === 'undefined'){
										console.log(error);
										toastr.error("Some changes have been made, Please login to make used of the new changes",error.code);
									}else{
										console.log(error);
										toastr.error(error.message,error.code);
									}
								});
					}
					
					
					$scope.depositDetails = function() {
						$interval(
								function() {
									$scope.gridApi.selection
											.selectRow($scope.gridOptions.data[0]);
								}, 0, 1);
						var row = $scope.gridApi.selection.getSelectedRows();
						$localStorage.depositId = row[0].id;
						console.log($localStorage.depositId);
						document.title = "Go Archive Portal";
						$location.path('/depositDetails').search({
							id : row[0].id
						});
					}
					
					$scope.getAllDeposits();

					$scope.gridOptions.columnDefs = [ {
						name : 'id',
						displayName : 'Transaction Id',
						enableHiding : false,
						enableCellEdit : true,
						visible : false

					}, {
						name : 'customer.firstName',
						enableHiding : false,
						displayName : 'Sender Name',
						enableCellEdit : true

					},{
						name : 'transaction.amount',
						enableHiding : false,
						displayName : 'Amount sent',
						enableCellEdit : true

					}
					, {
						name : 'transaction.sourceCurrency',
						enableHiding : false,
						displayName : 'Source Currency',
						enableCellEdit : true
					}, {
						name : 'transaction.receivedAmount',
						enableHiding : false,
						displayName : 'Amount Received',
						enableCellEdit : true
					}, {
						name : 'transaction.targetCurrency',
						enableHiding : false,
						displayName : 'Target Currency',
						enableCellEdit : true
					}, {
						name : 'transaction.savedAmount',
						enableHiding : false,
						displayName : 'Amount Saved',
						enableCellEdit : true
					}, {
						name : 'transaction.status',
						enableHiding : false,
						displayName : 'Status',
						enableCellEdit : true,
					}, {
						name : 'createDate',
						enableHiding : false,
						displayName : 'Creation Date',
						enableCellEdit : true

					}, {
						name : 'lastUpdateDate',
						enableHiding : false,
						displayName : 'Last Update Date',
						enableCellEdit : true

					}, {
						name : 'transaction.transactionType',
						enableHiding : false,
						displayName : 'Type',
						enableCellEdit : true

					}  ];

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
					
					$scope.back = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactions').search('id', null);
					}

					var token = $auth.getToken();

					setInterval(function() {
						$scope.getAllDeposits();
					}, 300000);
					
				});