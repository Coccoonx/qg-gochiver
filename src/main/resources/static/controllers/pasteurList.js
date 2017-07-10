angular
		.module('MyApp')
		.controller(
				'pasteurCtl',
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
					
					$scope.getAllPastors = function() {
						$scope.showLoading = true;
// $auth.removeToken();
						console.log($localStorage.token);
						
						$http(
								{
									method : 'GET',
									url : '/pastor/',
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

					
					$scope.creerPasteur = function(){

						$location.path("/creerPasteur");
						
						
					}
					
					$scope.getAllPastors();

					$scope.gridOptions.columnDefs = [ {
						name : 'id',
						displayName : 'id',
						enableHiding : false,
						enableCellEdit : true,
						visible : false,
						

					}, {
						name : 'title',
//						enableHiding : false,
						displayName : 'Titre',
						enableCellEdit : true,
						

					},{
						name : 'firstName',
//						enableHiding : false,
						displayName : 'Prénom(s)',
						enableCellEdit : true,
					}
					, {
						name : 'lastName',
						enableHiding : false,
						displayName : 'Nom(s)',
						enableCellEdit : true
					}, {
						name : 'parish.displayName',
						enableHiding : false,
						displayName : 'Paroisse',
						enableCellEdit : true,
						
					},  {
						name : 'phones',
						enableHiding : false,
						displayName : 'Telephones',
						enableCellEdit : true,
						
					}
					];

					
					$scope.gridOptions.multiSelect = false;
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

					$scope.afficherPasteur = function() {

						var row = $scope.gridApi.selection.getSelectedRows();
						$localStorage.id = row[0].id;
//						document.title = "Go Archive Portal";
						$location.path('/afficherPasteur').search({
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
					
//					setInterval(function() {
//						$scope.getAllParishes();
//					}, 300000);
//					
					
				});