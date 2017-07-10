angular
		.module('MyApp')
		.controller(
				'viewFakeUsersCtl',
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
					
					$scope.createFakeUserAndRecipient = function() {
						$scope.showLoading = true;
						document.title = "Go Archive Portal";
						$location.path('/addFakeUser');
					}

					$scope.getAllFakeUsers = function() {
						$scope.showLoading = true;
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/admin/fakecustomers',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									},
									params : {
										country : $localStorage.transferCountry
									}
								})
								.success(
										function(response) {
											$scope.showLoading = false;
											console.log("Customers retrieved successfully");
											console.log(response);
											$auth.setToken($localStorage.token);
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

					$scope.matchWithFakeUser = function() {
						$scope.getAllFakeUsers
						document.title = "Go Archive Portal";
						$location.path('/viewFakeUsers');
					}

					$scope.getAllFakeUsers();
					
					$scope.gridOptions.columnDefs = [ {
						name : 'id',
						displayName : 'Customer Id',
						enableHiding : false,
						enableCellEdit : true,
						visible : false

					}, {
						name : 'firstName',
						enableHiding : false,
						displayName : 'First Name',
						enableCellEdit : true

					}
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

					} ];

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
					$scope.addCluster = function() {
						$location.path('/addcluster').search({
							kp : $scope.keyspacename
						});
					}
					
					var token = $auth.getToken();
					var accountid = $localStorage.accountid;

					$scope.viewRecipients = function() {

						var row = $scope.gridApi.selection.getSelectedRows();
						$localStorage.fakeUserId = row[0].id;
						document.title = "Go Archive Portal";
						$location.path('/recipients').search({
							id : row[0].id
						});

					}
					
					$scope.back = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactions').search('id', null);
					}
					
					setInterval(function() {
						$scope.getAllFakeUsers();
					}, 300000);

				});